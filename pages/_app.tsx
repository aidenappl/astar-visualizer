import "../styles/globals.css";
import PageHead from "../components/PageHead";
import Snowfall from "react-snowfall";

function AstarVisualizer({ Component, pageProps }: any) {
	return (
		<>
			<PageHead title={pageProps.title} />
			<Component {...pageProps} />
		</>
	);
}

export default AstarVisualizer;
