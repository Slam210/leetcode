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

function findSecondMinimumValue(root: TreeNode | null): number {
  if (!root) return -1;

  let minVal = root.val;
  let secondMin = Infinity;

  function dfs(node: TreeNode | null): void {
    if (!node) return;

    if (node.val > minVal && node.val < secondMin) {
      secondMin = node.val;
    }

    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return secondMin === Infinity ? -1 : secondMin;
}

function main() {
  const root = new TreeNode(2);
  root.left = new TreeNode(2);
  root.right = new TreeNode(5, new TreeNode(5), new TreeNode(7));

  console.log(findSecondMinimumValue(root));
}

main();
