import { range } from "lodash";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { Astar } from "../services/astar";
import { EmptyNode, newNode, Node } from "../types/node.type";

const InteractivePage = () => {
	// Node State
	const [nodes, setNodes] = useState<Node[][]>([]);

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
				clearNode(nodes[node.split("x")[0]][node.split("x")[1]]);
			} else {
				// Draw
				selectNode(nodes[node.split("x")[0]][node.split("x")[1]]);
			}
		}
	};

	const setMasterPoint = (node: Node, pointType: string) => {
		console.log(node);
		if (pointType == "startpoint" && startPoint == null) {
			setStartPoint(node);
			setNodes((prevState) => {
				let newState = [...prevState];
				newState[node.x][node.y].type = "startpoint";
				return newState;
			});
		} else if (pointType == "endpoint" && endPoint == null) {
			setEndPoint(node);
			setNodes((prevState) => {
				let newState = [...prevState];
				newState[node.x][node.y].type = "endpoint";
				return newState;
			});
		}
	};

	useEffect(() => {
		setNodes(generateNodes(25, 25, EmptyNode));
	}, []);

	useEffect(() => {
		document
			.getElementById("interactivezone")!
			.addEventListener("mousemove", handleMouseMove);

		return () => {
			document
				.getElementById("interactivezone")!
				.removeEventListener("mousemove", handleMouseMove);
		};
	}, [nodes]);

	const selectNode = (node: Node) => {
		setNodes((prevState) => {
			let newState = [...prevState];
			newState[node.x][node.y].type = "obstacle";
			return newState;
		});
	};

	const clearNode = (node: Node) => {
		setNodes((prevState) => {
			let newState = [...prevState];
			newState[node.x][node.y].type = "unselected";
			return newState;
		});
	};

	const generateNodes = <Node extends { x: number; y: number }>(
		width: number,
		height: number,
		value: Node
	): Node[][] => {
		return range(width).map((x) =>
			range(height).map((y) => ({ ...value, x, y }))
		);
	};

	return (
		<Layout className="flex">
			<div className="relative z-10 flex flex-col items-center py-16">
				<h1 className="mb-5 text-2xl">Draw Obstacles</h1>
				<div className="flex gap-4">
					<Button
						className="!bg-slate-700"
						onClick={() => {
							setClickState(null);
							setStartPoint(null);
							setEndPoint(null);
							setNodes(generateNodes(25, 25, EmptyNode));
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
						{nodes
							? nodes.map((row, rowIndex) => {
									return (
										<div key={rowIndex}>
											{row.map((node, i) => {
												return (
													<div
														key={i}
														onClick={() => {
															if (
																clickState ==
																"startpoint"
															) {
																setMasterPoint(
																	node,
																	"startpoint"
																);
															} else if (
																clickState ==
																"endpoint"
															) {
																setMasterPoint(
																	node,
																	"endpoint"
																);
															} else {
																selectNode(
																	node
																);
															}
														}}
														id={`${node.x}x${node.y}`}
														className={
															"w-[28px] h-[28px] bg-gray-200 border border-gray-300 hover:bg-gray-800 " +
															(node.type ===
															"obstacle"
																? "bg-gray-500" // Selected
																: node.type ===
																  "startpoint"
																? "bg-green-500" // Start
																: node.type ===
																  "endpoint"
																? "bg-red-500" // End
																: "")
														}
													/>
												);
											})}
										</div>
									);
							  })
							: null}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default InteractivePage;
