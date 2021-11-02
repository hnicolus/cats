import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useWindowPosition from "@hooks/useWindowPosition";
import styles from "@styles/CatSearch.module.css";
import {
	getAllBreeds,
	getBreed,
	getBreedCats as getByBreed,
	getCategory,
	getCatsByCategory,
	loadAllImages,
} from "../services/catsService";
import Layout from "@components/Layout";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import Loader from "@components/Loader";

function CatSearch(props: any) {
	const router = useRouter();
	const [breedId, setBreedId] = useState("");
	const [breed, setBreed] = useState<any>(null);

	const [categoryId, setCategoryId] = useState<string>("");
	const [category, setCategory] = useState<any>(null);

	const [cats, setCats] = useState<any[]>([]);
	const [maxScroll, setMaxScroll] = useState(0);
	const [page, setPage] = useState(0);

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
						await getByBreed(breedId, page)
							.then((res) => {
								setCats([...cats, ...res]);
							})
							.catch((err) => console.log(err));
					} else if (categoryId !== "") {
						await getCatsByCategory(categoryId, page)
							.then((res) => {
								setCats([...cats, ...res]);
							})
							.catch(() => alert("Failed to load cats"));
					}
					updateMaxScroll();
				})();
			}
		},
		[maxScroll]
	);
	//Listen to
	useEffect(() => {
		(async () => {
			if (breedId) {
				const breedResult = await getBreed(breedId);
				setBreed(breedResult);
				await getByBreed(breedId, page)
					.then((res) => {
						setCats([...cats, ...res]);
						updateMaxScroll();
						setPage(page + 1);
					})
					.catch((err) => console.log(err));
			} else if (categoryId !== "") {
				const categoryResult = await getCategory(categoryId);
				setCategory(categoryResult);
				await getCatsByCategory(categoryId, page)
					.then((res) => {
						setCats([...cats, ...res]);
						updateMaxScroll();
						setPage(page + 1);
					})
					.catch(() => alert("Failed to load cats"));
			}
		})();
	}, [breedId, categoryId]);
	return (
		<Layout title={breedId}>
			{cats.length > 0 ? (
				<>
					{breedId && (
						<div className={styles.banner}>
							<h1>{breed.name}</h1>
							<p>{breed.description}</p>
						</div>
					)}

					{categoryId && (
						<div className={styles.banner}>
							<h1>{category.name}</h1>
						</div>
					)}
					<div className={styles.container}>
						{cats.map((cat: any, i: number) => (
							<div key={i} className={styles.card}>
								<Image
									blurDataURL="leopard.png"
									placeholder="blur"
									unoptimized
									src={cat.url}
									layout="fill"
									alt={breedId}
								/>
							</div>
						))}
					</div>
				</>
			) : (
				<Loader label={"Loading Cats"} />
			)}
		</Layout>
	);
}

export default CatSearch;
