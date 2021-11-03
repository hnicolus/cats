import CustomButton from "@components/Button";
import Layout from "@components/Layout";
import React from "react";
import { useRouter } from "next/router";

import styles from "@styles/404.module.css";
function _404() {
	const router = useRouter();
	return (
		<Layout title="500 | Error">
			<div className={styles.wrapper}>
				<h1>Meeoops !! </h1>
				<p>An internal error Occured</p>
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
		</Layout>
	);
}

export default _404;
