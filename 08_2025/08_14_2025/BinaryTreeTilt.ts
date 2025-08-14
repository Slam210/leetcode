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

function findTilt(root: TreeNode | null): number {
  let totalTilt = 0;

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;
    let leftSum = dfs(node.left);
    let rightSum = dfs(node.right);
    let tilt = Math.abs(leftSum - rightSum);
    totalTilt += tilt;
    return leftSum + rightSum + node.val;
  }

  dfs(root);

  return totalTilt;
}

function main() {
  let root = new TreeNode(1, new TreeNode(2), new TreeNode(3));
  console.log(findTilt(root));
}

main();
