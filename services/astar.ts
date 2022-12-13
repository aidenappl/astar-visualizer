import { Node, newNode } from "../types/node.type";

const Astar = async (
	arena: Node[][],
	startp: Node,
	endp: Node
): Promise<Node[] | null> => {
	//define open set and closed set
	let openSet: Node[] = [];
	let closedSet: Node[] = [];

	//add the starting node to the open set
	openSet.push(startp);

	//while open set is not empty
	while (openSet.length > 0) {
		//order open set where lowest f values are first
		openSet = openSet.sort((a, b) => a.f - b.f);

		//get the current node from the open set and remove it
		var possibleCurNode: Node | undefined = openSet.shift();

		//if the current node is undefined, something went wrong
		if (possibleCurNode == undefined) {
			return null;
		}

		let currentNode: Node = possibleCurNode;

		//add the current node to the closed set
		closedSet.push(currentNode);

		//check if the current node is the end
		if (positionsAreEqual(currentNode, endp)) {
			return getPath(currentNode);
		}

		//get the children of the current node
		let potential_children: Node[] = getChildren(currentNode, arena);

		//for each of the children
		potential_children.forEach((child) => {
			//if child is not in the closed set
			if (
				closedSet.find((node) => positionsAreEqual(node, child)) ===
				undefined
			) {
				//define the new evaluation values
				var g: number = currentNode.g! + 1;
				var h: number = Distance(currentNode, endp);
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
					openSet.find((node) => positionsAreEqual(node, child)) !==
					undefined
				) {
					//if the best g value node with the same pos as the child in the open set has a worse g value
					if (
						getBestGNodeWithPos(child_to_add, openSet).g! >
						child_to_add.g!
					) {
						//remove all the nodes with the same position as the child
						openSet.filter((node) =>
							positionsAreEqual(node, child_to_add)
						);
						//add the new child to the list
						openSet.push(child_to_add);
					}
				}
				// if the child's position is not in the open set
				else {
					//add the child to the open set
					openSet.push(child_to_add);
				}
			}
		});
	}

	return null;
};

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
	return Math.abs(end.x - node.x) + Math.abs(end.y - node.y);
}

function findNodeInArray(array: Node[][], toSearch: Node) {
	return array[toSearch.x][toSearch.y];
}

function getChildren(parent: Node, arena: Node[][]): Node[] {
	let children: Node[] = [];

	if (parent.x != 0) {
		let left: Node = getNodeRelative(parent, -1, 0);
		if (findNodeInArray(arena, left)?.type === "unselected") {
			children.push(left);
		}
	}

	if (parent.y != 0) {
		let above: Node = getNodeRelative(parent, 0, 1);
		if (findNodeInArray(arena, above)?.type === "unselected") {
			children.push(above);
		}
	}

	if (parent.x != arena.length) {
		let right: Node = getNodeRelative(parent, 1, 0);
		if (findNodeInArray(arena, right)?.type === "unselected") {
			children.push(right);
		}
	}

	if (parent.y != arena[1].length) {
		let below: Node = getNodeRelative(parent, 0, -1);
		let above: Node = getNodeRelative(parent, 0, 1);
		if (findNodeInArray(arena, above)?.type === "unselected") {
			children.push(below);
		}
	}

	return children;
}

function getNodeRelative(node: Node, x: number, y: number): Node {
	return newNode(
		node.x + x,
		node.y + y,
		node.type,
		node.parent,
		node.g,
		node.h,
		node.f
	);
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
