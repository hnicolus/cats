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
	getCatsByCategory,
	loadAllImages,
} from "../services/catsService";
import Layout from "@components/Layout";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

function CatSearch(props: any) {
	const router = useRouter();
	const [keyword, setKeyword] = useState("");
	const [breed, setBreed] = useState<any>(null);
	const [cats, setCats] = useState<any[]>([]);
	const [maxScroll, setMaxScroll] = useState(0);
	const [page, setPage] = useState(0);
	const [category, setCategory] = useState<string>("");
	const [canLoad, setCanLoad] = useState(false);
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
	};
	useScrollPosition(
		({ currPos }) => {
			console.log("max scroll", maxScroll);
			const currentPostion = currPos.y * -1;
			console.log("current pos", currentPostion + 1000);
			if (currentPostion + 1000 > maxScroll) {
				(async () => {
					if (breed !== null) {
						await getByBreed(keyword, page)
							.then((res) => {
								const tmpCats = [...cats];
								for (let c = 0; c < res.length; c++) {
									const cat = res[c];
									const index = cats.indexOf(cat);
									if (index === -1) {
										tmpCats.push(cat);
									}
								}
								setCats([...cats, ...res]);
								updateMaxScroll();
								setPage(page + 1);
							})
							.catch((err) => console.log(err));
					} else if (category !== "") {
						await getCatsByCategory(category)
							.then((res) => {
								console.log(res);
								setCats(res);
							})
							.catch(() => alert("Failed to load cats"));
					}
				})();
			} else {
				setCanLoad(false);
			}
		},
		[maxScroll, page, keyword]
	);
	useEffect(() => {
		(async () => {
			const breedResult = await getBreed(keyword);
			setBreed(breedResult);
			await getByBreed(keyword, page)
				.then((res) => {
					const tmpCats = [...cats];
					for (let c = 0; c < res.length; c++) {
						const cat = res[c];
						const index = cats.indexOf(cat);
						if (index === -1) {
							tmpCats.push(cat);
						}
					}
					setCats([...cats, ...res]);
					updateMaxScroll();
					setPage(page + 1);
				})
				.catch((err) => console.log(err));
		})();
	}, [keyword]);

	useEffect(() => {
		(async () => {
			await getCatsByCategory(category)
				.then((res) => {
					console.log(res);
					setCats(res);
				})
				.catch(() => alert("Failed to load cats"));
		})();
	}, [category]);

	useEffect(() => {
		(async () => {
			const params = router.query;
			if (Object.keys(params).length === 0) return;
			if (params.breed) {
				//@ts-ignore
				const { breed: breedId }: { breedId: String } = params;
				setKeyword(breedId);
				updateMaxScroll();
			} else if (params.category) {
				const { category: categoryId }: any = params;
				setCategory(categoryId);
			}
		})();
	}, [keyword, page, router.query]);

	return (
		<Layout title={keyword}>
			{breed == null ? null : (
				<>
					{breed && (
						<div className={styles.banner}>
							<h1>{breed.name}</h1>
							<p>{breed.description}</p>
						</div>
					)}

					{category && breed === null && (
						<div className={styles.banner}>
							<h1>{category}</h1>
						</div>
					)}
					<div className={styles.container}>
						{cats.map((cat: any, i: number) => (
							<div key={i} className={styles.card}>
								<Image unoptimized src={cat.url} layout="fill" alt={keyword} />
								<div className={styles.caption}>
									<h1>{breed.name}</h1>
									<p>{breed.description}</p>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</Layout>
	);
}

export default CatSearch;
