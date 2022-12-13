export let EmptyNode: Node = {
	x: 0,
	y: 0,
	type: "unselected",
	parent: null,
	g: 0,
	h: 0,
	f: 0,
};

export type Node = {
	x: number;
	y: number;
	type:
		| "unselected"
		| "evaluated"
		| "obstacle"
		| "path"
		| "startpoint"
		| "endpoint";
	parent: Node | null;
	g: number;
	h: number;
	f: number;
};

export function newNode(
	x: number,
	y: number,
	type:
		| "unselected"
		| "evaluated"
		| "obstacle"
		| "path"
		| "startpoint"
		| "endpoint",
	parent: Node | null,
	g: number,
	h: number,
	f: number
) {
	return {
		x,
		y,
		type,
		parent,
		g,
		h,
		f,
	};
}