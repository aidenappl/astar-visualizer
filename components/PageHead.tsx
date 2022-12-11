import Head from 'next/head';

interface PageHeadProps {
	title: string;
}

const PageHead = (props: PageHeadProps) => {
	const { title = 'Astar Visualizer - Interactive Astar Tool' } = props;
	return (
		<Head>
			{/* Default Header Items */}
			<title>{title}</title>
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>

			{/* Favicon Header Items */}
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="./favicons/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="./favicons/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="./favicons/favicon-16x16.png"
			/>
			<link rel="manifest" href="/favicons/site.webmanifest" />
			<link
				rel="mask-icon"
				href="./favicons/safari-pinned-tab.svg"
				color="#5bbad5"
			/>
			<link rel="shortcut icon" href="./favicons/favicon.ico" />
			<meta name="msapplication-TileColor" content="#70d2d1" />
			<meta
				name="msapplication-config"
				content="./favicons/browserconfig.xml"
			/>
			<meta name="theme-color" content="#ffffff" />

			{/* SSO Tags */}
			{/* Primary Meta Tags */}
			<meta name="title" content={title} />
			<meta
				name="description"
				content="Interact and run Astar problems by creating a map with obstacles and then running to find the fastest path between two points. "
			/>
			{/* Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://metatags.io/" />
			<meta property="og:title" content={title} />
			<meta
				property="og:description"
				content="Interact and run Astar problems by creating a map with obstacles and then running to find the fastest path between two points. "
			/>
			<meta
				property="og:image"
				content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
			/>
			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://metatags.io/" />
			<meta property="twitter:title" content={title} />
			<meta
				property="twitter:description"
				content="Interact and run Astar problems by creating a map with obstacles and then running to find the fastest path between two points. "
			/>
			<meta
				property="twitter:image"
				content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
			/>
		</Head>
	);
};

export default PageHead;
