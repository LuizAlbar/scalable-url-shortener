import { useEffect } from "react";
import "./GoogleCallback.css";

const GoogleCallback = () => {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		let token = params.get("token") || params.get("access_token") || params.get("accessToken");
		

		if (!token && window.location.hash) {
			const hashParams = new URLSearchParams(window.location.hash.substring(1));
			token = hashParams.get("token") || hashParams.get("access_token") || hashParams.get("accessToken");
		}
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
		
		
		if (token) {
			localStorage.setItem("token", token);
		}
		
	
		const userName = params.get("name") || params.get("firstName");
		if (userName) {
			localStorage.setItem("userName", userName);
		}
		
		setTimeout(() => {
			window.location.href = "/";
		}, 500);
	}, []);

	return (
		<div className="loading-screen">
			<div className="loading-content">
				<div className="loading-spinner"></div>
				<h2>Authenticating</h2>
				<p>Please wait while we complete your sign in...</p>
			</div>
		</div>
	);
};

export default GoogleCallback;
