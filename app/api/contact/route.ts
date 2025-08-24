import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      origen,
      destino,
      tipoMoto,
      cantidad,
      fecha,
      fechaFin,
      seguro,
      recoleccion,
      nombre,
      telefono,
      email,
      comentarios,
    } = body;

    // Validate required fields
    if (!origen || !destino || !tipoMoto || !nombre || !telefono || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format the email content
    const emailContent = `
Nueva solicitud de cotización de transporte de motocicletas:

Datos del viaje:
- Origen: ${origen}
- Destino: ${destino}
- Tipo de moto: ${tipoMoto}
- Cantidad: ${cantidad}
- Fecha de inicio: ${fecha || "No especificada"}
- Fecha de fin: ${fechaFin || "No especificada"}

Servicios adicionales:
- Seguro premium: ${seguro ? "Sí" : "No"}
- Servicio de recolección: ${recoleccion ? "Sí" : "No"}

Datos del cliente:
- Nombre: ${nombre}
- Teléfono: ${telefono}
- Email: ${email}

Comentarios adicionales:
${comentarios || "Ninguno"}

---
Este mensaje fue enviado desde el formulario de contacto del sitio web.
    `.trim();

    // Format HTML email content
    const htmlContent = `
      <h2>Nueva solicitud de cotización de transporte de motocicletas</h2>
      
      <h3>Datos del viaje:</h3>
      <ul>
        <li><strong>Origen:</strong> ${origen}</li>
        <li><strong>Destino:</strong> ${destino}</li>
        <li><strong>Tipo de moto:</strong> ${tipoMoto}</li>
        <li><strong>Cantidad:</strong> ${cantidad}</li>
        <li><strong>Fecha de inicio:</strong> ${fecha || "No especificada"}</li>
        <li><strong>Fecha de fin:</strong> ${fechaFin || "No especificada"}</li>
      </ul>
      
      <h3>Servicios adicionales:</h3>
      <ul>
        <li><strong>Seguro premium:</strong> ${seguro ? "Sí" : "No"}</li>
        <li><strong>Servicio de recolección:</strong> ${
          recoleccion ? "Sí" : "No"
        }</li>
      </ul>
      
      <h3>Datos del cliente:</h3>
      <ul>
        <li><strong>Nombre:</strong> ${nombre}</li>
        <li><strong>Teléfono:</strong> ${telefono}</li>
        <li><strong>Email:</strong> ${email}</li>
      </ul>
      
      <h3>Comentarios adicionales:</h3>
      <p>${comentarios || "Ninguno"}</p>
      
      <hr>
      <p><em>Este mensaje fue enviado desde el formulario de contacto del sitio web.</em></p>
    `;

    // Try to send email if Resend API key is configured
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "MotoTransfer <onboarding@resend.dev>", // You'll need to verify your domain
          to: ["heinken.sebastian@gmail.com"],
          subject: "Nueva solicitud de cotización - Transporte de motocicletas",
          text: emailContent,
          html: htmlContent,
        });

        console.log("Email sent successfully to heinken.sebastian@gmail.com");
      } catch (emailError) {
        console.error("Failed to send email:", emailError);

        // Still log the content for manual follow-up
        console.log("Email content that failed to send:");
        console.log(emailContent);

        // Don't fail the request, just log the email content
        // The user will still see success, but you can manually follow up
      }
    } else {
      // No API key configured, just log the content
      console.log("No RESEND_API_KEY configured. Email content:");
      console.log(emailContent);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
