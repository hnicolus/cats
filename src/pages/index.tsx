import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NextPage } from "next";

import Layout from "@components/Layout";
import styles from "../styles/Home.module.css";

type MenuItem = {
	name: string;
	url: string;
};
const Home: NextPage = () => {
	const menuItems: MenuItem[] = [
		{
			name: "Breeds",
			url: "/breeds",
		},
		{
			name: "Categories",
			url: "/categories",
		},
	];
	return (
		<Layout title="Cats Land">
			<div className={styles.container}>
				<Head>
					<meta name="description" content="Cars Cats App Challenge" />
				</Head>

				<main className={styles.main}>
					<Image
						className={styles.image}
						src="/paw.svg"
						alt="Cat land"
						height={200}
						width={200}
					/>
					<h1 className={styles.title}>
						Welcome to <span>Cat Land</span>
					</h1>

					<p className={styles.description}>Start Searching for Cats</p>
					<div className={styles.searchOptions}>
						{menuItems.map((item, i) => (
							<div key={i} className={styles.grid}>
								<Link href={item.url}>
									<a className={styles.card}>
										<h3>Search By {item.name}</h3>
										<Image
											className={styles.wave}
											src="/paw.svg"
											height={50}
											width={50}
											alt="Paw"
										/>
									</a>
								</Link>
							</div>
						))}
					</div>
				</main>
			</div>
		</Layout>
	);
};

export default Home;
