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

export async function getBreedCats(breedId: string, page = 0, maxCount = 10) {
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
		const breed = breeds.find((x: any) => x.id === breedId);
		return breed;
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
