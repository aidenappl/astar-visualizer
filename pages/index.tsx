import Button from "../components/Button";
import Layout from "../components/Layout";

const HomePage = () => {
	return (
		<Layout className="flex items-center justify-center">
			<div className="flex flex-col items-center max-w-lg">
				<h1 className="text-4xl">Astar Visualizer</h1>
				<p className="my-6 text-center">
					Create an obstacle map between two points and the pathfinder
					will find the quickest path. Click launch to get started.
				</p>
				<Button
					value="Launch App"
					href="/interactive"
					className="mt-3"
				/>
			</div>
		</Layout>
	);
};

export default HomePage;
