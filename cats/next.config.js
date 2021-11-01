/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	env: {
		CAT_API_TOKEN: "be9c843d-cc4e-4f83-bf2d-d31470db3f1c",
		BASE_API_ENDPOINT: "https://api.thecatapi.com/v1/",
	},
	images: {
		domains: ["cdn2.thecatapi.com"],
	},
};
