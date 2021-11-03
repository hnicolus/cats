import { http } from "./httpService";
import axios from "axios";
const url = "breeds";
export async function getAllBreeds() {
	try {
		const { data } = await http.get(url);
		return data;
	} catch (error) {
		throw new Error("Failed to load Breeds");
	}
}

export async function getCatsByBreed(breedId: string, page = 0, maxCount = 10) {
	try {
		if (breedId.length > 0) {
			const { data } = await http.get(
				`images/search?limit=10&order=Rand&page=${page}&breed_id=${breedId}`
			);
			return data;
		}
		return [];
	} catch (error) {
		throw new Error("Failed to load Breeds");
	}
}
export async function getCatsByCategory(
	category: string,
	page = 0,
	maxCount = 10
) {
	try {
		if (category.length > 0) {
			const { data } = await http.get(
				`images/search?limit=${maxCount}&order=Rand&page=${page}&category_ids=${category}`
			);
			return data;
		}
		return [];
	} catch (error) {
		throw new Error("Failed to load Breeds");
	}
}

export async function getBreed(breedId: string) {
	try {
		const breeds = await getAllBreeds();
		return breeds.find((x: any) => x.id === breedId);
	} catch (error) {
		throw new Error("Failed to load Breeds");
	}
}

export async function loadAllImages() {
	try {
		const { data } = await http.get("/images/search");
		return data;
	} catch (error) {
		throw new Error("Failed to load Breeds");
	}
}

export async function getAllCategories() {
	try {
		const { data } = await http.get("categories");
		return data;
	} catch (error) {
		throw new Error("Failed to load Breeds");
	}
}

export async function getCategory(categoryId: string) {
	try {
		const categories = await getAllCategories();
		return categories.find((x: any) => x.id === Number(categoryId));
	} catch (error) {
		throw new Error("Failed to load Breeds");
	}
}

const FAVOURITES_KEY = "favourites";

export async function addToFavourites(cat: any): Promise<void> {
	const json = localStorage.getItem(FAVOURITES_KEY);
	if (json) {
		const favourites = JSON.parse(json);
		favourites.items = [...favourites.items, cat];
		localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
	} else {
		const favourites = {
			items: [cat],
		};
		localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
	}
}

export async function removeFromFavourites(catId: string): Promise<void> {
	const json = localStorage.getItem(FAVOURITES_KEY);
	if (json === null) return;
	const favourites = JSON.parse(json);
	favourites.items = favourites.items.filter((cat: any) => cat.id !== catId);
	localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
}
export async function getFavourites(): Promise<any[]> {
	const json = localStorage.getItem(FAVOURITES_KEY);
	if (!json) return [];
	const favourites = JSON.parse(json);
	return favourites.items;
}
