export type ChatAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type ChatFaqItem = {
  id: string;
  keywords: string[];
  searchableText: string;
  reply: {
    reply: string;
    actions?: ChatAction[];
  };
};

export const CHAT_FAQS: ChatFaqItem[] = [
  {
    id: "faq-entregas",
    keywords: ["entrega", "entregas", "demora", "demoras", "reparto", "cuando llega"],
    searchableText: "entregas reparto demora frecuencia dia de entrega cobertura",
    reply: {
      reply: [
        "Coordinamos entregas segun zona y frecuencia comercial.",
        "Si queres, te confirmamos dia y horario estimado para tu localidad.",
      ].join("\n"),
      actions: [
        { label: "Ver Cobertura", href: "/cobertura" },
        { label: "WhatsApp Comercial", href: "https://wa.me/59897557366", external: true },
      ],
    },
  },
  {
    id: "faq-pedidos",
    keywords: ["pedido", "pedidos", "comprar", "hacer pedido", "como pedir"],
    searchableText: "como hacer pedidos comprar mayorista contacto comercial whatsapp",
    reply: {
      reply: [
        "Podes gestionar pedidos por WhatsApp o con atencion comercial.",
        "Si queres, te derivamos ahora para gestionarlo mas rapido.",
      ].join("\n"),
      actions: [
        { label: "Abrir WhatsApp", href: "https://wa.me/59897557366", external: true },
        { label: "Ir a Contacto", href: "/contacto" },
      ],
    },
  },
  {
    id: "faq-marcas-principales",
    keywords: ["conaprole", "pagnifique", "almena", "la especialista", "marcas principales"],
    searchableText: "conaprole pagnifique almena la especialista catalogos marcas",
    reply: {
      reply: [
        "Trabajamos con marcas lideres como Conaprole, La Especialista, Pagnifique y Almena.",
        "En Marcas podes ver catalogos y descargar PDFs actualizados.",
      ].join("\n"),
      actions: [
        { label: "Ir a Marcas", href: "/marcas" },
        { label: "Ver Catalogos", href: "/marcas#catalogos" },
      ],
    },
  },
  {
    id: "faq-abrir-cuenta-cliente",
    keywords: ["ser cliente", "alta cliente", "nuevo cliente", "abrir cuenta cliente"],
    searchableText: "abrir cuenta cliente alta nuevo cliente formulario unite",
    reply: {
      reply: [
        "Para ser cliente, completa el formulario en la seccion Unite.",
        "Luego el equipo comercial te contacta para continuar el alta.",
      ].join("\n"),
      actions: [{ label: "Ir a Abrir Cuenta", href: "/abrir-cuenta" }],
    },
  },
  {
    id: "faq-registrar-proveedor",
    keywords: ["proveedor", "ser proveedor", "alta proveedor", "registrar proveedor"],
    searchableText: "registrar proveedor alta proveedor formulario unite",
    reply: {
      reply: [
        "Si queres registrarte como proveedor, tambien se hace desde Unite.",
        "Completa tus datos y te contactamos para evaluacion comercial.",
      ].join("\n"),
      actions: [
        { label: "Ir a Abrir Cuenta", href: "/abrir-cuenta" },
        { label: "Contacto Comercial", href: "https://wa.me/59897557366", external: true },
      ],
    },
  },
  {
    id: "faq-horario",
    keywords: ["horario", "horarios", "hora", "atienden", "atencion"],
    searchableText: "horarios atencion comercial confirmacion whatsapp",
    reply: {
      reply: [
        "Para evitar informacion desactualizada, te confirmamos horarios por atencion comercial.",
        "Si queres, te derivo ahora por WhatsApp.",
      ].join("\n"),
      actions: [{ label: "Consultar Horarios", href: "https://wa.me/59897557366", external: true }],
    },
  },
  {
    id: "faq-direccion",
    keywords: ["direccion", "donde estan", "ubicacion", "mapa", "como llegar"],
    searchableText: "direccion pablo zufriategui 374 colonia del sacramento ubicacion mapa",
    reply: {
      reply: [
        "Estamos en Pablo Zufriategui 374, Colonia del Sacramento.",
        "Si queres, te comparto el mapa y canales de contacto directo.",
      ].join("\n"),
      actions: [
        { label: "Ir a Contacto", href: "/contacto" },
        { label: "Abrir WhatsApp", href: "https://wa.me/59897557366", external: true },
      ],
    },
  },
  {
    id: "faq-privacidad",
    keywords: ["privacidad", "datos", "tratamiento de datos", "cookies", "politica"],
    searchableText: "politica privacidad datos personales cookies",
    reply: {
      reply: [
        "La informacion legal de datos y privacidad esta publicada en nuestra Politica de Privacidad.",
        "Si queres, te llevo directo a esa pagina.",
      ].join("\n"),
      actions: [{ label: "Ver Politica", href: "/politica-privacidad" }],
    },
  },
];
