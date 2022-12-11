import {Node, Position, newNode, newPosition} from "../types/node.type";

function Astar(arena:Node[], start:Node, end:Node): Node[]|null {
    //define open set and closed set
    let openSet:Node[] = [];
    let closedSet:Node[] = [];

    //add the starting node to the open set
    openSet.push(start);

    //while open set is not empty
    while (openSet.length > 0) {

        //get the current node from the open set and remove it
        let possibleCurNode:Node|undefined = openSet.shift();

        //if the current node is undefined, smoething went wrong
        if (possibleCurNode==undefined) {
            return null;
        }

        let currentNode:Node = possibleCurNode;

        //check if the current node has null evaluation
        if (currentNode.f!=null&&currentNode.g!=null&&currentNode.h!=null) {
            //add the current node to the closed set
            closedSet.push(currentNode);

            //check if the current node is the end
            if (end.position === currentNode?.position) {
                return getPath(currentNode);
            }

            //get the children of the current node
            let potential_children:Node[] = getChildren(currentNode,arena);

            //for each of the children
            potential_children.forEach(child => {
                //if child is not in the closed set
                if (closedSet.find(node => postitionsAreEqual(node.position, child.position)) === undefined) {
                    //define the new evaluation values
                    var g:number = currentNode.g!+1;
                    var h:number = distance(currentNode, end);
                    var f:number = g + h;
                    var child_to_add:Node = newNode(getNewID(), child.position, "evaluated", currentNode, g, h, f);
                    //if the child's position is in the open set, we need to account for if there is a better option in the open set
                    if (openSet.find(node => postitionsAreEqual(node.position, child.position)) !== undefined) {
                        //if the best g value node with the same pos as the child in the open set has a worse g value 
                        if (getBestGNodeWithPos(child_to_add, openSet).g!>child_to_add.g!) {
                            //remove all the nodes with the same position as the child
                            openSet.filter(node => postitionsAreEqual(node.position, child_to_add.position));
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
    }
    return null;
}

function getNewID(): number {
    return Math.round(Math.random() * 100);
}

function getBestGNodeWithPos(test:Node, nodes:Node[]):Node {
    let res:Node = test;
    nodes.forEach(node => {
        if (postitionsAreEqual(node.position, test.position)) {
            if (res.g!==null&&node.g!==null) {
                if (res.g>node.g) res = node;
            }
        }
    });
    return res;
}

function postitionsAreEqual(pos1:Position, pos2:Position) {
    return (pos1.x === pos2.x && pos1.y === pos2.y);
}

function distance(node:Node,end:Node):number {
    return (Math.pow(end.position.x - node.position.x, 2) + Math.pow(end.position.y - node.position.y, 2));
}

function getChildren(parent:Node, arena:Node[]): Node[] {
    let children:Node[] = [];

    let above:Position = newPosition(parent.position.x, parent.position.y+1);
    let right:Position = newPosition(parent.position.x+1, parent.position.y);
    let below:Position = newPosition(parent.position.x, parent.position.y-1);
    let left:Position = newPosition(parent.position.x-1, parent.position.y);

    if (arena.find(node => node.position === above)?.type !== "obstacle") {
        children.push(newNode(getNewID(), above, "unselected", null, null, null, null));
    }
    if (arena.find(node => node.position === below)?.type !== "obstacle") {
        children.push(newNode(getNewID(), below, "unselected", null, null, null, null));
    }
    if (arena.find(node => node.position === left)?.type !== "obstacle") {
        children.push(newNode(getNewID(), left, "unselected", null, null, null, null));
    }
    if (arena.find(node => node.position === right)?.type !== "obstacle") {
        children.push(newNode(getNewID(), right, "unselected", null, null, null, null));
    }

    return children;
}



function getPath(end:Node):Node[] {
    let eval_node:Node|null = end;
    let path:Node[] = [];
    while (eval_node!==null) {
        path.push(eval_node);
        eval_node = eval_node.parent;
    }
    path.reverse();
    return path;
}