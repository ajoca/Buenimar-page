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
      const secure = process.env.SMTP_SECURE === "true";
      const user = process.env.SMTP_USER ?? "";
      const pass = process.env.SMTP_PASS ?? "";

      if (!host || !user || !pass) {
        return NextResponse.json(
          { ok: false, error: "Configuración de servidor no disponible" },
          { status: 500 }
        );
      }

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });

      // Email content for Buenimar
      const htmlContent = `
        <h2>Nueva Solicitud de Apertura de Cuenta - CLIENTE</h2>
        <p><strong>Comercio/Negocio:</strong> ${commerce}</p>
        <p><strong>Dirección:</strong> ${address}</p>
        <p><strong>Rubro/Categoría:</strong> ${category || "No especificado"}</p>
        <p><strong>Volumen Estimado:</strong> ${volume || "No especificado"}</p>
        <p><strong>Contacto:</strong> ${contactName || "No especificado"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phoneNumber || "No especificado"}</p>
        <p><strong>Acepta políticas:</strong> ${agree ? "Sí" : "No"}</p>
      `;

      // Send email to Buenimar
      await transporter.sendMail({
        from: user,
        to: process.env.CONTACT_EMAIL ?? "pedidos@buenimar.com",
        subject: `Nueva Solicitud de Apertura de Cuenta - ${commerce}`,
        html: htmlContent,
      });

      // Send confirmation email to customer
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
        await transporter.sendMail({
          from: user,
          to: email,
          subject: "Solicitud de Apertura de Cuenta Recibida",
          html: confirmationEmail,
        });
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
      const secure = process.env.SMTP_SECURE === "true";
      const user = process.env.SMTP_USER ?? "";
      const pass = process.env.SMTP_PASS ?? "";

      if (!host || !user || !pass) {
        return NextResponse.json(
          { ok: false, error: "Configuración de servidor no disponible" },
          { status: 500 }
        );
      }

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });

      // Email content for Buenimar
      const htmlContent = `
        <h2>Nueva Solicitud de Registro de Proveedor</h2>
        <p><strong>Empresa/Marca:</strong> ${companyName}</p>
        <p><strong>Tipo de Producto:</strong> ${productType}</p>
        <p><strong>Descripción del Producto:</strong> ${productDescription || "No especificado"}</p>
        <p><strong>Volumen de Producción:</strong> ${productVolume || "No especificado"}</p>
        <p><strong>Contacto:</strong> ${contactName || "No especificado"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phoneNumber || "No especificado"}</p>
        <p><strong>Acepta políticas:</strong> ${agree ? "Sí" : "No"}</p>
      `;

      // Send email to Buenimar
      await transporter.sendMail({
        from: user,
        to: process.env.CONTACT_EMAIL ?? "pedidos@buenimar.com",
        subject: `Nueva Solicitud de Proveedor - ${companyName}`,
        html: htmlContent,
      });

      // Send confirmation email to provider
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
        await transporter.sendMail({
          from: user,
          to: email,
          subject: "Solicitud de Registro de Proveedor Recibida",
          html: confirmationEmail,
        });
      }

      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json(
        { ok: false, error: "Tipo de solicitud no válido" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error en API de apertura de cuenta:", error);
    return NextResponse.json(
      { ok: false, error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
