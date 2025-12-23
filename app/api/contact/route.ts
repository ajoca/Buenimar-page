import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  country?: string;
  phoneNumber?: string;
  message?: string;
  agree?: boolean;
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
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `Contacto Web: ${firstName} ${lastName}`.trim();

    const html = `
      <h2>Nuevo contacto desde la web</h2>
      <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
      <p><strong>Empresa:</strong> ${company}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>País:</strong> ${country}</p>
      <p><strong>Teléfono:</strong> ${phoneNumber}</p>
      <p><strong>Acepta políticas:</strong> ${agree ? "Sí" : "No"}</p>
      <hr />
      <p><strong>Mensaje:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `;

    const text = `Nuevo contacto desde la web\n\nNombre: ${firstName} ${lastName}\nEmpresa: ${company}\nEmail: ${email}\nPaís: ${country}\nTeléfono: ${phoneNumber}\nAcepta políticas: ${agree ? "Sí" : "No"}\n\nMensaje:\n${message}`;

    await transporter.sendMail({ from, to, subject, html, text });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Error inesperado" },
      { status: 500 }
    );
  }
}
