import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";

function Layout({ children, title }: any) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Head>
				<title>{title}</title>
			</Head>
			<Navbar />
			<main>{children}</main>
		</div>
	);
}

export default Layout;
