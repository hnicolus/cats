import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
function Footer() {
	return (
		<footer className={styles.footer}>
			Created by
			<a href="" target="_blank" rel="noopener noreferrer">
				Nicolas Maluleke
				<span className={styles.logo}>
					<Image src="/paw.svg" alt="Cats" width={72} height={16} />
				</span>
			</a>
		</footer>
	);
}

export default Footer;
