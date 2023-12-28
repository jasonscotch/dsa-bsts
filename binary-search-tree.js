class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);
    function insertNode(node, newNode) {
      if (!node) {
        return newNode;
      }
      if (val < node.val) {
        node.left = insertNode(node.left, newNode);
      } else {
        node.right = insertNode(node.right, newNode);
      }
      return node;
    }
    this.root = insertNode(this.root, newNode);
    return this;
    
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while (current) {
      if (current.val === val)
        return current;
      current = val < current.val
                ? current.left
                : current.right;
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    function findNode(node, target) {
      if (!node) {
        return undefined;
      }
      if (target === node.val) {
        return node;
      } else if (target < node.val) {
        return findNode(node.left, target);
      } else {
        return findNode(node.right, target);
      }
    }
    return findNode(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const visitedNodes = [];

    function traverse(node) {
      if (node) {
        visitedNodes.push(node.val);
        traverse(node.left);
        traverse(node.right);
      }
    }
    traverse(this.root);

    return visitedNodes;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const visitedNodes = [];

    function traverse(node) {
      if (node) {
        traverse(node.left);
        visitedNodes.push(node.val);
        traverse(node.right);
      }
    }
    traverse(this.root);

    return visitedNodes;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const visitedNodes = [];

    function traverse(node) {
      if (node) {
        traverse(node.left);
        traverse(node.right);
        visitedNodes.push(node.val);
      }
    }
    traverse(this.root);

    return visitedNodes;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const visitedNodes = [];
    const queue = [];

    if (!this.root) {
      return visitedNodes;
    }
    queue.push(this.root);

    while (queue.length > 0) {
      const current = queue.shift();
      visitedNodes.push(current.val);

      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    return visitedNodes;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    this.root = removeNode(this.root, val);
    function removeNode(node, val) {
      if (node === null) {
        return null;
      }
      if (val < node.val) {
        node.left = removeNode(node.left, val);
      } else if (val > node.val) {
        node.right = removeNode(node.right, val);
      } else {
        if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        }
        node.val = findMinVal(node.right);
        node.right = removeNode(node.right, node.val);
      }
      return node;
    }
    function findMinVal(node) {
      while (node.left !== null) {
        node = node.left;
      }
      return node.val;
    }
  }
}

module.exports = BinarySearchTree;
