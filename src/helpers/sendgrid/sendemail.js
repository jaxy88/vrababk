"use strict";

const sgMail = require("@sendgrid/mail");
const axios = require("axios");
const { getTemplete } = require("./templatemailrecovery");

// Configura tu API Key desde variable de entorno
sgMail.setApiKey(process.env.API_KEY_SENDGRID);

/**
 * Envía un correo electrónico usando SendGrid
 * @param {Object} options - Opciones del correo
 * @param {string} options.to - Correo del destinatario
 * @param {string} options.subject - Asunto del correo
 * @param {string} options.text - Texto plano del mensaje
 * @param {string} options.html - HTML del mensaje
 */
const sendEmailSendGrid = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL_CONFIG || "code46450@gmail.com",
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    strapi.log.info("📨 Correo enviado correctamente a:", to);
  } catch (error) {
    strapi.log.error(
      "❌ Error al enviar el correo:",
      error?.response?.body || error.message
    );
    throw error;
  }
};

const sendEmailWithAttachmentFromUrl = async ({
  to,
  subject,
  text,
  mensaje,
  url,
}) => {
  const fileUrl = `http://207.180.207.211:1337${url}`;
  const response = await axios.get(fileUrl, {
    responseType: "arraybuffer", // Para obtener el archivo como binario
  });

  const base64File = Buffer.from(response.data).toString("base64");

  const msg = {
    to,
    from: "jaxyrenteria@gmail.com",
    subject,
    html: getTemplete(mensaje),
    text,
    attachments: [
      {
        content: base64File,
        filename: "archivo.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  await sgMail.send(msg);
  console.log("Correo enviado con archivo adjunto desde URL.");
};

module.exports = {
  sendEmailSendGrid,
  sendEmailWithAttachmentFromUrl,
};
