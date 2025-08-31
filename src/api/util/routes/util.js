module.exports = {
  routes: [
    {
      method: "POST",
      path: "/util/forgotpassword",
      handler: "util.forgotPassword",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/util/verifyotp",
      handler: "util.verifyOTP",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/util/resetPassword",
      handler: "util.resetPassword",
      config: {
        auth: false,
      },
    },
  ],
};
