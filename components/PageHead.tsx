import Head from 'next/head';

interface PageHeadProps {
	title: string;
}

const PageHead = (props: PageHeadProps) => {
	const { title = 'Astar Visualizer' } = props;
	return (
		<Head>
			{/* Default Header Items */}
			<title>{title}</title>
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>

			{/* Favicon Header Items */}
		</Head>
	);
};

export default PageHead;
