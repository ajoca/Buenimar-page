import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ClientePayload = {
  type: "cliente";
  commerce?: string;
  address?: string;
  category?: string;
  volume?: string;
  contactName?: string;
  email?: string;
  phoneNumber?: string;
  agree?: boolean;
};

type ProveedorPayload = {
  type: "proveedor";
  companyName?: string;
  productType?: string;
  productDescription?: string;
  productVolume?: string;
  contactName?: string;
  email?: string;
  phoneNumber?: string;
  agree?: boolean;
};

type AttachmentPayload = {
  filename: string;
  content: string;
  contentType: string;
  size?: number;
};

type TrabajaPayload = {
  type: "trabaja";
  firstName?: string;
  lastName?: string;
  locality?: string;
  email?: string;
  phoneNumber?: string;
  motivation?: string;
  agree?: boolean;
  cv?: AttachmentPayload;
  attachments?: AttachmentPayload[];
};

type Payload = ClientePayload | ProveedorPayload | TrabajaPayload;

const MAX_EXTRA_ATTACHMENTS = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const LOCALITY_MAIL_ROUTES: Record<string, string> = {
  carmelo: "admconaprolecarmelo@buenimar.com",
  "nueva helvecia": "admconaprolenh@buenimar.com",
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function resolveHiringDestination(locality: string, fallback: string) {
  const key = normalizeText(locality);
  return LOCALITY_MAIL_ROUTES[key] || fallback;
}

function createTransporter(options: {
  host: string;
  port: number;
  user: string;
  pass: string;
}) {
  return nodemailer.createTransport({
    host: options.host,
    port: options.port,
    secure: options.port === 465,
    auth: { user: options.user, pass: options.pass },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    tls: {
      rejectUnauthorized: false,
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildHtmlEmail(options: {
  title: string;
  intro: string;
  fields: Array<{ label: string; value: string; highlight?: boolean }>;
  footer?: string;
}) {
  const fieldsHtml = options.fields
    .map((field) => {
      if (field.highlight) {
        return `
          <div class="email-highlight">
            <span class="label">${escapeHtml(field.label)}:</span>
            <span class="value">${field.value}</span>
          </div>
        `;
      }

      return `
        <div class="field">
          <span class="label">${escapeHtml(field.label)}:</span>
          <span class="value">${field.value}</span>
        </div>
      `;
    })
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; color: white; padding: 15px; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #374151; }
        .value { color: #1f2937; margin-left: 10px; }
        .message-box { background-color: white; padding: 15px; border-left: 4px solid #dc2626; margin-top: 20px; }
        .email-highlight { background-color: #fef2f2; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .email-highlight a { color: #dc2626; text-decoration: none; font-weight: bold; }
        .footer { margin-top: 20px; padding: 10px; background-color: #ecfdf5; border-radius: 5px; font-size: 12px; color: #059669; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">${escapeHtml(options.title)}</h2>
        </div>
        <div class="content">
          <div class="message-box">
            <div style="white-space: pre-wrap; color: #1f2937;">${escapeHtml(options.intro)}</div>
          </div>
          ${fieldsHtml}
          ${options.footer ? `<div class="footer">${escapeHtml(options.footer)}</div>` : ""}
        </div>
      </div>
    </body>
    </html>
  `;
}

function buildTextEmail(options: {
  title: string;
  intro: string;
  fields: Array<{ label: string; value: string }>;
  footer?: string;
}) {
  const fieldsText = options.fields
    .map((field) => `${field.label}: ${field.value}`)
    .join("\n");

  return `${options.title}\n\n${options.intro}\n\n${fieldsText}${options.footer ? `\n\n---\n${options.footer}` : ""}`;
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as Payload;

    const { type } = data;

    if (type === "cliente") {
      const {
        commerce = "",
        address = "",
        category = "",
        volume = "",
        contactName = "",
        email = "",
        phoneNumber = "",
        agree = false,
      } = data as ClientePayload;

      if (!commerce || !email || !address) {
        return NextResponse.json(
          { ok: false, error: "Datos insuficientes" },
          { status: 400 }
        );
      }

      if (!agree) {
        return NextResponse.json(
          { ok: false, error: "Debes aceptar la política de privacidad" },
          { status: 400 }
        );
      }

      const host = process.env.SMTP_HOST ?? "";
      const port = Number(process.env.SMTP_PORT ?? 587);
      const user = process.env.SMTP_USER ?? "";
      const pass = process.env.SMTP_PASS ?? "";
      const to = process.env.MAIL_TO ?? "pedidos@buenimar.com";
      const from = process.env.MAIL_FROM ?? `Web Buenimar <no-reply@buenimar.com>`;

      if (!host || !user || !pass) {
        return NextResponse.json(
          { ok: false, error: "Configuración de servidor no disponible" },
          { status: 500 }
        );
      }

      const transporter = createTransporter({ host, port, user, pass });
      const subject = `UNITE: Nuevo cliente - ${commerce}`;
      const replyTo = email || undefined;
      const clientFields = [
        { label: "Tipo", value: "Cliente" },
        { label: "Comercio/Negocio", value: commerce },
        { label: "Dirección", value: address },
        { label: "Rubro/Categoría", value: category || "No especificado" },
        { label: "Volumen estimado", value: volume || "No especificado" },
        { label: "Contacto", value: contactName || "No especificado" },
        { label: "Email", value: `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`, highlight: true },
        { label: "Teléfono", value: phoneNumber || "No especificado" },
        { label: "Acepta políticas", value: agree ? "Sí" : "No" },
      ];

      const html = buildHtmlEmail({
        title: "Nueva solicitud UNITE desde www.buenimarcolonia.com",
        intro: "Se recibió una nueva solicitud de alta como cliente.",
        fields: clientFields,
        footer: "Puedes responder directamente a este correo para contactar al interesado.",
      });

      const text = buildTextEmail({
        title: "Nueva solicitud UNITE",
        intro: "Se recibió una nueva solicitud de alta como cliente.",
        fields: [
          { label: "Tipo", value: "Cliente" },
          { label: "Comercio/Negocio", value: commerce },
          { label: "Dirección", value: address },
          { label: "Rubro/Categoría", value: category || "No especificado" },
          { label: "Volumen estimado", value: volume || "No especificado" },
          { label: "Contacto", value: contactName || "No especificado" },
          { label: "Email", value: email },
          { label: "Teléfono", value: phoneNumber || "No especificado" },
          { label: "Acepta políticas", value: agree ? "Sí" : "No" },
        ],
        footer: "Puedes responder directamente a este correo para contactar al interesado.",
      });

      await transporter.sendMail({
        from,
        to,
        replyTo,
        subject,
        html,
        text,
      });

      const confirmationEmail = `
        <h2>Solicitud Recibida</h2>
        <p>Hola ${contactName || ""},</p>
        <p>Hemos recibido tu solicitud para abrir una cuenta en Buenimar.</p>
        <p>Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.</p>
        <p>Los datos registrados son:</p>
        <ul>
          <li><strong>Comercio:</strong> ${commerce}</li>
          <li><strong>Dirección:</strong> ${address}</li>
          <li><strong>Rubro:</strong> ${category || "No especificado"}</li>
          <li><strong>Volumen:</strong> ${volume || "No especificado"}</li>
        </ul>
        <p>¡Gracias por confiar en Buenimar!</p>
      `;

      if (email) {
        try {
          await transporter.sendMail({
            from,
            to: email,
            subject: "Solicitud UNITE recibida",
            html: confirmationEmail,
          });
        } catch (confirmationError) {
          console.error("Error enviando confirmación UNITE cliente:", confirmationError);
        }
      }

      return NextResponse.json({ ok: true });
    } else if (type === "proveedor") {
      const {
        companyName = "",
        productType = "",
        productDescription = "",
        productVolume = "",
        contactName = "",
        email = "",
        phoneNumber = "",
        agree = false,
      } = data as ProveedorPayload;

      if (!companyName || !email || !productType) {
        return NextResponse.json(
          { ok: false, error: "Datos insuficientes" },
          { status: 400 }
        );
      }

      if (!agree) {
        return NextResponse.json(
          { ok: false, error: "Debes aceptar la política de privacidad" },
          { status: 400 }
        );
      }

      const host = process.env.SMTP_HOST ?? "";
      const port = Number(process.env.SMTP_PORT ?? 587);
      const user = process.env.SMTP_USER ?? "";
      const pass = process.env.SMTP_PASS ?? "";
      const to = process.env.PROVIDER_MAIL_TO ?? "pablo.barrotti@buenimar.com";
      const from = process.env.MAIL_FROM ?? `Web Buenimar <no-reply@buenimar.com>`;

      if (!host || !user || !pass) {
        return NextResponse.json(
          { ok: false, error: "SMTP no configurado en variables de entorno" },
          { status: 500 }
        );
      }

      const transporter = createTransporter({ host, port, user, pass });
      const subject = `UNITE: Nuevo proveedor - ${companyName}`;
      const replyTo = email || undefined;
      const providerFields = [
        { label: "Tipo", value: "Proveedor" },
        { label: "Empresa/Marca", value: companyName },
        { label: "Tipo de producto", value: productType },
        { label: "Descripción del producto", value: productDescription || "No especificado" },
        { label: "Volumen de producción", value: productVolume || "No especificado" },
        { label: "Contacto", value: contactName || "No especificado" },
        { label: "Email", value: `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`, highlight: true },
        { label: "Teléfono", value: phoneNumber || "No especificado" },
        { label: "Acepta políticas", value: agree ? "Sí" : "No" },
      ];

      const html = buildHtmlEmail({
        title: "Nueva solicitud UNITE desde www.buenimarcolonia.com",
        intro: "Se recibió una nueva solicitud para sumarse como proveedor.",
        fields: providerFields,
        footer: "Puedes responder directamente a este correo para contactar al proveedor.",
      });

      const text = buildTextEmail({
        title: "Nueva solicitud UNITE",
        intro: "Se recibió una nueva solicitud para sumarse como proveedor.",
        fields: [
          { label: "Tipo", value: "Proveedor" },
          { label: "Empresa/Marca", value: companyName },
          { label: "Tipo de producto", value: productType },
          { label: "Descripción del producto", value: productDescription || "No especificado" },
          { label: "Volumen de producción", value: productVolume || "No especificado" },
          { label: "Contacto", value: contactName || "No especificado" },
          { label: "Email", value: email },
          { label: "Teléfono", value: phoneNumber || "No especificado" },
          { label: "Acepta políticas", value: agree ? "Sí" : "No" },
        ],
        footer: "Puedes responder directamente a este correo para contactar al proveedor.",
      });

      await transporter.sendMail({
        from,
        to,
        replyTo,
        subject,
        html,
        text,
      });

      const confirmationEmail = `
        <h2>Solicitud Recibida</h2>
        <p>Hola ${contactName || ""},</p>
        <p>Hemos recibido tu solicitud para registrarte como proveedor en Buenimar.</p>
        <p>Nuestro equipo revisará tu producto y se pondrá en contacto contigo pronto.</p>
        <p>Los datos registrados son:</p>
        <ul>
          <li><strong>Empresa/Marca:</strong> ${companyName}</li>
          <li><strong>Tipo de Producto:</strong> ${productType}</li>
          <li><strong>Volumen:</strong> ${productVolume || "No especificado"}</li>
        </ul>
        <p>¡Esperamos poder trabajar juntos!</p>
      `;

      if (email) {
        try {
          await transporter.sendMail({
            from,
            to: email,
            subject: "Solicitud UNITE recibida",
            html: confirmationEmail,
          });
        } catch (confirmationError) {
          console.error("Error enviando confirmación UNITE proveedor:", confirmationError);
        }
      }

      return NextResponse.json({ ok: true });
    } else if (type === "trabaja") {
      const {
        firstName = "",
        lastName = "",
        locality = "",
        email = "",
        phoneNumber = "",
        motivation = "",
        agree = false,
        cv,
        attachments = [],
      } = data as TrabajaPayload;

      if (!firstName || !lastName || !locality || !email || !phoneNumber || !motivation || !cv) {
        return NextResponse.json(
          { ok: false, error: "Datos insuficientes para postulación" },
          { status: 400 }
        );
      }

      if (!agree) {
        return NextResponse.json(
          { ok: false, error: "Debes aceptar la política de privacidad" },
          { status: 400 }
        );
      }

      if ((attachments?.length || 0) > MAX_EXTRA_ATTACHMENTS) {
        return NextResponse.json(
          { ok: false, error: `Máximo ${MAX_EXTRA_ATTACHMENTS} archivos adicionales` },
          { status: 400 }
        );
      }

      if ((cv.size ?? 0) > MAX_FILE_SIZE) {
        return NextResponse.json(
          { ok: false, error: "El archivo de CV supera el tamaño permitido (5MB)" },
          { status: 400 }
        );
      }

      const oversized = attachments.find((item) => (item.size ?? 0) > MAX_FILE_SIZE);
      if (oversized) {
        return NextResponse.json(
          { ok: false, error: `El archivo ${oversized.filename} supera el tamaño permitido (5MB)` },
          { status: 400 }
        );
      }

      const host = process.env.SMTP_HOST ?? "";
      const port = Number(process.env.SMTP_PORT ?? 587);
      const user = process.env.SMTP_USER ?? "";
      const pass = process.env.SMTP_PASS ?? "";
      const defaultTo = process.env.MAIL_TO ?? "pedidos@buenimar.com";
      const to = resolveHiringDestination(locality, defaultTo);
      const from = process.env.MAIL_FROM ?? `Web Buenimar <no-reply@buenimar.com>`;

      if (!host || !user || !pass) {
        return NextResponse.json(
          { ok: false, error: "SMTP no configurado en variables de entorno" },
          { status: 500 }
        );
      }

      const transporter = createTransporter({ host, port, user, pass });
      const subject = `UNITE: Trabajá con nosotros - ${firstName} ${lastName}`;
      const replyTo = email || undefined;

      const fields = [
        { label: "Tipo", value: "Trabajá con nosotros" },
        { label: "Nombre", value: `${firstName} ${lastName}`.trim() },
        { label: "Localidad", value: locality },
        { label: "Email", value: `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`, highlight: true },
        { label: "Teléfono", value: phoneNumber },
        { label: "Motivación", value: motivation },
        { label: "Acepta políticas", value: agree ? "Sí" : "No" },
      ];

      const html = buildHtmlEmail({
        title: "Nueva postulación - Trabajá con nosotros",
        intro: "Se recibió una nueva postulación laboral desde UNITE.",
        fields,
        footer: `Destino seleccionado por localidad: ${locality} -> ${to}`,
      });

      const text = buildTextEmail({
        title: "Nueva postulación laboral",
        intro: "Se recibió una nueva postulación laboral desde UNITE.",
        fields: [
          { label: "Tipo", value: "Trabajá con nosotros" },
          { label: "Nombre", value: `${firstName} ${lastName}`.trim() },
          { label: "Localidad", value: locality },
          { label: "Email", value: email },
          { label: "Teléfono", value: phoneNumber },
          { label: "Motivación", value: motivation },
          { label: "Acepta políticas", value: agree ? "Sí" : "No" },
        ],
        footer: `Destino seleccionado por localidad: ${locality} -> ${to}`,
      });

      const mailAttachments = [
        {
          filename: cv.filename,
          content: Buffer.from(cv.content, "base64"),
          contentType: cv.contentType,
        },
        ...attachments.map((file) => ({
          filename: file.filename,
          content: Buffer.from(file.content, "base64"),
          contentType: file.contentType,
        })),
      ];

      await transporter.sendMail({
        from,
        to,
        replyTo,
        subject,
        html,
        text,
        attachments: mailAttachments,
      });

      const applicantConfirmationText = `Estimado/a,

Agradecemos su interés en formar parte de Buenimar y el envío de su currículum vitae.

Confirmamos la correcta recepción de su postulación. Su perfil será incorporado a nuestra base de datos y considerado para futuras oportunidades laborales acordes a nuestras necesidades.

En caso de que su experiencia se ajuste a una búsqueda activa, nos estaremos comunicando oportunamente.

Saluda atentamente,
Equipo de Selección
Buenimar`;

      const applicantConfirmationHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #dc2626; color: white; padding: 14px 16px; border-radius: 8px 8px 0 0; }
            .content { border: 1px solid #fecaca; border-top: 0; background: #fff5f5; padding: 20px; border-radius: 0 0 8px 8px; }
            .message { white-space: pre-line; margin: 0; }
            .brand { margin-top: 16px; font-weight: 700; color: #dc2626; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">Postulación recibida</h2>
            </div>
            <div class="content">
              <p class="message">${escapeHtml(applicantConfirmationText)}</p>
              <p class="brand">Buenimar</p>
            </div>
          </div>
        </body>
        </html>
      `;

      if (email) {
        try {
          await transporter.sendMail({
            from,
            to: email,
            subject: "Postulación recibida - Buenimar",
            html: applicantConfirmationHtml,
            text: applicantConfirmationText,
          });
        } catch (confirmationError) {
          console.error("Error enviando confirmación de postulación:", confirmationError);
        }
      }

      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json(
        { ok: false, error: "Tipo de solicitud no válido" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error en API de apertura de cuenta:", error);

    let errorMsg = "Error al procesar la solicitud";

    if (error?.code === "ETIMEDOUT" || error?.code === "ESOCKET") {
      errorMsg = "Timeout al conectar con el servidor SMTP. Por favor, contactanos por WhatsApp.";
    } else if (error?.code === "EAUTH") {
      errorMsg = "Error de autenticación SMTP";
    } else if (error?.message) {
      errorMsg = error.message;
    }

    return NextResponse.json(
      { ok: false, error: errorMsg },
      { status: 500 }
    );
  }
}
