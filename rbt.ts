import { Estudent } from "./estudent";
import { NodeRBT } from "./node_rbt";

export class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;

    constructor() {
        let leafForEstudent = new Estudent(0, " " , 0, 0);
        this.leaf = new NodeRBT(leafForEstudent, true);
        this.root = this.leaf;
    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() === "RED") {
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    private leftRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() !== this.leaf) {
            y.getLeftChild().setFather(x);
        }
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) {
            this.root = y;
        } else if (x === x.getFather().getLeftChild()) {
            x.getFather().setLeftChild(y);
        } else {
            x.getFather().setRightChild(y);
        }
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() !== this.leaf) {
            y.getRightChild().setFather(x);
        }
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) {
            this.root = y;
        } else if (x === x.getFather().getRightChild()) {
            x.getFather().setRightChild(y);
        } else {
            x.getFather().setLeftChild(y);
        }
        y.setRightChild(x);
        x.setFather(y);
    }

    public insert(data: Estudent): void {
        let newNode: NodeRBT = new NodeRBT(data);
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;

        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);

        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData().getGPA() < current.getData().getGPA()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }

        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getData().getGPA() < parent.getData().getGPA()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        newNode.setNodeAsRed();
        this.fixInsert(newNode);
    }

    // print inorder (left, root, right)
    private printNodeInorder(nodo: NodeRBT): void {
        if (nodo.getLeftChild() !== this.leaf) {
            this.printNodeInorder(nodo.getLeftChild());
        }
        console.log(nodo.getData().showInformation() + "(" + nodo.getColor() + ")");
        if (nodo.getRightChild() !== this.leaf) {
            this.printNodeInorder(nodo.getRightChild());
        }
    }

    // print Preorder(root, left, right)
    private printNodePreorder(nodo: NodeRBT): void {
        console.log(nodo.getData().showInformation() + "(" + nodo.getColor() + ")");
        if (nodo.getLeftChild() !== this.leaf) {
            this.printNodePreorder(nodo.getLeftChild());
        }
        if (nodo.getRightChild() !== this.leaf) {
            this.printNodePreorder(nodo.getRightChild());
        }
    }

    // print Posorder(left, right, root)
    private printNodePosorder(nodo: NodeRBT): void {
        if (nodo.getLeftChild() !== this.leaf) {
            this.printNodePosorder(nodo.getLeftChild());
        }
        if (nodo.getRightChild() !== this.leaf) {
            this.printNodePosorder(nodo.getRightChild());
        }
        console.log(nodo.getData().showInformation() + "(" + nodo.getColor() + ")");
    }

    public printAll(): void {
        console.log('\nINORDER');
        this.printNodeInorder(this.root);
        console.log('\nPREORDER');
        this.printNodePreorder(this.root);
        console.log('\nPOSORDER');
        this.printNodePosorder(this.root);
    }

    // método de búsqueda  
    public search(dataToSearch: number): NodeRBT | null {
        return this.recursiveSearch(this.root, dataToSearch);
    }

    private recursiveSearch(current: NodeRBT, dataToSearch: number): NodeRBT | null {
        if (current === this.leaf) {     
            return null;
        }
        if (current.getData().getGPA() === dataToSearch) {
            return current;  // Encontrado
        }
        if (dataToSearch < current.getData().getGPA()) {
            return this.recursiveSearch(current.getLeftChild(), dataToSearch);
        } else {
            return this.recursiveSearch(current.getRightChild(), dataToSearch);
        }
    }


    // -------------------------------------------------------------DELETE NODE PROOF ---------------------------------
    // borrar por GPA
    public deleteNode(GPA: number): void {
    let nodeToDelete: NodeRBT | null = this.search(GPA);
    
    if (nodeToDelete === null || nodeToDelete === this.leaf) {
        console.log("El nodo no existe en el árbol.");
        return;
    }

    let originalColor: string = nodeToDelete.getColor();
    let fixNode: NodeRBT;

    // Caso cuando nodeToDelete tiene menos de dos hijos
    if (nodeToDelete.getLeftChild() === this.leaf) {
        fixNode = nodeToDelete.getRightChild();
        this.transplant(nodeToDelete, nodeToDelete.getRightChild());
    } else if (nodeToDelete.getRightChild() === this.leaf) {
        fixNode = nodeToDelete.getLeftChild();
        this.transplant(nodeToDelete, nodeToDelete.getLeftChild());
    } else {
        // Encontramos el sucesor
        let successor: NodeRBT = this.minimum(nodeToDelete.getRightChild());
        originalColor = successor.getColor();
        fixNode = successor.getRightChild();

        if (successor.getFather() !== nodeToDelete) {
            this.transplant(successor, successor.getRightChild());
            successor.setRightChild(nodeToDelete.getRightChild());
            successor.getRightChild().setFather(successor);
        }

        this.transplant(nodeToDelete, successor);
        successor.setLeftChild(nodeToDelete.getLeftChild());
        successor.getLeftChild().setFather(successor);
        successor.setNodeAsBlack(); // El sucesor debe ser negro
    }

    if (originalColor === "BLACK") {
        this.fixDelete(fixNode);
    }
}

    private transplant(u: NodeRBT, v: NodeRBT): void {
        if (u.getFather() === this.leaf) {
            this.root = v;
        } else if (u === u.getFather().getLeftChild()) {
            u.getFather().setLeftChild(v);
        } else {
            u.getFather().setRightChild(v);
        }
        v.setFather(u.getFather());
    }

    private minimum(node: NodeRBT): NodeRBT {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    }

    private fixDelete(node: NodeRBT): void {
        while (node !== this.root && node.getColor() === "BLACK") {
            if (node === node.getFather().getLeftChild()) {
                let sibling = node.getFather().getRightChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    node.getFather().setNodeAsRed();
                    this.leftRotate(node.getFather());
                    sibling = node.getFather().getRightChild();
                }
                if (sibling.getLeftChild().getColor() === "BLACK" && sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    node = node.getFather();
                } else {
                    if (sibling.getRightChild().getColor() === "BLACK") {
                        sibling.getLeftChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.rightRotate(sibling);
                        sibling = node.getFather().getRightChild();
                    }
                    sibling.setNodeAsBlack();
                    node.getFather().setNodeAsBlack();
                    sibling.getRightChild().setNodeAsBlack();
                    this.leftRotate(node.getFather());
                    node = this.root;
                }
            } else {
                let sibling = node.getFather().getLeftChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    node.getFather().setNodeAsRed();
                    this.rightRotate(node.getFather());
                    sibling = node.getFather().getLeftChild();
                }
                if (sibling.getLeftChild().getColor() === "BLACK" && sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    node = node.getFather();
                } else {
                    if (sibling.getLeftChild().getColor() === "BLACK") {
                        sibling.getRightChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.leftRotate(sibling);
                        sibling = node.getFather().getLeftChild();
                    }
                    sibling.setNodeAsBlack();
                    node.getFather().setNodeAsBlack();
                    sibling.getLeftChild().setNodeAsBlack();
                    this.rightRotate(node.getFather());
                    node = this.root;
                }
            }
        }
        node.setNodeAsBlack();
    }

}
