import Layout from "@components/Layout";
import Loader from "@components/Loader";
import { NextPage } from "next";
import React from "react";

const favourites: NextPage = () => {
	return (
		<Layout title="Favourites">
			<Loader label={"Loading Breeds"} />
		</Layout>
	);
};

export default favourites;
