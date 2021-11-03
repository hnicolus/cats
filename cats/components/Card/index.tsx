import React from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import Heart from "@components/Heart";
function index({ cat, onFavorite }: { cat: any; onFavorite: Function }) {
	const handleOnFavourite = () => {
		onFavorite(cat);
	};
	return (
		<div className={styles.card}>
			<Image
				blurDataURL="leopard.png"
				placeholder="blur"
				unoptimized
				src={cat.url}
				layout="fill"
				alt="cat"
			/>
			<div className={styles.caption}>
				<Heart onClick={handleOnFavourite} />
			</div>
		</div>
	);
}

export default index;
