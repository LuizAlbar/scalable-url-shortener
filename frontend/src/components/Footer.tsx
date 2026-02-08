import Logo from "../assets/logo.svg";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__content">
					{/* Logo */}
					<div>
						<a href="#region" className="logo">
							<img src={Logo} alt="Logo" />
						</a>
					</div>

					<div className="footer__links">
						{/* Nav Links */}
						<div className="nav--links">
							<h4>Features</h4>
							<li>
								<a href="#region">Link Shortening</a>
							</li>
							<li>
								<a href="#region">Branded Links</a>
							</li>
							<li>
								<a href="#region">Analytics</a>
							</li>
						</div>
						<div className="nav--links">
							<h4>Resources</h4>
							<li>
								<a href="#region">Blog</a>
							</li>
							<li>
								<a href="#region">Developers</a>
							</li>
							<li>
								<a href="#region">Support</a>
							</li>
						</div>
						<div className="nav--links">
							<h4>Company</h4>
							<li>
								<a href="#region">About</a>
							</li>
							<li>
								<a href="#region">Our Team</a>
							</li>
							<li>
								<a href="#region">Careers</a>
							</li>
							<li>
								<a href="#region">Contact</a>
							</li>
						</div>

						{/* Social Links */}
						<div className="social--links">
							<a href="#region">
								<i className="fa-brands fa-facebook"></i>
							</a>
							<a href="#region">
								<i className="fa-brands fa-twitter"></i>
							</a>
							<a href="#region">
								<i className="fa-brands fa-pinterest"></i>
							</a>
							<a href="#region">
								<i className="fa-brands fa-instagram"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
