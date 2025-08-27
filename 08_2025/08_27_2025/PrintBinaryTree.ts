/**
 *
 * To construct a 2D matrix of the tree, we first compute its height to know the number of rows and columns.
 * Then, we initialize a matrix filled with "". Using recursion, we place each node: the root in the center,
 * and for each node, calculate its children’s positions using an offset determined by the remaining height.
 * This approach ensures all nodes are placed in their correct visual positions in the matrix.
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

function printTree(root: TreeNode | null): string[][] {
  if (!root) return [];

  function getHeight(node: TreeNode | null): number {
    if (!node) return -1;
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  }

  const height = getHeight(root);
  const rows = height + 1;
  const cols = Math.pow(2, height + 1) - 1;

  const res: string[][] = Array.from({ length: rows }, () =>
    Array(cols).fill("")
  );

  function fill(node: TreeNode | null, row: number, col: number) {
    if (!node) return;
    res[row][col] = node.val.toString();
    const offset = Math.pow(2, height - row - 1);
    if (node.left) fill(node.left, row + 1, col - offset);
    if (node.right) fill(node.right, row + 1, col + offset);
  }

  fill(root, 0, Math.floor((cols - 1) / 2));
  return res;
}

function main() {
  const root = new TreeNode(
    1,
    new TreeNode(2, null, new TreeNode(4)),
    new TreeNode(3)
  );

  const matrix = printTree(root);
  matrix.forEach((row) => console.log(row.join(" ")));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(H)
 *
 */
