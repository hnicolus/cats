import { getFavourites } from "@services/catsService";
import React from "react";

export interface IFavouriteContext {
	items: any[];
	onAdded: Function;
	onRemoved: Function;
}

const FavouriteContext = React.createContext<IFavouriteContext>({
	items: [],
	onAdded: () => {},
	onRemoved: () => {},
});

FavouriteContext.displayName = "FavouriteContext";
export default FavouriteContext;
