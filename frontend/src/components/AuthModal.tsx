import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import "./AuthModal.css";
import ForgotPasswordModal from "./ForgotPasswordModal";

const API_URL = import.meta.env.VITE_API_URL || "";

const authSchema = z.object({
	email: z.email("Invalid email"),
	password: z.string().min(8, "Password must have at least 8 caracters"),
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
	mode: "login" | "signup";
}

const AuthModal = ({ isOpen, onClose, mode }: AuthModalProps) => {
	const [error, setError] = useState("");
	const [forgotOpen, setForgotOpen] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AuthFormData>({
		resolver: zodResolver(authSchema),
	});

	const onSubmit = async (data: AuthFormData) => {
		setError("");
		try {
			const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
			const response = await fetch(`${API_URL}${endpoint}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) throw new Error("Authentication failed");

			const result = await response.json();
			
			const token = result.access_token || result.accessToken || result.token;
			if (token) {
				localStorage.setItem("token", token);
				if (result.user?.firstName) {
					localStorage.setItem("userName", result.user.firstName);
				}
				
			}
			
			onClose();
			window.location.reload();
		} catch (err) {
			setError("Authentication failed. Try again.");
		}
	};

	const handleGoogleAuth = () => {
		window.location.href = `${API_URL}/auth/google?redirect=${encodeURIComponent(window.location.origin + '/auth/google/callback')}`;
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close" onClick={onClose}>×</button>
				<h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
				
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="input-control">
						<input
							type="email"
							placeholder="Email"
							{...register("email")}
							disabled={isSubmitting}
						/>
						{errors.email && <p className="error-text">{errors.email.message}</p>}
					</div>

					<div className="input-control">
						<input
							type="password"
							placeholder="Password"
							{...register("password")}
							disabled={isSubmitting}
						/>
						{errors.password && <p className="error-text">{errors.password.message}</p>}
					</div>

					{error && <p className="error-text">{error}</p>}

					<button className="btn" type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Loading..." : mode === "login" ? "Login" : "Register"}
					</button>
				</form>

				{mode === "login" && (
					<button className="forgot-link" onClick={() => setForgotOpen(true)}>
						Forgot password?
					</button>
				)}

				<div className="divider">or</div>

				<button className="btn-google" onClick={handleGoogleAuth}>
					<i className="fa-brands fa-google"></i> Continue with Google
				</button>
			</div>
			<ForgotPasswordModal isOpen={forgotOpen} onClose={() => setForgotOpen(false)} />
		</div>
	);
};

export default AuthModal;
