import { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import AuthModal from "./AuthModal";

const Header = () => {
	const [click, setClick] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);
	const [signupOpen, setSignupOpen] = useState(false);
	const [userName, setUserName] = useState<string | null>(null);

	useEffect(() => {
		const name = localStorage.getItem("userName");
		setUserName(name);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userName");
		window.location.reload();
	};

	const toggleNavClick = () => {
		setClick(!click);
	};
	return (
		<>
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
							{userName ? (
								<>
									<span className="user-greeting">Hi, {userName}</span>
									<button className="nav__link" onClick={handleLogout}>
										Logout
									</button>
								</>
							) : (
								<>
									<button className="nav__link" onClick={() => setLoginOpen(true)}>
										Login
									</button>
									<button className="nav__link | btn" datatype="narrow" onClick={() => setSignupOpen(true)}>
										SignUp
									</button>
								</>
							)}
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
								<button className="nav_link" onClick={() => setLoginOpen(true)}>
									Login
								</button>
							</li>
							<li>
								<button className="nav_link | btn" datatype="wide" onClick={() => setSignupOpen(true)}>
									SignUp
								</button>
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
			<AuthModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} mode="login" />
			<AuthModal isOpen={signupOpen} onClose={() => setSignupOpen(false)} mode="signup" />
		</>
	);
};

export default Header;
