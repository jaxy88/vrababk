const axios = require("axios");

const getLongLivedToken = async () => {
  const url = process.env.FB_URL;

  try {
    const response = await axios.get(url, {
      params: {
        grant_type: "fb_exchange_token",
        client_id: process.env.FB_APP_ID || "697318813191667",
        client_secret:
          process.env.FB_APP_SECRET || "a4abf3fa9d0cb572f6b08343fe555ebc",
        fb_exchange_token: process.env.WHATSAPP_TOKEN,
      },
    });
    const longLivedToken = response.data.access_token;
    strapi.log.info("🔐 Token de larga duración:", longLivedToken);
    return longLivedToken;
  } catch (error) {
    strapi.log.error(
      "❌ Error al obtener el token:",
      error.response?.data || error.message
    );
  }
};

module.exports = {
  getLongLivedToken,
};
