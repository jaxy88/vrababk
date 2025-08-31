"use strict";

const _ = require("lodash");
// @ts-ignore
const { getService } = require("@strapi/plugin-users-permissions/server/utils");
const { sendEmailSendGrid } = require("../../../helpers/sendgrid/sendemail");

module.exports = {
  async register(ctx) {
    const pluginStore = await strapi.store({
      type: "plugin",
      name: "users-permissions",
    });
    const settings = await pluginStore.get({ key: "advanced" });

    const { username, email, password, company, website } = ctx.request.body;

    if (!email) {
      return ctx.badRequest("email is required");
    }

    if (!password) {
      return ctx.badRequest("password is required");
    }

    // comprobar si ya existe el email
    const existingUser = await strapi
      .query("plugin::users-permissions.user")
      .findOne({
        where: { email: email.toLowerCase() },
      });

    if (existingUser) {
      return ctx.badRequest("Email is already taken");
    }

    // crear usuario
    const user = await getService("user").add({
      username: username || email, // por si no manda username
      email: email.toLowerCase(),
      password,
      provider: "local",
      confirmed: !settings.email_confirmation,
      company,
      website,
    });

    const sanitizedUser = await getService("user").sanitizeUser(user);
    const jwt = getService("jwt").issue({ id: user.id });

    return ctx.send({
      jwt,
      user: sanitizedUser,
    });
  },
};
