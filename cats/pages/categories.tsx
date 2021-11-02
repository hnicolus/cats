import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../components/Button";
import { getAllCategories } from "../services/catsService";

import styles from "@styles/categories.module.css";
import Layout from "@components/Layout";
import Loader from "@components/Loader";

const Categories: NextPage = () => {
	const [categories, setCategories] = useState<any[]>([]);
	const router = useRouter();

	const handleOnClick = (category: any) => {
		console.log("Clicked Breed", category.id);
		router.push(`/cat-search/?category=${category.id}`);
	};
	useEffect(() => {
		getAllCategories().then((res) => setCategories(res));
	}, []);
	return (
		<Layout title="Breeds">
			{categories.length > 0 ? (
				<div className={styles.parent}>
					<div className={styles.banner}>
						<Image src="/leopard.png" width={150} height={200} alt="Cat" />
						<h1>Choose a Catgory </h1>
					</div>
					<div className={styles.breeds}>
						<div className={styles.breedList}>
							{categories.map((category, i) => (
								<Button key={i} onClick={() => handleOnClick(category)}>
									{category.name}
								</Button>
							))}
						</div>
					</div>
				</div>
			) : (
				<Loader label={"Loading Breeds"} />
			)}
		</Layout>
	);
};

export default Categories;
