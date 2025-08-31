module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/local/register",
      handler: "auth.register",
      config: {
        prefix: "",
        auth: false,
      },
    },
  ],
};
