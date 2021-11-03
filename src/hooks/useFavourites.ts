import { useContext } from "react";
import FavouriteContext from "context/favouritesContext";
export default function useFavourites() {
	return useContext(FavouriteContext);
}
