export type Node = {
    id: number;
    position: Position
    type: "unselected" | "evaluated" | "obstacle" | "path";
    parent: Node | null;
}

export type Position = {
    x: number;
    y: number;
}

