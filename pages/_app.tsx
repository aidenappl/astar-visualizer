import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PageHead from '../components/PageHead';

function MyApp({ Component, pageProps }: any) {
	return (
		<>
			<PageHead title={pageProps.title} />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
