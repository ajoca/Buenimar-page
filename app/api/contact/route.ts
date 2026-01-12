import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Límite de 5MB para archivos adjuntos
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB en bytes

type Payload = {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  country?: string;
  phoneNumber?: string;
  message?: string;
  agree?: boolean;
  attachments?: Array<{
    filename: string;
    content: string; // base64
    contentType: string;
  }>;
};

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as Payload;

    const {
      firstName = "",
      lastName = "",
      company = "",
      email = "",
      country = "",
      phoneNumber = "",
      message = "",
      agree = false,
      attachments = [],
    } = data || {};

    if (!firstName && !lastName && !email && !message) {
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
        { ok: false, error: "SMTP no configurado en variables de entorno" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true para puerto 465 (SSL), false para 587 (TLS)
      auth: { user, pass },
      connectionTimeout: 15000, // 15 segundos para SSL
      greetingTimeout: 10000,
      socketTimeout: 15000,
      tls: {
        // No rechazar certificados no autorizados (algunos servidores lo necesitan)
        rejectUnauthorized: false,
      },
    });

    const subject = `Contacto Web: ${firstName} ${lastName}`.trim();
    
    // Reply-To: el email del cliente para poder responder directamente
    const replyTo = email || undefined;

    const html = `
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
          .attachments { background-color: #f0f9ff; padding: 10px; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">Nuevo contacto desde www.buenimarcolonia.com</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Nombre:</span>
              <span class="value">${firstName} ${lastName}</span>
            </div>
            ${company ? `<div class="field">
              <span class="label">Empresa:</span>
              <span class="value">${company}</span>
            </div>` : ''}
            <div class="email-highlight">
              <span class="label">Email:</span>
              <span class="value"><a href="mailto:${email}">${email}</a></span>
            </div>
            ${phoneNumber ? `<div class="field">
              <span class="label">Teléfono:</span>
              <span class="value">${phoneNumber}</span>
            </div>` : ''}
            ${country ? `<div class="field">
              <span class="label">País:</span>
              <span class="value">${country}</span>
            </div>` : ''}
            ${attachments.length > 0 ? `<div class="attachments">
              <span class="label">Archivos adjuntos:</span> ${attachments.length} archivo(s)
            </div>` : ''}
            <div class="message-box">
              <div class="label" style="margin-bottom: 10px;">Mensaje:</div>
              <div style="white-space: pre-wrap; color: #1f2937;">${message}</div>
            </div>
            <div style="margin-top: 20px; padding: 10px; background-color: #ecfdf5; border-radius: 5px; font-size: 12px; color: #059669;">
              Puedes responder directamente a este correo para contactar al cliente
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `Nuevo contacto desde www.buenimarcolonia.com

Nombre: ${firstName} ${lastName}
${company ? `Empresa: ${company}\n` : ''}Email: ${email}
${phoneNumber ? `Teléfono: ${phoneNumber}\n` : ''}${country ? `País: ${country}\n` : ''}${attachments.length > 0 ? `Archivos adjuntos: ${attachments.length} archivo(s)\n` : ''}
Mensaje:
${message}

---
Puedes responder directamente a este correo para contactar al cliente.`;

    // Convertir attachments de base64 a Buffer para nodemailer
    const mailAttachments = attachments.map(att => ({
      filename: att.filename,
      content: Buffer.from(att.content, 'base64'),
      contentType: att.contentType,
    }));

    await transporter.sendMail({ 
      from, 
      to, 
      replyTo,
      subject, 
      html, 
      text,
      attachments: mailAttachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Error enviando email:", err);
    
    // Mensajes más específicos según el tipo de error
    let errorMsg = "Error al enviar el mensaje";
    
    if (err?.code === "ETIMEDOUT" || err?.code === "ESOCKET") {
      errorMsg = "Timeout al conectar con el servidor SMTP. Por favor, contactanos por WhatsApp.";
    } else if (err?.code === "EAUTH") {
      errorMsg = "Error de autenticación SMTP";
    } else if (err?.message) {
      errorMsg = err.message;
    }
    
    return NextResponse.json(
      { ok: false, error: errorMsg },
      { status: 500 }
    );
  }
}
