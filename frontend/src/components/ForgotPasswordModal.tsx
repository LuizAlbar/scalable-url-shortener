import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import "./AuthModal.css";

const API_URL = import.meta.env.VITE_API_URL || "";

const forgotSchema = z.object({
	email: z.email("Invalid email"),
	token: z.string().optional(),
});

const resetSchema = z.object({
	email: z.email("Invalid email"),
	token: z.string().min(1, "Token is required"),
	newPassword: z.string().min(8, "Password must have at least 8 characters"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;
type ResetFormData = z.infer<typeof resetSchema>;

interface ForgotPasswordModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
	const [step, setStep] = useState<"forgot" | "reset">("forgot");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const {
		register: registerForgot,
		handleSubmit: handleSubmitForgot,
		formState: { errors: errorsForgot, isSubmitting: isSubmittingForgot },
	} = useForm<ForgotFormData>({
		resolver: zodResolver(forgotSchema),
	});

	const {
		register: registerReset,
		handleSubmit: handleSubmitReset,
		formState: { errors: errorsReset, isSubmitting: isSubmittingReset },
	} = useForm<ResetFormData>({
		resolver: zodResolver(resetSchema),
	});

	const onSubmitForgot = async (data: ForgotFormData) => {
		setError("");
		setMessage("");
		try {
			const response = await fetch(`${API_URL}/auth/forgot-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: data.email }),
			});

			if (!response.ok) throw new Error("Failed to send email");

			const result = await response.json();
			setMessage(result.message);
			setEmail(data.email);
			setStep("reset");
		} catch (err) {
			setError("Failed to send email. Try again.");
			console.error(err);
		}
	};

	const onSubmitReset = async (data: ResetFormData) => {
		setError("");
		setMessage("");
		try {
			const response = await fetch(`${API_URL}/auth/reset-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) throw new Error("Failed to reset password");

			const result = await response.json();
			setMessage(result.message);
			setTimeout(() => {
				onClose();
				setStep("forgot");
			}, 2000);
		} catch (err) {
			setError("Failed to reset password. Try again.");
		}
	};

	const handleClose = () => {
		setStep("forgot");
		setMessage("");
		setError("");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={handleClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close" onClick={handleClose}>×</button>
				
				{step === "forgot" ? (
					<>
						<h2>Forgot Password</h2>
						<form onSubmit={handleSubmitForgot(onSubmitForgot)}>
							<div className="input-control">
								<input
									type="email"
									placeholder="Email"
									{...registerForgot("email")}
									disabled={isSubmittingForgot}
								/>
								{errorsForgot.email && <p className="error-text">{errorsForgot.email.message}</p>}
							</div>

							{error && <p className="error-text">{error}</p>}
							{message && <p className="success-text">{message}</p>}

							<button className="btn" type="submit" disabled={isSubmittingForgot}>
								{isSubmittingForgot ? "Sending..." : "Send Reset Email"}
							</button>
						</form>
					</>
				) : (
					<>
						<h2>Reset Password</h2>
						<form onSubmit={handleSubmitReset(onSubmitReset)}>
							<div className="input-control">
								<input
									type="email"
									placeholder="Email"
									defaultValue={email}
									{...registerReset("email")}
									disabled={isSubmittingReset}
								/>
								{errorsReset.email && <p className="error-text">{errorsReset.email.message}</p>}
							</div>

							<div className="input-control">
								<input
									type="text"
									placeholder="Token from email"
									{...registerReset("token")}
									disabled={isSubmittingReset}
								/>
								{errorsReset.token && <p className="error-text">{errorsReset.token.message}</p>}
							</div>

							<div className="input-control">
								<input
									type="password"
									placeholder="New Password"
									{...registerReset("newPassword")}
									disabled={isSubmittingReset}
								/>
								{errorsReset.newPassword && <p className="error-text">{errorsReset.newPassword.message}</p>}
							</div>

							{error && <p className="error-text">{error}</p>}
							{message && <p className="success-text">{message}</p>}

							<button className="btn" type="submit" disabled={isSubmittingReset}>
								{isSubmittingReset ? "Resetting..." : "Reset Password"}
							</button>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default ForgotPasswordModal;
