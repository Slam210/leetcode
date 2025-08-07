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

function getMinimumDifference(root: TreeNode | null): number {
  let minDiff = Infinity;
  let prev: number | null = null;

  function inOrder(node: TreeNode | null) {
    if (!node) return;

    inOrder(node.left);

    if (prev !== null) {
      minDiff = Math.min(minDiff, Math.abs(node.val - prev));
    }
    prev = node.val;

    inOrder(node.right);
  }

  inOrder(root);
  return minDiff;
}

function main() {
  const root = new TreeNode(4);
  root.left = new TreeNode(2, new TreeNode(1), new TreeNode(3));
  root.right = new TreeNode(6);

  const result = getMinimumDifference(root);
  console.log("Minimum absolute difference:", result);
}

main();
