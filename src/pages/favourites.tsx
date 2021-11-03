import useFavourites from "@hooks/useFavourites";
import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { toast } from "react-toastify";
import Loader from "@components/Loader";
import CustomButton from "@components/Button";
import { useRouter } from "next/router";
import styles from "@styles/favourites.module.css";
import Card from "@components/Card";
import Banner from "@components/Banner";
import { getFavourites, removeFromFavourites } from "@services/catsService";
function Favourites(props: any) {
	const router = useRouter();
	const [favourites, setFavourites] = useState<any[] | null>(null);

	const handleOnFavouriteClicked = (cat: any) => {
		(async () => {
			await removeFromFavourites(cat.id);
			const newCats = favourites?.filter((c: any) => c.id !== cat.id);
			if (newCats) {
				setFavourites(newCats);
				toast.success("Cat removed from Favourites");
			}
		})();
	};
	useEffect(() => {
		(async () => {
			const favs = await getFavourites();
			setFavourites(favs);
		})();
	}, []);

	return (
		<Layout title="Favourites">
			{favourites === null && <Loader label={"Loading Breeds"} />}
			{favourites?.length === 0 && (
				<div className={styles.wrapper}>
					<div className={styles.message}>
						<h1>Meeoops !! </h1>
						<p>You have no favourite cats yet.</p>
					</div>
					<Loader />
					<div className={styles.action}>
						<CustomButton
							style={{
								width: "150px",
								height: "60px",
								border: "none",
								boxShadow: "none",
							}}
							onClick={() => router.push("/")}
						>
							Go Home
						</CustomButton>
					</div>
				</div>
			)}
			{favourites && favourites?.length > 0 && (
				<>
					<Banner>
						<h1>Favourites</h1>
						<p>Your Favourite Cats</p>
					</Banner>
					<div className="container">
						{favourites.map((cat: any, i: number) => (
							<Card key={i} cat={cat} onFavorite={handleOnFavouriteClicked} />
						))}
					</div>
				</>
			)}
		</Layout>
	);
}

export default Favourites;
