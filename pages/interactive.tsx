import { useEffect, useState } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { Astar } from "../services/astar";
import { newNode, Node } from "../types/node.type";

const InteractivePage = () => {
	// Node State
	const [nodes, setNodes] = useState<Node[]>([]);

	// Mouse Event Handler
	const [clickState, setClickState] = useState<string | null>(null);

	// Storing Start & Endpoint
	const [startPoint, setStartPoint] = useState<Node | null>(null);
	const [endPoint, setEndPoint] = useState<Node | null>(null);

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

	const setMasterPoint = (node: Node, pointType: string) => {
		console.log(node);
		if (pointType == "startpoint" && startPoint == null) {
			setStartPoint(node);
			setNodes((prevState) => {
				let newState = [...prevState];
				newState[node.id].type = "startpoint";
				return newState;
			});
		} else if (pointType == "endpoint" && endPoint == null) {
			setEndPoint(node);
			setNodes((prevState) => {
				let newState = [...prevState];
				newState[node.id].type = "endpoint";
				return newState;
			});
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
			newState[node].type = "obstacle";
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

	const generateNodes = (width: number, height: number): Node[] => {
		let genNodes: any[] = [];
		let id = 0;
		for (let i = 0; i < width; i += 28) {
			for (let j = 0; j < height; j += 28) {
				genNodes.push(
					newNode(
						id,
						{
							x: i / 28,
							y: j / 28,
						},
						"unselected",
						null,
						0,
						0,
						0
					)
				);
				id++;
			}
		}
		return genNodes;
	};

	return (
		<Layout className="">
			<div className="relative z-10 flex flex-col items-center py-16">
				<h1 className="mb-5 text-2xl">Draw Obstacles</h1>
				<div className="flex gap-4">
					<Button
						className="!bg-slate-700"
						onClick={() => {
							setClickState(null);
							setStartPoint(null);
							setEndPoint(null);
							setNodes(generateNodes(700, 700));
						}}
						value="Clear"
					/>
					<Button
						onClick={async () => {
							if (startPoint == null || endPoint == null) {
								window.alert("Please set start and end point");
								return;
							}
							console.log(
								await Astar(nodes, startPoint!, endPoint!)
							);
						}}
						value="Solve"
					/>
				</div>
			</div>
			<div className="absolute top-0 flex items-center justify-center w-full h-screen z-1">
				<div className="flex flex-col gap-4">
					<div className="flex gap-2">
						<div
							onClick={() => {
								setClickState("startpoint");
							}}
							className="w-[28px] h-[28px] bg-green-400 border border-green-700 hover:bg-green-500"
						/>
						<div
							onClick={() => {
								setClickState("endpoint");
							}}
							className="w-[28px] h-[28px] bg-red-400 border border-red-700 hover:bg-red-500"
						/>
						<div
							onClick={() => {
								setClickState(null);
							}}
							className="w-[28px] h-[28px] bg-gray-300 border border-gray-400 hover:bg-gray-800"
						/>
					</div>
					<div
						id="interactivezone"
						className="flex flex-wrap w-[700px] "
					>
						{nodes.map((node, i) => {
							return (
								<div
									key={i}
									onClick={() => {
										if (clickState == "startpoint") {
											setMasterPoint(node, "startpoint");
										} else if (clickState == "endpoint") {
											setMasterPoint(node, "endpoint");
										} else {
											selectedNode(node.id);
										}
									}}
									id={`node_${node.id}`}
									className={
										"w-[28px] h-[28px] bg-gray-200 border border-gray-300 hover:bg-gray-800 " +
										(node.type === "obstacle"
											? "bg-gray-500" // Selected
											: node.type === "startpoint"
											? "bg-green-500" // Start
											: node.type === "endpoint"
											? "bg-red-500" // End
											: "")
									}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default InteractivePage;


