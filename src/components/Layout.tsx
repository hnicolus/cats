import Head from "next/head";
import React from "react";
import Footer from "./Footer";
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
			<Footer />
		</div>
	);
}

export default Layout;
