/**
 *
 * A Binary Search Tree’s in-order traversal visits nodes in ascending order. To make each node’s value become
 * its original value plus the sum of all greater values, we can instead traverse the tree in reverse in-order,
 * which visits nodes from largest to smallest. While traversing, we keep a running sum of all node values we’ve
 * seen so far; for each node, we add this sum to its value and then update the sum to the new node value. This
 * ensures that when we reach a node, the sum already contains all values greater than it.
 *
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function convertBST(root: TreeNode | null): TreeNode | null {
  let sum = 0;

  function traverse(node: TreeNode | null): void {
    if (!node) return;
    traverse(node.right);
    sum += node.val;
    node.val = sum;
    traverse(node.left);
  }

  traverse(root);
  return root;
}

function main(): void {
  const root = new TreeNode(
    4,
    new TreeNode(1, new TreeNode(0), new TreeNode(2, null, new TreeNode(3))),
    new TreeNode(6, new TreeNode(5), new TreeNode(7, null, new TreeNode(8)))
  );

  const updatedRoot = convertBST(root);
  console.log(JSON.stringify(updatedRoot));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(h)
 *
 */
