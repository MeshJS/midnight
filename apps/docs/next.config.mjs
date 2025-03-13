import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

export default withNextra({
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/en",
      statusCode: 302,
    },
  ],
  images: {
    unoptimized: true,
  },
  output: "export",
});
