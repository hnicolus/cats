import React from "react";
import styles from "@styles/Button.module.css";

function CustomButton(props: any) {
	const { children, onClick: handleOnClick } = props;

	return (
		<button
			{...props}
			color="primary"
			onClick={handleOnClick}
			className={styles.Button}
		>
			<span className={styles.background} />
			{children}
		</button>
	);
}

export default CustomButton;
