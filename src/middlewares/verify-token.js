"use strict";

const { verifyTokenJWT } = require("../helpers/token/jwt-token");

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const path = ctx.request.path;

    if (!path.startsWith("/api/")) {
      return await next();
    }

    const publicPaths = [
      "/api/utilidad/validate/login",
      "/api/utilidad/validate/refreshTokenIfExpired",
    ];

    if (publicPaths.includes(path)) {
      return await next();
    }

    const auth = ctx.request.header.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return ctx.unauthorized("Token faltante o malformado");
    }

    const token = auth.split(" ")[1];
    const payload = verifyTokenJWT(token);

    if (!payload) {
      return ctx.unauthorized("Token expirado");
    }

    // @ts-ignore
    const { usuario } = payload || {};

    let user;

    const modelUser = "plugin::users-permissions.user";
    const textConductor = "conductor";
    const textCliente = "cliente";
    const collectionMap = new Map([
      ["Admin", modelUser],
      ["Contador", modelUser],
      ["Embarcador", modelUser],
      ["Transporte", modelUser],
      ["Planillador", modelUser],
      ["Recepcionista", modelUser],
      ["Tarjadora", modelUser],
      ["Director Maritimo", modelUser],
      ["Vigia", modelUser],
      [textCliente, "api::cliente.cliente"],
      [textConductor, "api::conductor.conductor"],
      ["user-tarja", "api::tarjadora.tarjadora"],
    ]);

    if (usuario.esconductor || usuario.espropietario || usuario.estenedor) {
      usuario.type = textConductor;
    }

    if (usuario.documentonit) {
      usuario.type = textCliente;
    }

    const collectionUID = collectionMap.get(usuario.type);

    if (collectionUID) {
      user = await strapi.entityService.findOne(collectionUID, usuario.id);
    }

    if (!user) {
      return ctx.unauthorized("Usuario no encontrado");
    }

    delete user.email;
    delete user.contrasena;
    delete user.password;
    delete user.pwd;
    delete user.provider;
    delete user.resetPasswordToken;
    delete user.confirmationToken;
    delete user.confirmed;
    delete user.blocked;
    delete user.tokenFCM;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.documentonit;
    delete user.razonsocial;
    delete user.tipopersona;

    ctx.state.user = user;

    await next();
  };
};
