import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<meta name="Creator" content="Nicolas Maluleke" />
					<meta name="twitter:creator" content="@hnicolus" />
					<meta name="rating" content="SAFE FOR KIDS" />
					<meta
						name="description"
						content="Cats Land is a Cats gallery Application,where you can find cats images."
					/>
					<link rel="icon" href="/paw.svg" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
