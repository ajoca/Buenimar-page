"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { FaStore, FaTruck, FaBoxes, FaUsers, FaHandshake, FaClipboardCheck, FaBriefcase } from "react-icons/fa";
import { localities } from "@/lib/coverageData";

type EncodedAttachment = {
  filename: string;
  content: string;
  contentType: string;
  size: number;
};

const MAX_EXTRA_FILES = 5;
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

async function fileToAttachment(file: File): Promise<EncodedAttachment> {
  const buffer = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }

  return {
    filename: file.name,
    content: btoa(binary),
    contentType: file.type || "application/octet-stream",
    size: file.size,
  };
}

export default function OpenAccountSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const [accountType, setAccountType] = useState<"cliente" | "proveedor" | "trabaja">("cliente");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; msg: string }>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const fieldStyle = {
    background: "rgb(var(--panel))",
    color: "rgb(var(--text))",
    borderColor: "rgb(var(--line))",
  } as const;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setResult(null);
    setFileError(null);

    const fd = new FormData(form);
    
    let payload: Record<string, unknown>;
    const agree = fd.get("agree-to-policies") === "on";

    if (!agree) {
      setResult({ ok: false, msg: "Debes aceptar la política de privacidad para continuar." });
      setSubmitting(false);
      return;
    }

    if (accountType === "cliente") {
      payload = {
        type: "cliente",
        commerce: String(fd.get("commerce") || ""),
        address: String(fd.get("address") || ""),
        category: String(fd.get("category") || ""),
        volume: String(fd.get("volume") || ""),
        contactName: String(fd.get("contact-name") || ""),
        email: String(fd.get("email") || ""),
        phoneNumber: String(fd.get("phone-number") || ""),
        agree,
      };
    } else if (accountType === "proveedor") {
      payload = {
        type: "proveedor",
        companyName: String(fd.get("company-name") || ""),
        productType: String(fd.get("product-type") || ""),
        productDescription: String(fd.get("product-description") || ""),
        productVolume: String(fd.get("product-volume") || ""),
        contactName: String(fd.get("contact-name") || ""),
        email: String(fd.get("email") || ""),
        phoneNumber: String(fd.get("phone-number") || ""),
        agree,
      };
    } else {
      const cvFile = fd.get("cv-file") as File | null;
      const extraFiles = fd.getAll("additional-files") as File[];
      const validExtraFiles = extraFiles.filter((file) => file && file.size > 0);

      if (!cvFile || cvFile.size === 0) {
        setResult({ ok: false, msg: "Adjuntá tu CV para continuar." });
        setSubmitting(false);
        return;
      }

      if (validExtraFiles.length > 5) {
        setFileError(`Podés adjuntar hasta ${MAX_EXTRA_FILES} archivos adicionales además del CV.`);
        setResult({ ok: false, msg: "Revisá los archivos adjuntos e intentá nuevamente." });
        setSubmitting(false);
        return;
      }

      if (cvFile.size > MAX_FILE_SIZE_BYTES) {
        setFileError(`El CV supera el máximo permitido de ${MAX_FILE_SIZE_MB}MB.`);
        setSubmitting(false);
        return;
      }

      const oversizedExtra = validExtraFiles.find((file) => file.size > MAX_FILE_SIZE_BYTES);
      if (oversizedExtra) {
        setFileError(`El archivo ${oversizedExtra.name} supera el máximo permitido de ${MAX_FILE_SIZE_MB}MB.`);
        setSubmitting(false);
        return;
      }

      const cvAttachment = await fileToAttachment(cvFile);
      const additionalAttachments = await Promise.all(
        validExtraFiles.map((file) => fileToAttachment(file))
      );

      payload = {
        type: "trabaja",
        firstName: String(fd.get("first-name") || ""),
        lastName: String(fd.get("last-name") || ""),
        locality: String(fd.get("locality") || ""),
        email: String(fd.get("email") || ""),
        phoneNumber: String(fd.get("phone-number") || ""),
        motivation: String(fd.get("motivation") || ""),
        agree,
        cv: cvAttachment,
        attachments: additionalAttachments,
      };
    }

    try {
      const res = await fetch("/api/open-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Error");

      setResult({
        ok: true,
        msg:
          accountType === "cliente"
            ? "¡Solicitud enviada exitosamente! Te contactaremos en las próximas 24 horas."
            : accountType === "proveedor"
              ? "¡Solicitud enviada exitosamente! Revisaremos tu producto y nos pondremos en contacto pronto."
              : "¡Postulación enviada! Revisaremos tu CV y nos pondremos en contacto.",
      });

      // Reset form after successful submission
      setTimeout(() => {
        if (form) form.reset();
      }, 100);
    } catch (err: any) {
      setResult({
        ok: false,
        msg: err?.message || "No se pudo procesar tu solicitud",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="isolate px-4 sm:px-6 py-16 sm:py-24 md:py-32 lg:px-8"
      id="abrir-cuenta"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(var(--accent), 0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(var(--accent), 0.06), transparent 30%), rgb(var(--bg))",
        color: "rgb(var(--text))",
      }}
    >
      {/* Background gradient blur */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl"
          style={{ color: "rgb(var(--text))" }}
        >
          {title}
        </h2>
        <p
          className="mt-2 text-sm sm:text-base lg:text-lg leading-6 sm:leading-8"
          style={{ color: "rgb(var(--muted))" }}
        >
          {subtitle}
        </p>

        {/* Toggle Cliente/Proveedor */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setAccountType("cliente")}
            className={`p-4 sm:p-5 rounded-xl text-left transition-all duration-200 border-2 ${
              accountType === "cliente"
                ? "bg-red-600 text-white shadow-lg border-red-500"
                : "hover:bg-white/10"
            }`}
            style={
              accountType === "cliente"
                ? { background: "#dc2626" }
                : {
                    background: "rgb(var(--panel))",
                    color: "rgb(var(--text))",
                  borderColor: "rgb(var(--line))",
                  }
            }
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: accountType === "cliente" ? "rgba(255,255,255,0.2)" : "rgba(var(--accent), 0.15)" }}>
                <FaStore className="text-lg" />
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base">Quiero ser Cliente</p>
                <p className="text-xs sm:text-sm opacity-90 mt-0.5">Accedé a catálogo, logística y atención comercial.</p>
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setAccountType("proveedor")}
            className={`p-4 sm:p-5 rounded-xl text-left transition-all duration-200 border-2 ${
              accountType === "proveedor"
                ? "bg-red-600 text-white shadow-lg border-red-500"
                : "hover:bg-white/10"
            }`}
            style={
              accountType === "proveedor"
                ? { background: "#dc2626" }
                : {
                    background: "rgb(var(--panel))",
                    color: "rgb(var(--text))",
                  borderColor: "rgb(var(--line))",
                  }
            }
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: accountType === "proveedor" ? "rgba(255,255,255,0.2)" : "rgba(var(--accent), 0.15)" }}>
                <FaTruck className="text-lg" />
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base">Quiero ser Proveedor</p>
                <p className="text-xs sm:text-sm opacity-90 mt-0.5">Presentá tu marca y sumate a nuestra red.</p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setAccountType("trabaja")}
            className={`p-4 sm:p-5 rounded-xl text-left transition-all duration-200 border-2 ${
              accountType === "trabaja"
                ? "bg-red-600 text-white shadow-lg border-red-500"
                : "hover:bg-white/10"
            }`}
            style={
              accountType === "trabaja"
                ? { background: "#dc2626" }
                : {
                    background: "rgb(var(--panel))",
                    color: "rgb(var(--text))",
                    borderColor: "rgb(var(--line))",
                  }
            }
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: accountType === "trabaja" ? "rgba(255,255,255,0.2)" : "rgba(var(--accent), 0.15)" }}>
                <FaBriefcase className="text-lg" />
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base">Trabajá con Nosotros</p>
                <p className="text-xs sm:text-sm opacity-90 mt-0.5">Postulate y sumate al equipo Buenimar.</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="mx-auto mt-8 sm:mt-10 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 px-2 sm:px-0">
        <div className="rounded-2xl border p-5 md:p-6" style={{ background: "rgb(var(--panel))", borderColor: "rgb(var(--line))" }}>
          <h3 className="text-xl md:text-2xl font-bold" style={{ color: "rgb(var(--text))" }}>Sumate a una red sólida</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              { icon: FaUsers, text: "Atención personalizada" },
              { icon: FaBoxes, text: "Más de 100 marcas" },
              { icon: FaTruck, text: "Cobertura en Colonia" },
              { icon: FaHandshake, text: "Relación comercial de largo plazo" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="rounded-xl border px-3 py-3 flex items-center gap-2" style={{ borderColor: "rgba(var(--accent), 0.2)", background: "rgba(var(--accent), 0.06)" }}>
                <Icon className="text-red-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border p-4" style={{ borderColor: "rgb(var(--line))" }}>
            <p className="text-xs uppercase tracking-[0.15em] font-semibold" style={{ color: "rgb(var(--accent))" }}>Paso a paso</p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <FaClipboardCheck className="mt-0.5 text-red-500" />
                <span>Completás tus datos</span>
              </div>
              <div className="flex items-start gap-2">
                <FaUsers className="mt-0.5 text-red-500" />
                <span>Te contactamos</span>
              </div>
              <div className="flex items-start gap-2">
                <FaHandshake className="mt-0.5 text-red-500" />
                <span>Activación comercial</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgb(var(--line))" }}>
          <img src="/img/BUENIMAR-2.avif" alt="Centro logistico Buenimar" className="w-full h-full min-h-[260px] md:min-h-[360px] object-cover" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="mx-auto mt-10 sm:mt-14 max-w-4xl px-2 sm:px-0">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          {/* CAMPOS PARA CLIENTE */}
          {accountType === "cliente" && (
            <>
              {/* Commerce Name */}
              <div className="md:col-span-2">
                <label
                  htmlFor="commerce"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Nombre del Comercio *
                </label>
                <div className="mt-2">
                  <input
                    id="commerce"
                    type="text"
                    name="commerce"
                    required
                    placeholder="Ej: Almacén La Esquina"
                    className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Dirección *
                </label>
                <div className="mt-2">
                  <input
                    id="address"
                    type="text"
                    name="address"
                    required
                    placeholder="Calle y número"
                    className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Rubro/Categoría
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="almacen">Almacén</option>
                    <option value="supermercado">Supermercado</option>
                    <option value="kiosko">Kiosco</option>
                    <option value="verduleria">Verdulería</option>
                    <option value="carniceria">Carnicería</option>
                    <option value="panaderia">Panadería</option>
                    <option value="farmacia">Farmacia</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              {/* Volume */}
              <div>
                <label
                  htmlFor="volume"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Volumen Estimado
                </label>
                <div className="mt-2.5">
                  <select
                    id="volume"
                    name="volume"
                    className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  >
                    <option value="">Seleccionar volumen</option>
                    <option value="pequeno">Pequeño ({`<`} $5,000 mensuales)</option>
                    <option value="medio">Medio ($5,000 - $20,000)</option>
                    <option value="grande">Grande ($20,000 - $50,000)</option>
                    <option value="muy-grande">Muy Grande ({`>`} $50,000)</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* CAMPOS PARA PROVEEDOR */}
          {accountType === "proveedor" && (
            <>
              {/* Company Name */}
              <div className="md:col-span-2">
                <label
                  htmlFor="company-name"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Nombre de la Empresa/Marca *
                </label>
                <div className="mt-2">
                  <input
                    id="company-name"
                    type="text"
                    name="company-name"
                    required
                    placeholder="Ej: Productos Artesanales XYZ"
                    className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  />
                </div>
              </div>

              {/* Product Type */}
              <div className="md:col-span-2">
                <label
                  htmlFor="product-type"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Tipo de Producto *
                </label>
                <div className="mt-2">
                  <input
                    id="product-type"
                    type="text"
                    name="product-type"
                    required
                    placeholder="Ej: Alimentos, Bebidas, Electrónica, etc."
                    className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  />
                </div>
              </div>

              {/* Product Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="product-description"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Descripción del Producto
                </label>
                <div className="mt-2">
                  <textarea
                    id="product-description"
                    name="product-description"
                    rows={3}
                    placeholder="Describe brevemente tu producto y sus características"
                    className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 resize-none"
                    style={fieldStyle}
                  />
                </div>
              </div>

              {/* Product Volume */}
              <div>
                <label
                  htmlFor="product-volume"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Volumen de Producción
                </label>
                <div className="mt-2">
                  <select
                    id="product-volume"
                    name="product-volume"
                    className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  >
                    <option value="">Seleccionar volumen</option>
                    <option value="pequeno">Pequeño ({`<`} 10,000 unidades/mes)</option>
                    <option value="medio">Medio (10,000 - 50,000 unidades/mes)</option>
                    <option value="grande">Grande (50,000 - 200,000 unidades/mes)</option>
                    <option value="muy-grande">Muy Grande ({`>`} 200,000 unidades/mes)</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* CAMPOS PARA TRABAJA CON NOSOTROS */}
          {accountType === "trabaja" && (
            <>
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Nombre *
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    type="text"
                    name="first-name"
                    required
                    placeholder="Tu nombre"
                    className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Apellido *
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    type="text"
                    name="last-name"
                    required
                    placeholder="Tu apellido"
                    className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="locality"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Localidad de residencia *
                </label>
                <div className="mt-2">
                  <select
                    id="locality"
                    name="locality"
                    required
                    className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  >
                    <option value="">Seleccionar localidad</option>
                    {localities.map((locality) => (
                      <option key={locality.id} value={locality.name}>
                        {locality.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="motivation"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  ¿Por qué te gustaría trabajar con nosotros? *
                </label>
                <div className="mt-2">
                  <textarea
                    id="motivation"
                    name="motivation"
                    rows={4}
                    required
                    placeholder="Contanos brevemente tu motivación"
                    className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 resize-none"
                    style={fieldStyle}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="cv-file"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Adjuntar CV *
                </label>
                <div className="mt-2">
                  <input
                    id="cv-file"
                    type="file"
                    name="cv-file"
                    required
                    accept=".pdf,.doc,.docx"
                    className="block w-full rounded-md px-3 py-2 text-xs sm:text-sm outline outline-1 -outline-offset-1 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-3 file:py-1.5 file:text-white"
                    style={fieldStyle}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="additional-files"
                  className="block text-xs sm:text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Archivos adicionales (opcional, hasta {MAX_EXTRA_FILES})
                </label>
                <div className="mt-2">
                  <input
                    id="additional-files"
                    type="file"
                    name="additional-files"
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="block w-full rounded-md px-3 py-2 text-xs sm:text-sm outline outline-1 -outline-offset-1 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-3 file:py-1.5 file:text-white"
                    style={fieldStyle}
                  />
                </div>
                <p className="mt-1 text-xs" style={{ color: "rgb(var(--muted))" }}>
                  Máximo {MAX_EXTRA_FILES} archivos adicionales, hasta {MAX_FILE_SIZE_MB}MB cada uno.
                </p>
                {fileError && (
                  <p className="mt-1 text-xs" style={{ color: "#dc2626" }}>
                    {fileError}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Contact Name - PARA CLIENTE/PROVEEDOR */}
          {accountType !== "trabaja" && (
          <div className="md:col-span-2">
            <label
              htmlFor="contact-name"
              className="block text-xs sm:text-sm leading-6 font-semibold"
              style={{ color: "rgb(var(--text))" }}
            >
              Nombre del Contacto
            </label>
            <div className="mt-2">
              <input
                id="contact-name"
                type="text"
                name="contact-name"
                placeholder="Tu nombre"
                className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                style={fieldStyle}
              />
            </div>
          </div>
          )}

          {/* Email - PARA AMBOS */}
          <div className="md:col-span-2">
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm leading-6 font-semibold"
              style={{ color: "rgb(var(--text))" }}
            >
              Email *
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="tu@email.com"
                className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* Phone - PARA AMBOS */}
          <div className="md:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-xs sm:text-sm leading-6 font-semibold"
              style={{ color: "rgb(var(--text))" }}
            >
              Teléfono
            </label>
            <div className="mt-2">
              <input
                id="phone-number"
                type="tel"
                name="phone-number"
                autoComplete="tel"
                required={accountType === "trabaja"}
                placeholder="+598 99 999 999"
                className="block w-full rounded-md px-3 sm:px-3.5 py-2 text-sm sm:text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex gap-x-3 sm:gap-x-4 md:col-span-2">
            <div className="flex h-6 items-center">
              <input
                id="agree-to-policies"
                name="agree-to-policies"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300"
                style={{
                  background: "rgb(var(--panel))",
                  borderColor: "rgb(var(--line))",
                  accentColor: "#dc2626",
                }}
              />
            </div>
            <label
              htmlFor="agree-to-policies"
              className="text-xs sm:text-sm leading-6"
              style={{ color: "rgb(var(--muted))" }}
            >
              Acepto los{" "}
              <Link
                href="/politica-privacidad"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
                style={{ color: "rgb(var(--accent))" }}
              >
                términos y condiciones
              </Link>
              {" "}de Buenimar
            </label>
          </div>
        </div>

        {/* Message */}
        {result && (
          <div
            className={`mt-8 p-3 sm:p-4 rounded-lg flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${
              result.ok
                ? "bg-green-50"
                : "bg-red-50"
            }`}
            style={{
              background: result.ok
                ? "rgba(34, 197, 94, 0.1)"
                : "rgba(239, 68, 68, 0.1)",
            }}
          >
            {result.ok ? (
              <FaCheckCircle className="text-green-600 text-lg sm:text-xl flex-shrink-0" />
            ) : (
              <FaExclamationCircle className="text-red-600 text-lg sm:text-xl flex-shrink-0" />
            )}
            <p
              style={{
                color: result.ok ? "#16a34a" : "#dc2626",
              }}
            >
              {result.msg}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8 sm:mt-10">
          <button
            type="submit"
            disabled={submitting}
            className="block w-full rounded-md px-3 sm:px-3.5 py-2 sm:py-2.5 text-center text-sm sm:text-base font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            style={{ background: "#dc2626" }}
          >
            {submitting
              ? "Procesando..."
              : accountType === "cliente"
                ? "Abrir Cuenta"
                : accountType === "proveedor"
                  ? "Registrarse como Proveedor"
                  : "Enviar Postulación"}
          </button>
        </div>
      </form>
    </section>
  );
}

