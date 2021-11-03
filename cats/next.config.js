/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	env: {
		CAT_API_TOKEN: "",
		BASE_API_ENDPOINT: "",
	},
	images: {
		domains: ["cdn2.thecatapi.com"],
	},
};
