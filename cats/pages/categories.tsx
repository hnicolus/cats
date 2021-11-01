import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../components/Button";
import { getAllCategories } from "../services/catsService";

import styles from "@styles/Breeds.module.css";
import Layout from "@components/Layout";
function Categories() {
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
			<div className={styles.parent}>
				<div className={styles.banner}>
					<Image
						src="/StudioFibonacci-Cartoon-leopard.png"
						width={150}
						height={200}
						alt="Cat"
					/>
					<h1>Choose a Breed </h1>
				</div>
				<div className={styles.breeds}>
					<div className={styles.breedList}>
						{categories.map((category, i) => (
							<div key={i} className="container-item">
								<Button onClick={() => handleOnClick(category)}>
									{category.name}
								</Button>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Categories;
