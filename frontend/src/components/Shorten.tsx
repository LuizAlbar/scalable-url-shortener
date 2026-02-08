import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const shortenSchema = z.object({
	url: z
		.url("Please enter a valid URL (e.g., https://example.com)")
		.nonempty("Please add a link"),
});

type ShortenFormData = z.infer<typeof shortenSchema>;

interface ShortenedUrl {
	originalUrl: string;
	shortUrl: string;
}

const Shorten = () => {
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
	const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>(() => {
		const stored = localStorage.getItem("shortenUrl");
		return stored ? JSON.parse(stored) : [];
	});
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ShortenFormData>({
		resolver: zodResolver(shortenSchema),
	});

	const onSubmit = async (data: ShortenFormData) => {
		try {
			const response = await fetch("/api/v1/shorten", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) throw new Error("Failed to shorten");

			const result = await response.json();

			const updatedList = [
				...shortenedUrls,
				{ originalUrl: data.url, shortUrl: result.short_url },
			];

			setShortenedUrls(updatedList);
			localStorage.setItem("shortenUrl", JSON.stringify(updatedList));
			reset();
		} catch (error) {
			console.error(error);
		}
	};

	const handleCopy = (shortUrl: string, index: number) => {
		navigator.clipboard.writeText(shortUrl);
		setCopiedIndex(index);
		setTimeout(() => setCopiedIndex(null), 2000);
	};

	return (
		<section className="shorten">
			<div className="container">
				{/* Shorten Content */}

				<div className="shorten__content">
					<form onSubmit={handleSubmit(onSubmit)} className="form">
						<div className="input-control">
							<input
								type="text"
								placeholder="Shorten a link here..."
								className={errors.url ? "error-input" : ""}
								{...register("url")}
								disabled={isSubmitting}
							/>
							{errors.url && <p className="error-text">{errors.url.message}</p>}
						</div>

						<button
							className="btn"
							datatype="wide"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Shortening..." : "Shorten It!"}
						</button>
					</form>
				</div>
				{/* Shorten Output */}

				<div className="shorten__cards">
					{/* Shorten Card */}
					<div className="shorten__card">
						<div className="actual-link">
							<span>https://google.com</span>
						</div>
						<hr className="line" />

						<div className="shorten__link">
							<a href="#region" target="_blank" rel="noopener">
								https://shortly/ak4sa
							</a>
							<button className="btn" datatype="wide" type="button">
								Copy
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Shorten;
