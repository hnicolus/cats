/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	env: {
		CAT_API_TOKEN: "",
		BASE_API_ENDPOINT: "https://api.thecatapi.com/v1/",
	},
	images: {
		domains: ["cdn2.thecatapi.com"],
	},
};
