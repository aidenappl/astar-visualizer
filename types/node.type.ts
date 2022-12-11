export type Node = {
    id: number;
    position: Position
    type: "unselected" | "evaluated" | "obstacle" | "path";
    parent: Node | null;
    g: number|null;
    h: number|null;
    f: number|null;
}

export type Position = {
    x: number;
    y: number;
}

export function newNode(id: number, position: Position, type: "unselected" | "evaluated" | "obstacle" | "path", parent: Node | null, g:number|null, h:number|null, f:number|null) {
    return {
        id,
        position,
        type,
        parent,
        g,
        h,
        f
    };
}

export function newPosition(x: number, y: number) {
    return {
        x, y
    };
}