"use strict";

const utils = require("@strapi/utils");
const { sendSMS } = require("../../../helpers/twilio/sms");
const { generateOtp } = require("../../../helpers/otp/otp");
const { ApplicationError } = utils.errors;
/**
 * util controller
 */

// @ts-ignore
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::util.util", ({ strapi }) => ({
  async forgotPassword(ctx) {
    const { phone } = ctx.request.body;

    if (!phone) {
      return ctx.badRequest("El número de celular es requerido");
    }

    const otp = await generateOtp(6);
    const clearPhone = phone.trim();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await sendSMS(
      `Utiliza este código ${otp} para recuperar tu contraseña`,
      process.env.TWILIO_NUMBER,
      clearPhone
    );

    await strapi.entityService.create("api::otp.otp", {
      data: {
        code: otp,
        expiresAt,
      },
    });

    return ctx.send({
      ok: true,
      message: "Se ha enviado un código por mensaje de texto.",
    });
  },
  async verifyOTP(ctx) {
    const { code } = ctx.request.body;

    if (!code) {
      return ctx.badRequest("El código es requerido");
    }

    const otp = await strapi.db.query("api::otp.otp").findOne({
      where: { code },
    });

    if (!otp) {
      return ctx.badRequest("El código no es válido");
    }

    if (new Date() > new Date(otp.expiresAt)) {
      return ctx.badRequest(
        "El código ingresado no es válido o ya venció. Solicita uno nuevo"
      );
    }

    return ctx.send({
      ok: true,
      message: "Código válido satisfactoriamente",
    });
  },
  async resetPassword(ctx) {
    try {
      const { email, newPassword, confirmPassword } = ctx.request.body;

      if (!email || !newPassword || !confirmPassword) {
        return ctx.badRequest("Todos los campos son requeridos");
      }

      if (newPassword !== confirmPassword) {
        return ctx.badRequest("Las contraseñas no coinciden");
      }

      const existingUser = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { email: email.toLowerCase() },
        });

      if (!existingUser) {
        return ctx.badRequest("El email no está registrado en nuestro sistema");
      }

      await strapi.entityService.update(
        "plugin::users-permissions.user",
        existingUser.id,
        {
          data: {
            password: newPassword,
          },
        }
      );

      return ctx.send({
        ok: true,
        message: "Contraseña actualizada satisfactoriamente",
      });
    } catch (error) {
      strapi.log.error(error);
      return ctx.internalServerError(
        "Ocurrió un error al restablecer la contraseña"
      );
    }
  },
}));
