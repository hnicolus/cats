import React from "react";
import styles from "./Button.module.css";

function CustomButton(props: any) {
	const { children, onClick: handleOnClick } = props;

	return (
		<button
			{...props}
			onClick={handleOnClick}
			className={styles.Button}
		>
			<span className={styles.background} />
			{children}
		</button>
	);
}

export default CustomButton;
