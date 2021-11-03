import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";
import Image from "next/image";
const NavItem = ({
	url,
	name,
	onSelect,
	...rest
}: {
	url: string;
	name: string;
	onSelect: Function;
}) => {
	const router = useRouter();
	let active = false;
	const fullRoute = router.pathname;
	const routeArray = fullRoute.split("/");
	const routeName = routeArray.slice(-1)[0];
	active = name.toLowerCase() === routeName.toLowerCase();
	if (routeName == "" && name.toLowerCase() === "home") active = true;

	const classes = active ? styles.active : "";
	return (
		<Link href={url}>
			<a className={classes} onClick={() => onSelect()}>
				{name}
				{active && (
					<span className={styles.paw}>
						<Image src="/blackPaw.svg" height={20} width={20} alt="paw" />
					</span>
				)}
			</a>
		</Link>
	);
};

NavItem.propTypes = {
	url: PropTypes.string,
	name: PropTypes.string,
};

export default NavItem;
