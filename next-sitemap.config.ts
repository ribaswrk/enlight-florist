import { IConfig } from "next-sitemap";

const config: IConfig = {
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

export default config;
