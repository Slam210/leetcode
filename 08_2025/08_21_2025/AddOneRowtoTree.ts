/**
 *
 * We are asked to insert a new row into a binary tree at a specified depth. If the row is at depth 1, we simply create a new
 * root with the given value and attach the old tree beneath it. Otherwise, we traverse down the tree until we reach nodes at
 * depth - 1, and at each of those nodes, we splice in two new nodes with the given value. The original children get pushed one
 * level lower to become the children of the new nodes. This systematic process ensures that the structure of the tree is preserved
 * while inserting the new row.
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

function addOneRow(
  root: TreeNode | null,
  val: number,
  depth: number
): TreeNode | null {
  if (depth === 1) {
    return new TreeNode(val, root, null);
  }
  const queue: [TreeNode, number][] = [[root!, 1]];

  while (queue.length > 0) {
    const [node, d] = queue.shift()!;
    if (d === depth - 1) {
      const oldLeft = node.left;
      const oldRight = node.right;
      node.left = new TreeNode(val, oldLeft, null);
      node.right = new TreeNode(val, null, oldRight);
    } else {
      if (node.left) queue.push([node.left, d + 1]);
      if (node.right) queue.push([node.right, d + 1]);
    }
  }

  return root;
}

function main() {
  const root = new TreeNode(
    4,
    new TreeNode(2, new TreeNode(3), new TreeNode(1)),
    new TreeNode(6, new TreeNode(5), null)
  );

  const newRoot = addOneRow(root, 1, 2);
  console.log(JSON.stringify(newRoot));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(W) where w is the width of the tree
 *
 */
