import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import NavItem from "./NavItem";
type MenuItem = {
	name: string;
	url: string;
};
function Navbar() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const menuItems: MenuItem[] = [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "Breeds",
			url: "/breeds",
		},
		{
			name: "Categories",
			url: "/categories",
		},
		{
			name: "Favourites",
			url: "/favourites",
		},
	];

	const closeDrawer = () => {
		setDrawerOpen(false);
	};
	const jsStyle = {
		drawer: {
			display: drawerOpen ? "block" : "none",
		},
	};
	return (
		<nav className={styles.nav}>
			<div className={styles.logo}>
				<Link href="/" passHref>
					<Image src="/paw.svg" width={50} height={50} alt="logo" />
				</Link>
			</div>
			<ul>
				{menuItems.map((item: MenuItem, i: number) => (
					<li key={i}>
						<NavItem
							name={item.name}
							url={item.url}
							onSelect={() => closeDrawer()}
						/>
					</li>
				))}
			</ul>
			<div className={styles.mobile}>
				<button
					className={styles.hamburger}
					onClick={() => setDrawerOpen(true)}
				>
					<Image src="/catMenu.svg" width={50} height={50} alt="Menu" />
				</button>
			</div>
			<div
				className={styles.drawer}
				style={jsStyle.drawer}
				onClick={() => closeDrawer()}
			>
				<div className={styles.menu}>
					<ul>
						{menuItems.map((item: MenuItem, i: number) => (
							<li key={i}>
								<NavItem
									onSelect={() => closeDrawer()}
									name={item.name}
									url={item.url}
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
