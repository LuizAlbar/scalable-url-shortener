import Boost from "./components/Boost";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Shorten from "./components/Shorten";
import Statistic from "./components/Statistic";

const App = () => {
	return (
		<>
			{/* Header Section */}
			<Header />
			{/* Hero Section */}
			<Hero />
			{/* Shorten Section */}
			<Shorten />
			{/* Statistics Section */}
			<Statistic />
			{/* Boost Section */}
			<Boost />
			{/* Footer Section */}
			<Footer />
		</>
	);
};

export default App;
