import { Estudent } from "./estudent";
import { RBTree } from "./rbt";

const myRBTree: RBTree = new RBTree();
myRBTree.insert(new Estudent(1, 'Juan', 23, 5));
myRBTree.insert(new Estudent(2, 'Pedro', 23, 3));
myRBTree.insert(new Estudent(5, 'Lola', 23, 7));
myRBTree.insert(new Estudent(3, 'Alice', 23, 2));
myRBTree.insert(new Estudent(4, 'Karen', 23, 4));
myRBTree.insert(new Estudent(6, 'Luis', 23, 6));
myRBTree.insert(new Estudent(7, 'Sebastian', 23, 8));


console.log(myRBTree.search(5)?.getData().showInformation());
myRBTree.printAll();
myRBTree.deleteNode(5);

myRBTree.findInRange(1, 4)
