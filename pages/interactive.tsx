import { useEffect, useState } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";

const InteractivePage = () => {
	const [nodes, setNodes] = useState<any[]>([]);

	const handleMouseMove = (event: any) => {
		let node = event.target.id;
		if (event.buttons == 1) {
			if (event.shiftKey) {
				// Erase
				clearNode(parseInt(node.split("_")[1]));
			} else {
				// Draw
				selectedNode(parseInt(node.split("_")[1]));
			}
		}
	};

	useEffect(() => {
		setNodes(generateNodes(700, 700));
		document
			.getElementById("interactivezone")!
			.addEventListener("mousemove", handleMouseMove);

		return () => {
			document
				.getElementById("interactivezone")!
				.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	const selectedNode = (node: number) => {
		setNodes((prevState) => {
			let newState = [...prevState];
			newState[node].type = "selected";
			return newState;
		});
	};

	const clearNode = (node: number) => {
		setNodes((prevState) => {
			let newState = [...prevState];
			newState[node].type = "unselected";
			return newState;
		});
	};

	const generateNodes = (width: number, height: number) => {
		let genNodes: any[] = [];
		let id = 0;
		for (let i = 0; i < width; i += 28) {
			for (let j = 0; j < height; j += 28) {
				genNodes.push({ id: id, x: i, y: j, type: "unselected" });
				id++;
			}
		}
		return genNodes;
	};

	return (
		<Layout className="">
			<div className="relative z-10 flex flex-col items-center py-16">
				<h1 className="mb-4 text-2xl">Draw Obstacles</h1>
				<div className="flex gap-4">
					<Button
						className="bg-slate-700"
						onClick={() => {
							setNodes(generateNodes(700, 700));
						}}
						value="Clear"
					/>
					<Button
						onClick={() => {
							setNodes(generateNodes(700, 700));
						}}
						value="Solve"
					/>
				</div>
			</div>
			<div className="absolute top-0 flex items-center justify-center w-full h-screen z-1">
				<div id="interactivezone" className="flex flex-wrap w-[700px]">
					{nodes.map((node, i) => {
						return (
							<div
								key={i}
								onClick={() => {
									selectedNode(node.id);
								}}
								id={`node_${node.id}`}
								className={
									"w-[28px] h-[28px] bg-gray-200 border border-gray-300 hover:bg-gray-800 " +
									(node.type === "selected"
										? "bg-gray-500"
										: "")
								}
							></div>
						);
					})}
				</div>
			</div>
		</Layout>
	);
};

export default InteractivePage;
