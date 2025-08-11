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

function diameterOfBinaryTree(root: TreeNode | null): number {
  let maxDiameter = 0;

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;
    const leftHeight = dfs(node.left);
    const rightHeight = dfs(node.right);
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  dfs(root);
  return maxDiameter;
}

function main(): void {
  const root1 = new TreeNode(1);
  root1.left = new TreeNode(2);
  root1.right = new TreeNode(3);
  root1.left.left = new TreeNode(4);
  root1.left.right = new TreeNode(5);

  const root2 = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4, new TreeNode(6), null), new TreeNode(5)),
    new TreeNode(3)
  );

  console.log("Diameter Example 1:", diameterOfBinaryTree(root1));
  console.log("Diameter Example 2:", diameterOfBinaryTree(root2));
}

main();
