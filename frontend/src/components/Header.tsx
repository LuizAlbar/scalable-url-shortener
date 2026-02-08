import { useState } from "react";
import Logo from "../assets/logo.svg";

const Header = () => {
	const [click, setClick] = useState(false);

	const toggleNavClick = () => {
		setClick(!click);
	};
	return (
		<header className="header">
			<div className="content | container">
				{/* Desktop NavBar */}
				<nav className="nav">
					<nav className="nav__inner">
						{/* Logo */}
						<a href="//#region" className="logo">
							<img src={Logo} alt="Logo"></img>
						</a>

						{/* Nav Links */}

						<ul className="nav__links | hide">
							<li>
								<a className="nav__link" href="//#region">
									Features
								</a>
							</li>
							<li>
								<a className="nav__link" href="//#region ">
									Pricing
								</a>
							</li>
							<li>
								<a className="nav__link" href="//#region">
									Resources
								</a>
							</li>
						</ul>
					</nav>

					<div className="buttons | hide">
						<a className="nav__link" href="//#region ">
							Login
						</a>
						<a className="nav__link | btn" datatype="narrow" href="#region">
							SignUp
						</a>
					</div>
				</nav>

				{/* Mobile Nav */}
				<nav className={`mobile-nav ${click ? "show" : ""} `}>
					<ul className="nav__links | primary">
						<li>
							<a href="#region" className="nav__link">
								Features
							</a>
						</li>
						<li>
							<a href="#region" className="nav__link">
								Pricing
							</a>
						</li>
						<li>
							<a href="#region" className="nav__link">
								Resource
							</a>
						</li>
					</ul>

					<ul className="nav__links | secondary">
						<li>
							<a href="#region" className="nav_link">
								Login
							</a>
						</li>
						<li>
							<a href="#region" className="nav_link | btn" datatype="wide">
								SignUp
							</a>
						</li>
					</ul>
				</nav>

				{/* Menu Icons */}
				<div className="menu-icons" onClick={toggleNavClick}>
					{click ? (
						<button type="button">
							<i className="fa-solid fa-close "></i>
						</button>
					) : (
						<button type="button">
							<i className="fa-solid fa-bars "></i>
						</button>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
