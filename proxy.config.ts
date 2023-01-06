export default {
  proxyUrls: [
    {
      path: "/api",
      url: process.env.API_URL + "/api/",
    },
  ],
};
