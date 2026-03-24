import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { SITE } from "@/lib/siteContent";
import { localities } from "@/lib/coverageData";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 1200;
const WHATSAPP_URL = "https://wa.me/59897557366";

function normalizeText(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function getLocalReply(rawMessage: string) {
  const message = normalizeText(rawMessage);
  const catalogNames = SITE.catalogs
    .map((catalog) => catalog.title.replace("Catálogo ", ""))
    .join(", ");

  if (hasAny(message, ["hola", "buenas", "buen dia", "buenas tardes", "buenas noches"])) {
    return "Hola, bienvenido a Buenimar Colonia. Te puedo ayudar con catálogos, marcas, cobertura, contacto y abrir cuenta. ¿Qué necesitás consultar?";
  }

  if (hasAny(message, ["catalogo", "catalogos", "pdf", "descargar", "descarga"])) {
    return `Hoy tenemos ${SITE.catalogs.length} catálogos publicados: ${catalogNames}. Los podés ver y descargar en la sección Marcas. Si querés, también te guiamos por WhatsApp: ${WHATSAPP_URL}`;
  }

  if (hasAny(message, ["marca", "marcas", "producto", "productos"])) {
    return "Trabajamos con más de 100 marcas líderes. En la página Marcas podés revisar catálogos y logos disponibles. Si buscás una marca puntual, escribinos por WhatsApp y te confirmamos disponibilidad: https://wa.me/59897557366";
  }

  if (hasAny(message, ["cobertura", "zona", "zonas", "localidad", "localidades", "reparto", "entrega"])) {
    return `Tenemos cobertura activa en ${localities.length} localidades del Departamento de Colonia y alrededores. Para confirmar tu zona exacta y frecuencia de entrega, escribinos por WhatsApp: ${WHATSAPP_URL}`;
  }

  if (hasAny(message, ["horario", "horarios", "atencion", "atienden"])) {
    return "Podemos pasarte el horario actualizado por atención comercial para evitar información desactualizada. Escribinos por WhatsApp y te confirmamos al momento: https://wa.me/59897557366";
  }

  if (hasAny(message, ["contacto", "telefono", "mail", "correo", "email", "whatsapp"])) {
    return "Canales de contacto: WhatsApp +598 97 557 366, teléfono +598 4522 4091 y email pedidos@buenimar.com. Si querés respuesta comercial rápida, te recomendamos WhatsApp: https://wa.me/59897557366";
  }

  if (hasAny(message, ["abrir cuenta", "alta", "cliente", "proveedor", "registrar", "unite"])) {
    return "Para abrir cuenta como cliente o registrarte como proveedor, completá la sección Unite (Abrir cuenta) en la web. Si preferís, te acompañamos por WhatsApp paso a paso: https://wa.me/59897557366";
  }

  if (hasAny(message, ["precio", "precios", "lista", "condiciones", "credito", "descuento"])) {
    return "Para precios, condiciones comerciales y financiación te derivamos con ventas para darte información correcta y vigente. Contacto directo por WhatsApp: https://wa.me/59897557366";
  }

  return "Te ayudo con marcas, catálogos, cobertura, contacto y abrir cuenta. Si tu consulta es comercial específica, escribinos por WhatsApp y te responde el equipo: https://wa.me/59897557366";
}

function buildSystemPrompt() {
  const catalogNames = SITE.catalogs
    .map((catalog) => catalog.title.replace("Catálogo ", ""))
    .join(", ");

  return [
    "Sos el asistente virtual de Buenimar Colonia.",
    "Respondé siempre en español, en tono claro, comercial y útil.",
    "Objetivo: ayudar con marcas, catálogos, cobertura, contacto, horarios, abrir cuenta y consultas de distribución.",
    "Reglas obligatorias:",
    "- No inventes precios, horarios, condiciones comerciales o promesas de entrega.",
    "- Si no sabés algo con certeza, decilo y derivá a atención humana.",
    "- Si la consulta es comercial o sensible, invitá a continuar por WhatsApp: +598 97 557 366.",
    "- Mantené respuestas cortas y accionables.",
    "Contexto de Buenimar:",
    "- Más de 100 marcas y más de 30 años de trayectoria.",
    `- Catálogos actualmente publicados: ${catalogNames}.`,
    "- Zona principal: Departamento de Colonia y alrededores.",
    "- Contacto principal: pedidos@buenimar.com y WhatsApp comercial.",
  ].join("\n");
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new OpenAI({ apiKey });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { message?: string; sessionId?: string };
    const rawMessage = body?.message?.trim() ?? "";
    const sessionId = body?.sessionId?.trim() || "anon-web";

    if (!rawMessage) {
      return NextResponse.json({ ok: false, error: "Mensaje vacío" }, { status: 400 });
    }

    if (rawMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          ok: false,
          error: `El mensaje supera el máximo permitido (${MAX_MESSAGE_LENGTH} caracteres).`,
        },
        { status: 400 }
      );
    }

    const provider = (process.env.CHAT_PROVIDER || "auto").trim().toLowerCase();
    const client = getOpenAIClient();
    const useLocalOnly = provider === "local";
    const canUseOpenAI = !!client && !useLocalOnly;

    if (!canUseOpenAI) {
      return NextResponse.json({ ok: true, reply: getLocalReply(rawMessage), mode: "local" });
    }

    const tools =
      process.env.OPENAI_VECTOR_STORE_ID && process.env.OPENAI_VECTOR_STORE_ID.trim()
        ? [
            {
              type: "file_search" as const,
              vector_store_ids: [process.env.OPENAI_VECTOR_STORE_ID.trim()],
            },
          ]
        : undefined;

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL?.trim() || "gpt-4.1-mini",
      input: [
        { role: "system", content: buildSystemPrompt() },
        {
          role: "user",
          content: `[web] Sesión ${sessionId}: ${rawMessage}`,
        },
      ],
      tools,
    });

    const reply =
      response.output_text?.trim() ||
      getLocalReply(rawMessage);

    return NextResponse.json({ ok: true, reply, mode: "openai" });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        ok: true,
        reply: getLocalReply(""),
        mode: "local-fallback",
      },
      { status: 200 }
    );
  }
}
