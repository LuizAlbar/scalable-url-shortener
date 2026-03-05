import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boost from "./components/Boost";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Shorten from "./components/Shorten";
import Statistic from "./components/Statistic";
import GoogleCallback from "./components/GoogleCallback";

const HomePage = () => (
	<>
		<Header />
		<Hero />
		<Shorten />
		<Statistic />
		<Boost />
		<Footer />
	</>
);

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/auth/google/callback" element={<GoogleCallback />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
