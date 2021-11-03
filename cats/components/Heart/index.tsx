import React from "react";
import styles from "./Heart.module.css";
function index({ onClick }: { onClick: Function }) {
	return <div onClick={() => onClick()} className={styles.heart} />;
}

export default index;
