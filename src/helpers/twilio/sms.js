"use strict";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const sendSMS = async (body, from, to) => {
  try {
    const message = await client.messages.create({
      body,
      from,
      to,
    });

    console.log("SMS enviado:", message.sid);
    return message;
  } catch (error) {
    console.error("Error enviando SMS:", error.message);
    throw error;
  }
};

module.exports = {
  sendSMS,
};
