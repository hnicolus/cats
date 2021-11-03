import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
	getBreed,
	getCatsByBreed,
	getCategory,
	getCatsByCategory,
	getFavourites,
} from "../services/catsService";
import Layout from "@components/Layout";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import Loader from "@components/Loader";
import Card from "@components/Card";
import useFavourites from "@hooks/useFavourites";
import Banner from "@components/Banner";

const CatSearch: NextPage = (props: any) => {
	const router = useRouter();
	const {
		items: favourites,
		onAdded: addToFavourite,
		onRemoved: removeFromFavourite,
	} = useFavourites();
	const [breedId, setBreedId] = useState("");
	const [breed, setBreed] = useState<any>(null);

	const [categoryId, setCategoryId] = useState<string>("");
	const [category, setCategory] = useState<any>(null);

	const [cats, setCats] = useState<any[]>([]);
	const [maxScroll, setMaxScroll] = useState(0);
	const [page, setPage] = useState(0);

	const handleOnFavouriteClicked = (cat: any) => {
		(async () => {
			const items = await getFavourites();
			const alreadyFavourite = items.find((x) => x.id === cat.id);
			if (alreadyFavourite) {
				toast.error("Cat already Added to favourites");
				//removeFromFavourite(cat.id);
			} else {
				addToFavourite(cat);
				toast.success("Cat Added to favourites");
			}
		})();
	};

	useEffect(() => {
		(async () => {
			const params = router.query;
			if (Object.keys(params).length === 0) return;
			if (params.breed) {
				//@ts-ignore
				const { breed: breedId }: { breedId: String } = params;
				setBreedId(breedId);
				updateMaxScroll();
			} else if (params.category) {
				const { category: categoryId }: any = params;
				setCategoryId(categoryId);
				updateMaxScroll();
			}
		})();
	}, [router.query]);

	const updateMaxScroll = () => {
		setMaxScroll(
			Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			)
		);
		setPage(page + 1);
	};
	useScrollPosition(
		({ currPos }) => {
			const currentPostion = currPos.y * -1;
			if (currentPostion + 1000 > maxScroll) {
				(async () => {
					if (breed !== null && categoryId === "") {
						await getCatsByBreed(breedId, page)
							.then((res) => {
								setCats([...cats, ...res]);
							})
							.catch((err) => toast.error("Failed to load Cats."));
					} else if (categoryId !== "") {
						await getCatsByCategory(categoryId, page)
							.then((res) => {
								setCats([...cats, ...res]);
							})
							.catch(() => toast.error("Failed to load Cats."));
					}
					updateMaxScroll();
				})();
			}
		},
		[maxScroll]
	);

	useEffect(() => {
		(async () => {
			if (breedId) {
				const breedResult = await getBreed(breedId);
				setBreed(breedResult);
				await getCatsByBreed(breedId, page)
					.then((res) => {
						setCats([...cats, ...res]);
						updateMaxScroll();
						setPage(page + 1);
					})
					.catch((err) => toast.error("Failed to load Cats."));
			} else if (categoryId !== "") {
				const categoryResult = await getCategory(categoryId);
				setCategory(categoryResult);
				await getCatsByCategory(categoryId, page)
					.then((res) => {
						setCats([...cats, ...res]);
						updateMaxScroll();
						setPage(page + 1);
					})
					.catch(() => toast.error("Failed to load Cats."));
			}
		})();
	}, [breedId, categoryId]);

	const title = breed ? breed.name : category ? category.name : "";
	return (
		<Layout title={title}>
			{cats.length > 0 ? (
				<>
					{breedId && (
						<Banner>
							<h1>{breed.name}</h1>
							<p>{breed.description}</p>
						</Banner>
					)}

					{categoryId && (
						<Banner>
							<h1>{category.name}</h1>
						</Banner>
					)}
					<div className="container">
						{cats.map((cat: any, i: number) => (
							<Card key={i} cat={cat} onFavorite={handleOnFavouriteClicked} />
						))}
					</div>
				</>
			) : (
				<Loader label={"Loading Cats"} />
			)}
		</Layout>
	);
};

export default CatSearch;
