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

type Payload = ClientePayload | ProveedorPayload;

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
