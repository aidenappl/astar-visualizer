import { Node, Position, newNode, newPosition } from "../types/node.type";

const Astar = async (
	arena: Node[],
	start: Node,
	end: Node
): Promise<Node[] | null>  => {
	console.log("Astar called", arena, start, end);

	//define open set and closed set
	let openSet: Node[] = [];
	let closedSet: Node[] = [];

	//add the starting node to the open set
	openSet.push(start);
    openSet.push(newNode (getNewID(), newPosition(50, 50), "unselected", null, 0, 0, 0))

	//while open set is not empty
	while (openSet.length > 0) {
		console.log("Triggered while loop");

		//get the current node from the open set and remove it
		let lowestFVal = Math.min(...openSet.map((node) => node.f!));

		let possibleCurNode: Node | undefined = openSet.find(
			(node) => node.f === lowestFVal
		);

		openSet = openSet.filter((node) => node.f !== lowestFVal);

        console.log(lowestFVal, possibleCurNode, openSet)

		//if the current node is undefined, something went wrong
		if (possibleCurNode == undefined) {
			console.log("Astar: current node is undefined");
			return null;
		}

		let currentNode: Node = possibleCurNode;

		//add the current node to the closed set
		closedSet.push(currentNode);

		//check if the current node is the end
		if (end.position === currentNode?.position) {
			return getPath(currentNode);
		}

		//get the children of the current node
		let potential_children: Node[] = getChildren(currentNode, arena);

		//for each of the children
		potential_children.forEach((child) => {
			//if child is not in the closed set
			if (
				closedSet.find((node) =>
                    positionsAreEqual(node.position, child.position)
				) === undefined
			) {
				//define the new evaluation values
				var g: number = currentNode.g! + 1;
				var h: number = Distance(currentNode, end);
				var f: number = g + h;
				//define a new child that is to be added to the open set (potentially)
				var child_to_add: Node = newNode(
					getNewID(),
					child.position,
					"evaluated",
					currentNode,
					g,
					h,
					f
				);
				//if the child's position is in the open set, we need to account for if there is a better option in the open set
				if (
					openSet.find((node) =>
                        positionsAreEqual(node.position, child.position)
					) !== undefined
				) {
					//if the best g value node with the same pos as the child in the open set has a worse g value
					if (
						getBestGNodeWithPos(child_to_add, openSet).g! >
						child_to_add.g!
					) {
						//remove all the nodes with the same position as the child
						openSet.filter((node) =>
                            positionsAreEqual(
								node.position,
								child_to_add.position
							)
						);
						//add the new child to the list
						openSet.push(child_to_add);
					}
					//dont add it if not
				}
				// if the child's position is not in the open set
				else {
					//add the child to the open set
					openSet.push(child_to_add);
				}
			}
		});
	}
    console.log("Astar: no path found")
	return null;
};

function getNewID(): number {
	return Math.round(Math.random() * 100);
}

function getBestGNodeWithPos(test: Node, nodes: Node[]): Node {
	let res: Node = test;
	nodes.forEach((node) => {
		if (positionsAreEqual(node.position, test.position)) {
			if (res.g !== null && node.g !== null) {
				if (res.g > node.g) res = node;
			}
		}
	});
	return res;
}

function positionsAreEqual(pos1: Position, pos2: Position) {
	return pos1.x === pos2.x && pos1.y === pos2.y;
}

function Distance(node: Node, end: Node): number {
	return (
		Math.pow(end.position.x - node.position.x, 2) +
		Math.pow(end.position.y - node.position.y, 2)
	);
}

function getChildren(parent: Node, arena: Node[]): Node[] {
	console.log("getChildren called");

	let children: Node[] = [];

	let above: Position = newPosition(parent.position.x, parent.position.y + 1);
	let right: Position = newPosition(parent.position.x + 1, parent.position.y);
	let below: Position = newPosition(parent.position.x, parent.position.y - 1);
	let left: Position = newPosition(parent.position.x - 1, parent.position.y);

	if (arena.find((node) => positionsAreEqual(node.position, above))?.type !== "obstacle") {
		children.push(
			newNode(getNewID(), above, "unselected", null, null, null, null)
		);
	}
	if (arena.find((node) => positionsAreEqual(node.position, below))?.type !== "obstacle") {
		children.push(
			newNode(getNewID(), below, "unselected", null, null, null, null)
		);
	}
	if (arena.find((node) => positionsAreEqual(node.position, left))?.type !== "obstacle") {
		children.push(
			newNode(getNewID(), left, "unselected", null, null, null, null)
		);
	}
	if (arena.find((node) => positionsAreEqual(node.position, right))?.type !== "obstacle") {
		children.push(
			newNode(getNewID(), right, "unselected", null, null, null, null)
		);
	}

	console.log("children: ", children);

	return children;
}

function getPath(end: Node): Node[] {
	let eval_node: Node | null = end;
	let path: Node[] = [];
	while (eval_node !== null) {
		path.push(eval_node);
		eval_node = eval_node.parent;
	}
	path.reverse();
	return path;
}

export { Astar, Distance };
