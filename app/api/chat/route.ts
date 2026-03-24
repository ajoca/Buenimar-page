import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { SITE } from "@/lib/siteContent";
import { localities } from "@/lib/coverageData";
import { CHAT_FAQS } from "@/lib/chatFaqs";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 1200;
const WHATSAPP_URL = "https://wa.me/59897557366";
const PHONE = "+598 4522 4091";
const EMAIL = "pedidos@buenimar.com";

type ChatAction = {
  label: string;
  href: string;
  external?: boolean;
};

type LocalReply = {
  reply: string;
  actions?: ChatAction[];
};

type KnowledgeItem = {
  id: string;
  keywords: string[];
  searchableText: string;
  reply: LocalReply;
};

function normalizeText(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function tokenize(input: string) {
  return normalizeText(input)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

function pickCoverageHint(message: string) {
  const normalized = normalizeText(message);
  const match = localities.find((locality) =>
    normalized.includes(normalizeText(locality.name))
  );

  if (!match) {
    return null;
  }

  return {
    reply: [
      `Si, ${match.name} esta dentro de la cobertura activa.`,
      "Si queres, te confirmamos frecuencia y dia de reparto.",
    ].join("\n"),
    actions: [
      { label: "WhatsApp Comercial", href: WHATSAPP_URL, external: true },
      { label: "Ver Cobertura", href: "/cobertura" },
    ],
  } satisfies LocalReply;
}

type Intent = {
  id: string;
  keywords: string[];
  reply: (message: string) => LocalReply;
};

const LOCAL_INTENTS: Intent[] = [
  {
    id: "saludo",
    keywords: ["hola", "buenas", "buen dia", "buenas tardes", "buenas noches", "que tal"],
    reply: () => ({
      reply: [
        "Hola, soy el asistente de Buenimar.",
        "En que te puedo ayudar hoy?",
      ].join("\n"),
      actions: [
        { label: "Ver Marcas", href: "/marcas" },
        { label: "Consultar Cobertura", href: "/cobertura" },
      ],
    }),
  },
  {
    id: "catalogos",
    keywords: ["catalogo", "catalogos", "pdf", "descargar", "descarga", "ver catalogo"],
    reply: () => {
      const catalogNames = SITE.catalogs
        .map((catalog) => catalog.title.replace("Catálogo ", ""))
        .join(", ");
      return {
        reply: [
          `Tenemos ${SITE.catalogs.length} catalogos publicados: ${catalogNames}.`,
          "Los podes ver y descargar en la seccion Marcas.",
        ].join("\n"),
        actions: [
          { label: "Ir a Marcas", href: "/marcas" },
          { label: "Ver Catalogos", href: "/marcas#catalogos" },
          { label: "WhatsApp", href: WHATSAPP_URL, external: true },
        ],
      };
    },
  },
  {
    id: "marcas",
    keywords: ["marca", "marcas", "producto", "productos", "proveedor"],
    reply: () => ({
      reply: [
        "Trabajamos con mas de 100 marcas lideres.",
        "Si buscas una marca puntual, te la confirmamos en el momento.",
      ].join("\n"),
      actions: [
        { label: "Ir a Marcas", href: "/marcas" },
        { label: "WhatsApp Comercial", href: WHATSAPP_URL, external: true },
      ],
    }),
  },
  {
    id: "cobertura",
    keywords: ["cobertura", "zona", "zonas", "localidad", "localidades", "reparto", "entrega"],
    reply: (message) =>
      pickCoverageHint(message) || {
        reply: [
          `Tenemos cobertura activa en ${localities.length} localidades de Colonia y alrededores.`,
          "Decime tu localidad y te confirmo si esta cubierta.",
        ].join("\n"),
        actions: [
          { label: "Ver Cobertura", href: "/cobertura" },
          { label: "WhatsApp Comercial", href: WHATSAPP_URL, external: true },
        ],
      },
  },
  {
    id: "contacto",
    keywords: ["contacto", "telefono", "mail", "correo", "email", "whatsapp", "llamar"],
    reply: () => ({
      reply: [
        `Canales directos: WhatsApp +598 97 557 366, telefono ${PHONE}, email ${EMAIL}.`,
        "Si queres respuesta rapida, escribinos por WhatsApp.",
      ].join("\n"),
      actions: [
        { label: "Abrir WhatsApp", href: WHATSAPP_URL, external: true },
        { label: "Ir a Contacto", href: "/contacto" },
      ],
    }),
  },
  {
    id: "horarios",
    keywords: ["horario", "horarios", "atencion", "atienden", "abren"],
    reply: () => ({
      reply: [
        "Para pasarte el horario vigente y exacto, te derivo con atencion comercial.",
        "Te responden rapido por WhatsApp.",
      ].join("\n"),
      actions: [{ label: "Consultar por WhatsApp", href: WHATSAPP_URL, external: true }],
    }),
  },
  {
    id: "abrir-cuenta",
    keywords: ["abrir cuenta", "alta", "cliente", "registrar", "unite", "proveedor"],
    reply: () => ({
      reply: [
        "Perfecto, te ayudo con eso.",
        "Para abrir cuenta (cliente o proveedor), completa la seccion Unite (Abrir cuenta).",
      ].join("\n"),
      actions: [
        { label: "Ir a Abrir Cuenta", href: "/abrir-cuenta" },
        { label: "WhatsApp Comercial", href: WHATSAPP_URL, external: true },
      ],
    }),
  },
  {
    id: "comercial-sensible",
    keywords: ["precio", "precios", "lista", "condiciones", "credito", "descuento", "plazo", "oferta"],
    reply: () => ({
      reply: [
        "Para precios y condiciones comerciales te paso con ventas, asi te damos datos vigentes y exactos.",
        "Te atienden directo por WhatsApp.",
      ].join("\n"),
      actions: [{ label: "Hablar con Ventas", href: WHATSAPP_URL, external: true }],
    }),
  },
];

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  ...CHAT_FAQS,
  {
    id: "empresa-historia",
    keywords: ["empresa", "historia", "fundacion", "trayectoria", "anos", "1996", "2012", "2013", "2026"],
    searchableText: "historia buenimar fundada 1996 certificacion 2012 2013 30 anos 2026 distribuidora colonia",
    reply: {
      reply: [
        "Buenimar tiene mas de 30 anos de trayectoria en Colonia.",
        "Hitos clave: fundacion en 1996, proceso ISO desde 2012 y consolidacion de calidad desde 2013.",
      ].join("\n"),
      actions: [{ label: "Ver Empresa", href: "/empresa" }],
    },
  },
  {
    id: "iso",
    keywords: ["iso", "certificacion", "calidad", "9001", "auditado"],
    searchableText: "certificacion iso 9001 sistema gestion calidad procesos auditados mejora continua",
    reply: {
      reply: [
        "Si, Buenimar trabaja con enfoque de calidad y certificacion ISO 9001.",
        "Eso respalda procesos auditados y mejora continua en el servicio.",
      ].join("\n"),
      actions: [{ label: "Conocer la Empresa", href: "/empresa" }],
    },
  },
  {
    id: "cultura",
    keywords: ["cultura", "valores", "confianza", "equipo", "mejora", "profesional"],
    searchableText: "cultura de calidad confianza enfoque cliente trabajo equipo compromiso mejora continua desarrollo profesional",
    reply: {
      reply: [
        "Nuestra cultura se apoya en confianza, enfoque en el cliente y trabajo en equipo.",
        "Tambien priorizamos compromiso, mejora continua y desarrollo profesional.",
      ].join("\n"),
      actions: [{ label: "Ver Empresa", href: "/empresa" }],
    },
  },
  {
    id: "productos",
    keywords: ["productos", "destacados", "que venden", "alimentos", "bebidas"],
    searchableText: "productos destacados alimentos bebidas congelados distribucion marcas",
    reply: {
      reply: [
        `Tenemos productos de multiples categorias y mas de ${SITE.products.length} destacados en la web.`,
        "Si queres, te guiamos por categoria o marca segun tu negocio.",
      ].join("\n"),
      actions: [
        { label: "Ver Inicio", href: "/" },
        { label: "Ir a Marcas", href: "/marcas" },
      ],
    },
  },
  {
    id: "marcas-catalogos",
    keywords: ["marcas", "catalogos", "conaprole", "pagnifique", "almena", "la especialista"],
    searchableText: "mas de 100 marcas catalogos conaprole la especialista pagnifique almena",
    reply: {
      reply: [
        `Trabajamos con mas de 100 marcas y hoy hay ${SITE.catalogs.length} catalogos publicados.`,
        "Podes verlos y descargarlos desde la pagina de Marcas.",
      ].join("\n"),
      actions: [
        { label: "Ir a Marcas", href: "/marcas" },
        { label: "Ver Catalogos", href: "/marcas#catalogos" },
      ],
    },
  },
  {
    id: "cobertura-general",
    keywords: ["cobertura", "zona", "localidad", "departamento", "colonia", "reparto"],
    searchableText: "cobertura activa 16 localidades departamento colonia reparto",
    reply: {
      reply: [
        `Tenemos cobertura activa en ${localities.length} localidades de Colonia y alrededores.`,
        "Si me decis tu localidad, te digo si esta cubierta.",
      ].join("\n"),
      actions: [{ label: "Ver Cobertura", href: "/cobertura" }],
    },
  },
  {
    id: "contacto",
    keywords: ["contacto", "telefono", "mail", "correo", "direccion", "ubicacion", "mapa"],
    searchableText: "contacto pablo zufriategui 374 colonia del sacramento telefono whatsapp email mapa",
    reply: {
      reply: [
        `Estamos en Pablo Zufriategui 374, Colonia del Sacramento.`,
        `Contacto: WhatsApp +598 97 557 366, telefono ${PHONE}, email ${EMAIL}.`,
      ].join("\n"),
      actions: [
        { label: "Ir a Contacto", href: "/contacto" },
        { label: "Abrir WhatsApp", href: WHATSAPP_URL, external: true },
      ],
    },
  },
  {
    id: "abrir-cuenta",
    keywords: ["abrir cuenta", "cliente", "proveedor", "registrarse", "unite"],
    searchableText: "abrir cuenta cliente proveedor registrarse unite formulario",
    reply: {
      reply: [
        "Podes iniciar alta como cliente o proveedor desde la seccion Unite.",
        "Completas el formulario y el equipo comercial te contacta.",
      ].join("\n"),
      actions: [{ label: "Ir a Abrir Cuenta", href: "/abrir-cuenta" }],
    },
  },
  {
    id: "portal",
    keywords: ["portal", "consulta", "consultas", "solicitudes", "seguimiento"],
    searchableText: "portal consultas centralizadas seguimiento solicitudes atencion comercial",
    reply: {
      reply: [
        "El portal esta pensado para centralizar consultas y dar seguimiento comercial agil.",
        "Si queres, te llevo al acceso o te conecto por WhatsApp.",
      ].join("\n"),
      actions: [
        { label: "Ir a Contacto", href: "/contacto" },
        { label: "WhatsApp Comercial", href: WHATSAPP_URL, external: true },
      ],
    },
  },
  {
    id: "politica-privacidad",
    keywords: ["privacidad", "datos", "politica", "cookies", "informacion personal"],
    searchableText: "politica privacidad datos personales cookies uso de informacion",
    reply: {
      reply: [
        "Tenemos una seccion especifica de Politica de Privacidad con el detalle legal.",
        "Si queres, te llevo directo a esa pagina.",
      ].join("\n"),
      actions: [{ label: "Ver Politica", href: "/politica-privacidad" }],
    },
  },
  {
    id: "redes",
    keywords: ["instagram", "facebook", "twitter", "redes", "social"],
    searchableText: "redes sociales instagram facebook twitter buenimarcolonia",
    reply: {
      reply: [
        "Si, Buenimar esta en redes sociales para novedades y contacto.",
        "Te puedo pasar los enlaces oficiales que figuran en la web.",
      ].join("\n"),
      actions: [
        { label: "Instagram", href: "https://www.instagram.com/buenimarcolonia", external: true },
        { label: "Facebook", href: "https://www.facebook.com/buenimarcolonia", external: true },
      ],
    },
  },
];

function findKnowledgeReply(rawMessage: string): LocalReply | null {
  const normalized = normalizeText(rawMessage);
  const messageTokens = tokenize(rawMessage);

  let best: KnowledgeItem | null = null;
  let bestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;

    for (const keyword of item.keywords) {
      if (normalized.includes(normalizeText(keyword))) {
        score += keyword.includes(" ") ? 4 : 2;
      }
    }

    const itemTokens = tokenize(item.searchableText);
    for (const token of messageTokens) {
      if (itemTokens.includes(token)) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  if (best && bestScore >= 3) {
    return best.reply;
  }

  return null;
}

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

  const knowledgeReply = findKnowledgeReply(rawMessage);
  if (knowledgeReply) {
    return knowledgeReply;
  }

  return {
    reply: [
      "Gracias por escribirnos.",
      "Contame que necesitas y te ayudo ahora mismo.",
    ].join("\n"),
    actions: [
      { label: "Ver Marcas", href: "/marcas" },
      { label: "WhatsApp Comercial", href: WHATSAPP_URL, external: true },
    ],
  } satisfies LocalReply;
}

function getSuggestedActions(rawMessage: string): ChatAction[] | undefined {
  const message = normalizeText(rawMessage);

  if (message.includes("marca") || message.includes("catalogo")) {
    return [
      { label: "Ir a Marcas", href: "/marcas" },
      { label: "Ver Catalogos", href: "/marcas#catalogos" },
    ];
  }

  if (message.includes("contact") || message.includes("whatsapp") || message.includes("telefono") || message.includes("mail")) {
    return [
      { label: "Abrir WhatsApp", href: WHATSAPP_URL, external: true },
      { label: "Ir a Contacto", href: "/contacto" },
    ];
  }

  if (message.includes("cobertura") || message.includes("zona") || message.includes("localidad")) {
    return [
      { label: "Ver Cobertura", href: "/cobertura" },
      { label: "WhatsApp Comercial", href: WHATSAPP_URL, external: true },
    ];
  }

  if (message.includes("abrir cuenta") || message.includes("cliente") || message.includes("proveedor")) {
    return [{ label: "Ir a Abrir Cuenta", href: "/abrir-cuenta" }];
  }

  return undefined;
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
      const local = getLocalReply(rawMessage);
      return NextResponse.json({ ok: true, ...local, mode: "local" });
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
      getLocalReply(rawMessage).reply;

    return NextResponse.json({ ok: true, reply, actions: getSuggestedActions(rawMessage), mode: "openai" });
  } catch (error) {
    console.error("Chat API error:", error);
    const localFallback = getLocalReply("");
    return NextResponse.json(
      {
        ok: true,
        ...localFallback,
        mode: "local-fallback",
      },
      { status: 200 }
    );
  }
}
