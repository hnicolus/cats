import React from "react";
import styles from "./Loader.module.css";
function Loader({ label }: { label?: string }) {
	return (
		<div className={styles.container}>
			<div className={styles.shadow} />
			<div className={styles.cat}>
				<div className={styles.ear} />
				<div className={styles.eye} />
				<div className={styles.mouth} />
				<div className={styles.nose} />
				<div className={styles.tail} />
				<div className={styles.body} />
				<div className={styles.bubble} />
			</div>
			<h4>{label}...</h4>
		</div>
	);
}

export default Loader;
