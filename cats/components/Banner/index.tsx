import React from "react";
import styles from "./Banner.module.css";
function index({ children }: any) {
	return <div className={styles.banner}>{children}</div>;
}

export default index;
