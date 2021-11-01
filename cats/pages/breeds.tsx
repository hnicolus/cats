import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../components/Button";
import { getAllBreeds } from "../services/catsService";

import styles from "@styles/Breeds.module.css";
import Layout from "@components/Layout";
function Breeds() {
	const [breeds, setBreeds] = useState<any[]>([]);
	const router = useRouter();

	const handleOnClick = (breed: any) => {
		console.log("Clicked Breed", breed.id);
		router.push(`/cat-search/?breed=${breed.id}`);
	};
	useEffect(() => {
		getAllBreeds().then((res) => setBreeds(res));
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
						{breeds.map((breed, i) => (
							<div key={i} className="container-item">
								<Button onClick={() => handleOnClick(breed)}>
									{breed.name}
								</Button>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Breeds;
