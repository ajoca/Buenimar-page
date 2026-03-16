"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function OpenAccountSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const [accountType, setAccountType] = useState<"cliente" | "proveedor">("cliente");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; msg: string }>(null);

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

    const fd = new FormData(form);
    
    const payload = accountType === "cliente" ? {
      type: "cliente",
      commerce: String(fd.get("commerce") || ""),
      address: String(fd.get("address") || ""),
      category: String(fd.get("category") || ""),
      volume: String(fd.get("volume") || ""),
      contactName: String(fd.get("contact-name") || ""),
      email: String(fd.get("email") || ""),
      phoneNumber: String(fd.get("phone-number") || ""),
      agree: fd.get("agree-to-policies") === "on",
    } : {
      type: "proveedor",
      companyName: String(fd.get("company-name") || ""),
      productType: String(fd.get("product-type") || ""),
      productDescription: String(fd.get("product-description") || ""),
      productVolume: String(fd.get("product-volume") || ""),
      contactName: String(fd.get("contact-name") || ""),
      email: String(fd.get("email") || ""),
      phoneNumber: String(fd.get("phone-number") || ""),
      agree: fd.get("agree-to-policies") === "on",
    };

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
        msg: accountType === "cliente" 
          ? "¡Solicitud enviada exitosamente! Te contactaremos en las próximas 24 horas."
          : "¡Solicitud enviada exitosamente! Revisaremos tu producto y nos pondremos en contacto pronto.",
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
      className="isolate px-6 py-24 sm:py-32 lg:px-8"
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
          className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
          style={{ color: "rgb(var(--text))" }}
        >
          {title}
        </h2>
        <p
          className="mt-2 text-lg leading-8"
          style={{ color: "rgb(var(--muted))" }}
        >
          {subtitle}
        </p>

        {/* Toggle Cliente/Proveedor */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setAccountType("cliente")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              accountType === "cliente"
                ? "bg-red-600 text-white shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            style={
              accountType === "cliente"
                ? { background: "#dc2626" }
                : {
                    background: "rgb(var(--panel))",
                    color: "rgb(var(--text))",
                  }
            }
          >
            Quiero ser Cliente
          </button>
          <button
            type="button"
            onClick={() => setAccountType("proveedor")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              accountType === "proveedor"
                ? "bg-red-600 text-white shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            style={
              accountType === "proveedor"
                ? { background: "#dc2626" }
                : {
                    background: "rgb(var(--panel))",
                    color: "rgb(var(--text))",
                  }
            }
          >
            Quiero ser Proveedor
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* CAMPOS PARA CLIENTE */}
          {accountType === "cliente" && (
            <>
              {/* Commerce Name */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="commerce"
                  className="block text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Nombre del Comercio *
                </label>
                <div className="mt-2.5">
                  <input
                    id="commerce"
                    type="text"
                    name="commerce"
                    required
                    placeholder="Ej: Almacén La Esquina"
                    className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Dirección *
                </label>
                <div className="mt-2.5">
                  <input
                    id="address"
                    type="text"
                    name="address"
                    required
                    placeholder="Calle y número"
                    className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Rubro/Categoría
                </label>
                <div className="mt-2.5">
                  <select
                    id="category"
                    name="category"
                    className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
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
                  className="block text-sm leading-6 font-semibold"
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
              <div className="sm:col-span-2">
                <label
                  htmlFor="company-name"
                  className="block text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Nombre de la Empresa/Marca *
                </label>
                <div className="mt-2.5">
                  <input
                    id="company-name"
                    type="text"
                    name="company-name"
                    required
                    placeholder="Ej: Productos Artesanales XYZ"
                    className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  />
                </div>
              </div>

              {/* Product Type */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="product-type"
                  className="block text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Tipo de Producto *
                </label>
                <div className="mt-2.5">
                  <input
                    id="product-type"
                    type="text"
                    name="product-type"
                    required
                    placeholder="Ej: Alimentos, Bebidas, Electrónica, etc."
                    className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    style={fieldStyle}
                  />
                </div>
              </div>

              {/* Product Description */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="product-description"
                  className="block text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Descripción del Producto
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="product-description"
                    name="product-description"
                    rows={4}
                    placeholder="Describe brevemente tu producto y sus características"
                    className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 resize-none"
                    style={fieldStyle}
                  />
                </div>
              </div>

              {/* Product Volume */}
              <div>
                <label
                  htmlFor="product-volume"
                  className="block text-sm leading-6 font-semibold"
                  style={{ color: "rgb(var(--text))" }}
                >
                  Volumen de Producción
                </label>
                <div className="mt-2.5">
                  <select
                    id="product-volume"
                    name="product-volume"
                    className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
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

          {/* Contact Name - PARA AMBOS */}
          <div className="sm:col-span-2">
            <label
              htmlFor="contact-name"
              className="block text-sm leading-6 font-semibold"
              style={{ color: "rgb(var(--text))" }}
            >
              Nombre del Contacto
            </label>
            <div className="mt-2.5">
              <input
                id="contact-name"
                type="text"
                name="contact-name"
                placeholder="Tu nombre"
                className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* Email - PARA AMBOS */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm leading-6 font-semibold"
              style={{ color: "rgb(var(--text))" }}
            >
              Email *
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="tu@email.com"
                className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* Phone - PARA AMBOS */}
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm leading-6 font-semibold"
              style={{ color: "rgb(var(--text))" }}
            >
              Teléfono
            </label>
            <div className="mt-2.5">
              <input
                id="phone-number"
                type="tel"
                name="phone-number"
                autoComplete="tel"
                placeholder="+598 99 999 999"
                className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <input
                id="agree-to-policies"
                name="agree-to-policies"
                type="checkbox"
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
              className="text-sm leading-6"
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
            className={`mt-8 p-4 rounded-lg flex items-center gap-3 ${
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
              <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
            ) : (
              <FaExclamationCircle className="text-red-600 text-xl flex-shrink-0" />
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
        <div className="mt-10">
          <button
            type="submit"
            disabled={submitting}
            className="block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            style={{ background: "#dc2626" }}
          >
            {submitting ? "Procesando..." : accountType === "cliente" ? "Abrir Cuenta" : "Registrarse como Proveedor"}
          </button>
        </div>
      </form>
    </section>
  );
}
