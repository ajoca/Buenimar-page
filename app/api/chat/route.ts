import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { SITE } from "@/lib/siteContent";
import { localities } from "@/lib/coverageData";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 1200;
const WHATSAPP_URL = "https://wa.me/59897557366";
const PHONE = "+598 4522 4091";
const EMAIL = "pedidos@buenimar.com";

function normalizeText(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function pickCoverageHint(message: string) {
  const normalized = normalizeText(message);
  const match = localities.find((locality) =>
    normalized.includes(normalizeText(locality.name))
  );

  if (!match) {
    return null;
  }

  return [
    `Si, ${match.name} esta dentro de la cobertura activa.`,
    `Si queres, te confirmamos frecuencia y dia de reparto por WhatsApp: ${WHATSAPP_URL}`,
  ].join("\n");
}

type Intent = {
  id: string;
  keywords: string[];
  reply: (message: string) => string;
};

const LOCAL_INTENTS: Intent[] = [
  {
    id: "saludo",
    keywords: ["hola", "buenas", "buen dia", "buenas tardes", "buenas noches", "que tal"],
    reply: () =>
      [
        "Hola, soy el asistente de Buenimar.",
        "En que te puedo ayudar hoy?",
      ].join("\n"),
  },
  {
    id: "catalogos",
    keywords: ["catalogo", "catalogos", "pdf", "descargar", "descarga", "ver catalogo"],
    reply: () => {
      const catalogNames = SITE.catalogs
        .map((catalog) => catalog.title.replace("Catálogo ", ""))
        .join(", ");
      return [
        `Tenemos ${SITE.catalogs.length} catalogos publicados: ${catalogNames}.`,
        "Los podes ver y descargar en la seccion Marcas.",
        `Si queres, te paso el enlace directo por WhatsApp: ${WHATSAPP_URL}`,
      ].join("\n");
    },
  },
  {
    id: "marcas",
    keywords: ["marca", "marcas", "producto", "productos", "proveedor"],
    reply: () =>
      [
        "Trabajamos con mas de 100 marcas lideres.",
        `Si buscas una marca puntual, te la confirmamos por WhatsApp: ${WHATSAPP_URL}`,
      ].join("\n"),
  },
  {
    id: "cobertura",
    keywords: ["cobertura", "zona", "zonas", "localidad", "localidades", "reparto", "entrega"],
    reply: (message) =>
      pickCoverageHint(message) ||
      [
        `Tenemos cobertura activa en ${localities.length} localidades de Colonia y alrededores.`,
        "Decime tu localidad y te confirmo si esta cubierta.",
        `Tambien podes confirmarlo por WhatsApp: ${WHATSAPP_URL}`,
      ].join("\n"),
  },
  {
    id: "contacto",
    keywords: ["contacto", "telefono", "mail", "correo", "email", "whatsapp", "llamar"],
    reply: () =>
      [
        `Claro, te paso los canales directos: WhatsApp +598 97 557 366, telefono ${PHONE}, email ${EMAIL}.`,
        `Si queres respuesta rapida, escribinos por WhatsApp: ${WHATSAPP_URL}`,
      ].join("\n"),
  },
  {
    id: "horarios",
    keywords: ["horario", "horarios", "atencion", "atienden", "abren"],
    reply: () =>
      [
        "Para pasarte el horario vigente y exacto, te derivo con atencion comercial.",
        `${WHATSAPP_URL}`,
      ].join("\n"),
  },
  {
    id: "abrir-cuenta",
    keywords: ["abrir cuenta", "alta", "cliente", "registrar", "unite", "proveedor"],
    reply: () =>
      [
        "Perfecto, te ayudo con eso.",
        "Para abrir cuenta (cliente o proveedor), completa la seccion Unite (Abrir cuenta).",
        `Si queres, te guiamos paso a paso por WhatsApp: ${WHATSAPP_URL}`,
      ].join("\n"),
  },
  {
    id: "comercial-sensible",
    keywords: ["precio", "precios", "lista", "condiciones", "credito", "descuento", "plazo", "oferta"],
    reply: () =>
      [
        "Para precios y condiciones comerciales te paso con ventas, asi te damos datos vigentes y exactos.",
        `${WHATSAPP_URL}`,
      ].join("\n"),
  },
];

function getLocalReply(rawMessage: string) {
  const message = normalizeText(rawMessage);

  let bestIntent: Intent | null = null;
  let bestScore = 0;

  for (const intent of LOCAL_INTENTS) {
    const score = intent.keywords.reduce((acc, keyword) => {
      return acc + (message.includes(keyword) ? 1 : 0);
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  if (bestIntent && bestScore > 0) {
    return bestIntent.reply(rawMessage);
  }

  return [
    "Gracias por escribirnos.",
    "Contame que necesitas y te ayudo ahora mismo.",
    `Si preferis atencion comercial directa, escribinos por WhatsApp: ${WHATSAPP_URL}`,
  ].join("\n");
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
    "- Tono calido y cercano, sin sonar robotico.",
    "- Maximo 2 a 3 lineas por respuesta.",
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
