/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: "https://enlightflorist.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/admin/**"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
  },
};

module.exports = config;
