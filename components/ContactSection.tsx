"use client";

import { useState } from "react";
import type { SocialLink } from "@/lib/types";
import { FaTwitter, FaInstagram, FaFacebookF, FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaExternalLinkAlt, FaCopy, FaCheck } from "react-icons/fa";

export default function ContactSection({
  title,
  lines,
  socials,
}: {
  title: string;
  lines: string[];
  socials: SocialLink[];
}) {
  const iconMap: Record<string, React.ElementType> = {
    tw: FaTwitter,
    ig: FaInstagram,
    fb: FaFacebookF,
  };

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; msg: string }>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("pedidos@buenimar.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Error copying email:", err);
    }
  };

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
    const payload = {
      firstName: String(fd.get("first-name") || ""),
      lastName: String(fd.get("last-name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      country: String(fd.get("country") || ""),
      phoneNumber: String(fd.get("phone-number") || ""),
      message: String(fd.get("message") || ""),
      agree: fd.get("agree-to-policies") === "on",
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Error");
      setResult({ ok: true, msg: "Mensaje enviado. ¡Gracias por contactarnos!" });
      // Reset form after successful submission
      setTimeout(() => {
        if (form) form.reset();
      }, 100);
    } catch (err: any) {
      setResult({ ok: false, msg: err?.message || "No se pudo enviar el mensaje" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="isolate px-6 py-24 sm:py-32 lg:px-8"
      id="contacto"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(var(--accent), 0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(var(--accent), 0.06), transparent 30%), rgb(var(--bg))",
        color: "rgb(var(--text))",
      }}
    >
      {/* Background gradient blur */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div 
          style={{ 
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" 
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
          Contacto
        </h2>
        <p
          className="mt-2 text-lg leading-8"
          style={{ color: "rgb(var(--muted))" }}
        >
          Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* First name */}
          <div>
            <label htmlFor="first-name" className="block text-sm leading-6 font-semibold" style={{ color: "rgb(var(--text))" }}>Nombre</label>
            <div className="mt-2.5">
              <input
                id="first-name"
                type="text"
                name="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* Last name */}
          <div>
            <label htmlFor="last-name" className="block text-sm leading-6 font-semibold" style={{ color: "rgb(var(--text))" }}>Apellido</label>
            <div className="mt-2.5">
              <input
                id="last-name"
                type="text"
                name="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* Company */}
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm leading-6 font-semibold" style={{ color: "rgb(var(--text))" }}>Empresa</label>
            <div className="mt-2.5">
              <input
                id="company"
                type="text"
                name="company"
                autoComplete="organization"
                className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm leading-6 font-semibold" style={{ color: "rgb(var(--text))" }}>Email</label>
            <div className="mt-2.5">
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* Phone number */}
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm leading-6 font-semibold" style={{ color: "rgb(var(--text))" }}>Teléfono</label>
            <div className="mt-2.5">
              <div
                className="flex rounded-md outline outline-1 -outline-offset-1 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500"
                style={fieldStyle}
              >
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select 
                    id="country" 
                    name="country" 
                    autoComplete="country" 
                    aria-label="Country" 
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent py-2 pr-7 pl-3.5 text-base placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm sm:leading-6"
                    style={{ color: "rgb(var(--text))" }}
                  >
                    <option>UY</option>
                    <option>AR</option>
                    <option>BR</option>
                  </select>
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end sm:size-4" style={{ color: "rgb(var(--muted))" }}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                </div>
                <input 
                  id="phone-number" 
                  type="text" 
                  name="phone-number" 
                  placeholder="123-456-7890" 
                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base placeholder:text-gray-500 focus:outline-none sm:text-sm sm:leading-6" 
                  style={{ color: "rgb(var(--text))" }}
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm leading-6 font-semibold" style={{ color: "rgb(var(--text))" }}>Mensaje</label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md px-3.5 py-2 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* Privacy policy checkbox */}
          <div className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <input 
                id="agree-to-policies" 
                type="checkbox" 
                name="agree-to-policies" 
                className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" 
              />
            </div>
            <label
              htmlFor="agree-to-policies"
              className="text-sm leading-6"
              style={{ color: "rgb(var(--muted))" }}
            >
              Al seleccionar esto, aceptas nuestra{" "}
              <a
                href="/politica-privacidad"
                className="font-semibold whitespace-nowrap hover:underline transition-colors"
                style={{ color: "rgb(var(--accent))" }}
              >
                política de privacidad
              </a>.
            </label>
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-10">
          <button
            type="submit"
            disabled={submitting}
            className="block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            style={{
              background: "rgb(var(--accent))",
              color: "white",
              borderColor: "rgba(var(--accent), 0.35)",
              outlineColor: "rgba(var(--accent), 0.8)",
            }}
          >
            {submitting ? "Enviando..." : "Enviar"}
          </button>
        </div>

        {result && (
          <div
            className="mx-auto max-w-xl mt-6 text-sm"
            style={{ color: result.ok ? "#16a34a" : "#dc2626" }}
          >
            {result.msg}
          </div>
        )}
      </form>

      {/* Social Links */}
      <div className="mx-auto max-w-2xl mt-16 sm:mt-20">
        <div className="panel rounded-2xl p-6 md:p-8 shadow-lg border" style={{ background: "rgb(var(--panel))", borderColor: "rgb(var(--line))" }}>
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "rgb(var(--text))" }}>Encuéntranos</h3>
            <p className="text-sm md:text-base" style={{ color: "rgb(var(--muted))" }}>Contacto rápido</p>
          </div>
          
          <div className="space-y-3">
            {/* Dirección - Clickeable con Maps */}
            <a
              href="https://www.google.com/maps?q=Pablo+Zufriategui+374,+Colonia+del+Sacramento,+Uruguay"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
              style={{ 
                background: "rgba(var(--accent), 0.05)", 
                borderColor: "rgba(var(--accent), 0.2)",
              }}
            >
              <div 
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shrink-0"
                style={{ background: "rgba(var(--accent), 0.15)" }}
              >
                <FaMapMarkerAlt className="text-lg md:text-xl" style={{ color: "rgb(var(--accent))" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm md:text-base font-semibold" style={{ color: "rgb(var(--text))" }}>
                  Pablo Zufriategui 374 · Colonia del Sacramento
                </div>
              </div>
              <FaExternalLinkAlt className="text-sm opacity-50 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: "rgb(var(--accent))" }} />
            </a>

            {/* WhatsApp - Botón Principal */}
            <a
              href="https://wa.me/59897557366"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              style={{ 
                background: "#25D366",
                borderColor: "#20BA5A",
              }}
            >
              <div 
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shrink-0 bg-white/20"
              >
                <FaWhatsapp className="text-2xl md:text-3xl text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm md:text-base font-bold text-white">
                  Escribir por WhatsApp
                </div>
                <div className="text-xs md:text-sm text-white/80">
                  +598 97 557 366
                </div>
              </div>
              <FaExternalLinkAlt className="text-sm text-white/70 group-hover:text-white transition-colors shrink-0" />
            </a>

            {/* Teléfono - Chip con ícono */}
            <a
              href="tel:+59845224091"
              className="group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
              style={{ 
                background: "rgb(var(--panel))", 
                borderColor: "rgb(var(--line))",
              }}
            >
              <div 
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shrink-0"
                style={{ background: "rgba(var(--accent), 0.1)" }}
              >
                <FaPhone className="text-lg md:text-xl" style={{ color: "rgb(var(--accent))" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm md:text-base font-semibold" style={{ color: "rgb(var(--text))" }}>
                  +598 4522 4091
                </div>
                <div className="text-xs md:text-sm" style={{ color: "rgb(var(--muted))" }}>
                  Llamar
                </div>
              </div>
            </a>

            {/* Email - Con botón copiar */}
            <div className="flex gap-2">
              <a
                href="mailto:pedidos@buenimar.com?subject=Consulta%20-%20Buenimar"
                className="group flex-1 flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                style={{ 
                  background: "rgb(var(--panel))", 
                  borderColor: "rgb(var(--line))",
                }}
              >
                <div 
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shrink-0"
                  style={{ background: "rgba(var(--accent), 0.1)" }}
                >
                  <FaEnvelope className="text-lg md:text-xl" style={{ color: "rgb(var(--accent))" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm md:text-base font-semibold truncate" style={{ color: "rgb(var(--text))" }}>
                    pedidos@buenimar.com
                  </div>
                  <div className="text-xs md:text-sm" style={{ color: "rgb(var(--muted))" }}>
                    Enviar email
                  </div>
                </div>
              </a>
              <button
                onClick={copyEmail}
                className="flex items-center justify-center w-12 h-auto rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ 
                  background: emailCopied ? "rgba(34, 197, 94, 0.1)" : "rgb(var(--panel))", 
                  borderColor: emailCopied ? "rgba(34, 197, 94, 0.3)" : "rgb(var(--line))",
                }}
                title="Copiar email"
              >
                {emailCopied ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaCopy className="text-base" style={{ color: "rgb(var(--muted))" }} />
                )}
              </button>
            </div>

            {/* Ver en Google Maps - Botón secundario */}
            <a
              href="https://www.google.com/maps?q=Pablo+Zufriategui+374,+Colonia+del+Sacramento,+Uruguay"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 p-3 rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
              style={{ 
                background: "rgb(var(--panel))", 
                borderColor: "rgb(var(--line))",
              }}
            >
              <FaMapMarkerAlt className="text-base" style={{ color: "rgb(var(--accent))" }} />
              <span className="text-sm md:text-base font-semibold" style={{ color: "rgb(var(--text))" }}>
                Ver ubicación en Google Maps
              </span>
              <FaExternalLinkAlt className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: "rgb(var(--accent))" }} />
            </a>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-base md:text-xl font-semibold mb-4" style={{ color: "rgb(var(--text))" }}>Síguenos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {socials.map((s) => {
              const Icon = iconMap[s.id] ?? null;
              const isExternal = s.href.startsWith("http");
              
              // Actualizar el label de Twitter a X
              const displayLabel = s.label === "Twitter" ? "X (Twitter)" : s.label;

              return (
                <a
                  key={s.id}
                  href={s.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="flex items-center justify-center gap-3 rounded-xl border px-4 py-3 font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                  style={{
                    background: "rgb(var(--panel))",
                    borderColor: "rgb(var(--line))",
                    color: "rgb(var(--text))",
                  }}
                >
                  <span
                    className="flex items-center justify-center h-8 w-8 rounded-full shrink-0"
                    style={{
                      background: "rgba(var(--accent), 0.1)",
                      color: "rgb(var(--accent))",
                    }}
                  >
                    {Icon ? <Icon className="text-lg" /> : null}
                  </span>
                  <span className="text-sm md:text-base">{displayLabel}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
