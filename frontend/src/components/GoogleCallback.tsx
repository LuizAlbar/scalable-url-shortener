import { useEffect } from "react";

const GoogleCallback = () => {
	useEffect(() => {
		console.log("Google callback - full URL:", window.location.href);
		
		// Try to get token from URL params
		const params = new URLSearchParams(window.location.search);
		let token = params.get("token") || params.get("access_token") || params.get("accessToken");
		
		// Try hash
		if (!token && window.location.hash) {
			const hashParams = new URLSearchParams(window.location.hash.substring(1));
			token = hashParams.get("token") || hashParams.get("access_token") || hashParams.get("accessToken");
		}
		
		// Try to get from cookies
		if (!token) {
			const cookies = document.cookie.split(';');
			for (const cookie of cookies) {
				const [name, value] = cookie.trim().split('=');
				if (name === 'access_token') {
					token = value;
					break;
				}
			}
		}
		
		console.log("Google callback - token:", token);
		
		if (token) {
			localStorage.setItem("token", token);
			console.log("Token saved from Google:", token);
		}
		
		// Always redirect to home
		setTimeout(() => {
			window.location.href = "/";
		}, 500);
	}, []);

	return (
		<div style={{ textAlign: "center", marginTop: "50px" }}>
			<h2>Authenticating...</h2>
		</div>
	);
};

export default GoogleCallback;
