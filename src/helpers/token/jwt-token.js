const jwt = require("jsonwebtoken");
const secret = process.env.JWT_TOKEN_SECRET;

/**
 * Crea un token JWT para el usuario autenticado
 * @param {Object} auth - Datos del usuario
 * @returns {string} token
 */
const createTokenJWT = (auth) => {
  const expiresIn = "5h";
  return jwt.sign({ usuario: auth }, secret, { expiresIn });
};

const verifyTokenJWT = (/** @type {string} */ token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

const refreshTokenIfExpired = (tokenNow) => {
  try {
    jwt.verify(tokenNow, secret);

    return {
      token: tokenNow,
      refreshed: false,
      message: "Token aún válido",
    };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const decoded = jwt.decode(tokenNow);

      // @ts-ignore
      if (!decoded || !decoded.usuario) {
        throw new Error("Token inválido");
      }

      // Creamos un nuevo token con los mismos datos
      // @ts-ignore
      const nuevoToken = createTokenJWT(decoded.usuario);

      return {
        token: nuevoToken,
        refreshed: true,
        message: "Token expirado. Se ha generado uno nuevo.",
      };
    } else {
      throw new Error("Token inválido o corrupto");
    }
  }
};

module.exports = { createTokenJWT, verifyTokenJWT, refreshTokenIfExpired };
