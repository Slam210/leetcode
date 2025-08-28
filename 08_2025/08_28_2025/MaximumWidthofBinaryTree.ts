/**
 *
 * We need to find the maximum width of a binary tree, where width is measured as if the tree were complete,
 * counting nulls between nodes. We achieve this by performing a level-order traversal and assigning
 * indices to nodes like in a complete binary tree. For each level, we compute the width using the difference
 * between the first and last indices. The maximum of these widths across all levels is the result.
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

function widthOfBinaryTree(root: TreeNode | null): number {
  if (!root) return 0;

  let maxWidth = 0;
  const queue: [TreeNode, number][] = [[root, 0]];

  while (queue.length > 0) {
    const size = queue.length;
    const levelStart = queue[0][1];
    let first = 0,
      last = 0;

    for (let i = 0; i < size; i++) {
      const [node, idx] = queue.shift()!;
      const normalizedIdx = idx - levelStart;

      if (i === 0) first = normalizedIdx;
      if (i === size - 1) last = normalizedIdx;

      if (node.left) queue.push([node.left, normalizedIdx * 2]);
      if (node.right) queue.push([node.right, normalizedIdx * 2 + 1]);
    }

    maxWidth = Math.max(maxWidth, last - first + 1);
  }

  return maxWidth;
}

function main() {
  const root = new TreeNode(
    1,
    new TreeNode(3, new TreeNode(5), new TreeNode(3)),
    new TreeNode(2, null, new TreeNode(9))
  );

  console.log(widthOfBinaryTree(root));
}

main();
