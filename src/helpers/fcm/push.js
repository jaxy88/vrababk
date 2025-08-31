const { getMessaging } = require("firebase-admin/messaging");
const admin = require("./firebase");

const sendPushNotification = async (token, data, notification) => {
  const message = {
    token,
    notification,
    data,
  };

  try {
    const response = await admin.messaging().send(message);
    strapi.log.info("Mensaje enviado con éxito:", response);
  } catch (error) {
    strapi.log.error("Error al enviar el mensaje:", error);
  }
};

const sendPushNotificationMultiple = async (
  tokens,
  data = {},
  notification = {}
) => {
  const message = {
    tokens,
    notification: {
      title: notification.title || "Título por defecto",
      body: notification.body || "Contenido por defecto",
    },
    data,
  };

  try {
    admin
      .messaging()
      .sendEachForMulticast(message)
      .then((response) => {
        strapi.log.log("Notificaciones enviadas:", response.successCount);
        strapi.log.log("Fallidas:", response.failureCount);
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            strapi.log.error(`Error con token ${tokens[idx]}:`, resp.error);
          }
        });
      })
      .catch((err) => {
        strapi.log.error("Error al enviar:", err);
      });
  } catch (err) {
    strapi.log.error("Error general al enviar notificaciones:", err);
  }
};

const flattenDataForFCM = (data) => {
  const result = {};
  for (const key in data) {
    if (typeof data[key] === "object") {
      const nested = flattenDataForFCM(data[key]);
      for (const nestedKey in nested) {
        result[`${key}.${nestedKey}`] = nested[nestedKey];
      }
    } else {
      result[key] = String(data[key]);
    }
  }
  return result;
};

module.exports = {
  sendPushNotification,
  sendPushNotificationMultiple,
  flattenDataForFCM,
};
