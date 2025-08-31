const { Server } = require("socket.io");
const {
  sendPushNotification,
  sendPushNotificationMultiple,
} = require("../fcm/push");

let io;

const socketIds = [];
let clients = {};

const initializeSocket = (
  /** @type {number | (import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse> | import("https").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse> | import("http2").Http2SecureServer | import("http2").Http2Server)} */ server
) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    strapi.log.info(`User connected: ${socket.id}`);

    socket.on("register", (userId) => {
      clients[userId] = userId;
      strapi.log.info(
        `Usuario con ID ${userId} registrado con socket ID ${socket.id}`
      );
    });

    socket.on("disconnect", () => {
      strapi.log.info("User disconnected");
      for (const userId in clients) {
        if (clients[userId] === socket.id) {
          delete clients[userId];
          break;
        }
      }
    });

    socket.on("notification", async (info) => {
      strapi.log.info("*****");
      strapi.log.info(info);
      strapi.log.info("*****");
    });
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIo,
};
