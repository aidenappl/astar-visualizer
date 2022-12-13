import { Node, newNode } from "../types/node.type";

const Astar = async (
	arena: Node[][],
	startp: Node,
	endp: Node
): Promise<Node[] | null> => {

	var start = newNode(startp.x, startp.y, "startpoint", null, 0, 0, 0);
	var end = newNode(endp.x, endp.y, "startpoint", null, 0, 0, 0);


	console.log("Astar called", arena, start, end);

	//define open set and closed set
	let openSet: Node[] = [];
	let closedSet: Node[] = [];

	//add the starting node to the open set
	openSet.push(start);

	//while open set is not empty
	while (openSet.length > 0) {
		console.log("Triggered while loop");

		console.log("OpenSet", openSet);

		//order open set where lowest f values are first
		openSet = openSet.sort((a, b) => a.f - b.f);

		//get the current node from the open set and remove it
		var possibleCurNode: Node|undefined = openSet.shift();
		console.log("PossibleCurNode", possibleCurNode);

		//if the current node is undefined, something went wrong
		if (possibleCurNode == undefined) {
			console.log("Astar: current node is undefined");
			return null;
		}

		let currentNode: Node = possibleCurNode;

		//add the current node to the closed set
		closedSet.push(currentNode);

		//check if the current node is the end
		if (positionsAreEqual(currentNode, end)) {
			return getPath(currentNode);
		}

		//get the children of the current node
		let potential_children: Node[] = getChildren(currentNode, arena);

		//for each of the children
		potential_children.forEach((child) => {
			//if child is not in the closed set
			if (
				closedSet.find((node) =>
					positionsAreEqual(node, child)
				) === undefined
			) {
				//define the new evaluation values
				var g: number = currentNode.g! + 1;
				var h: number = Distance(currentNode, end);
				var f: number = g + h;
				//define a new child that is to be added to the open set (potentially)
				var child_to_add: Node = newNode(
					child.x,
					child.y,
					"evaluated",
					currentNode,
					g,
					h,
					f
				);
				//if the child's position is in the open set, we need to account for if there is a better option in the open set
				if (
					openSet.find((node) =>
						positionsAreEqual(node, child)
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
								node,
								child_to_add
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
	console.log("Astar: no path found");
	return null;
};

function getNewID(): number {
	return Math.round(Math.random() * 100);
}

function getBestGNodeWithPos(test: Node, nodes: Node[]): Node {
	let res: Node = test;
	nodes.forEach((node) => {
		if (positionsAreEqual(node, test)) {
			if (res.g !== null && node.g !== null) {
				if (res.g > node.g) res = node;
			}
		}
	});
	return res;
}

function positionsAreEqual(pos1: Node, pos2: Node) {
	return pos1.x === pos2.x && pos1.y === pos2.y;
}

function Distance(node: Node, end: Node): number {
	return (
		Math.pow(end.x - node.x, 2) +
		Math.pow(end.y - node.y, 2)
	);
}

function findNodeInArray(array: Node[][], toSearch: Node) {

	for (let i = 0; i < array.length; i++) {
		let innerArray = array[i];
		for (let j = 0; j < innerArray.length; j++) {
			let element = innerArray[j];
			if (positionsAreEqual(element, toSearch)) {
				return element;
			}
		}
	}
}

function getChildren(parent: Node, arena: Node[][]): Node[] {
	console.log("getChildren called");

	let children: Node[] = [];

	let above: Node = getNodeRelative(parent, 0, 1);
	let below: Node = getNodeRelative(parent, 0, -1);
	let left: Node = getNodeRelative(parent, -1, 0);
	let right: Node = getNodeRelative(parent, 1, 0);

	if (
		findNodeInArray(arena, above)?.type ===
		"unselected"
	) {
		children.push(above);
	}
	if (
		findNodeInArray(arena, above)?.type ===
		"unselected"
	) {
		children.push(below);
	}
	if (
		findNodeInArray(arena, left)?.type ===
		"unselected"
	) {
		children.push(left);
	}
	if (
		findNodeInArray(arena, right)?.type ===
		"unselected"
	) {
		children.push(right);
	}

	console.log("children: ", children);

	return children;
}

function getNodeRelative(node: Node, x: number, y: number): Node {
	return newNode(node.x+x, node.y+y, node.type, node.parent, node.g, node.h, node.f);
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
