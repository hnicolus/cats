import axios from "axios";
import { toast } from "react-toastify";

const BASE_ENDPOINT = process.env.BASE_API_ENDPOINT;
const CAT_API_TOKEN = process.env.CAT_API_TOKEN;
// Set config defaults
const http = axios.create({
	baseURL: BASE_ENDPOINT,
});

http.interceptors.request.use(
	(config: any) => {
		config.headers["x-api-key"] = CAT_API_TOKEN;
		return config;
	},
	(error) => Promise.reject(error)
);

http.interceptors.response.use(undefined, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;
	if (!expectedError) {
		toast.error("Unexpected internal Error ");
		console.log("Unepected Eror", error.message);
	}

	return Promise.reject(error);
});
export { http };
