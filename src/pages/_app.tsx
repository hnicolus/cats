import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import NProgress from "nprogress";
import Router from "next/router";
import FavouriteContext, { IFavouriteContext } from "context/favouritesContext";
import {
	addToFavourites,
	getFavourites,
	removeFromFavourites,
} from "@services/catsService";

import { ToastContainer } from "react-toastify";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
	const [favouriteContext, setFavourite] = useState<IFavouriteContext>({
		items: [],
		onAdded: (cat: any) => {
			(async () => {
				await addToFavourites(cat);
				loadFavourites();
			})();
		},
		onRemoved: (catId: any) => {
			(async () => {
				await removeFromFavourites(catId);
				loadFavourites();
			})();
		},
	});
	const loadFavourites = () => {
		(async () => {
			const tmpFav = { ...favouriteContext };
			tmpFav.items = await getFavourites();
			setFavourite(tmpFav);
		})();
	};
	useEffect(() => {
		loadFavourites();
	}, []);
	return (
		<>
			<FavouriteContext.Provider value={favouriteContext}>
				<Component {...pageProps} />
				<ToastContainer />
			</FavouriteContext.Provider>
		</>
	);
}

export default MyApp;
