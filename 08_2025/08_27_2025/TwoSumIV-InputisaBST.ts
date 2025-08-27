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

function findTarget(root: TreeNode | null, k: number): boolean {
  const seen = new Set<number>();

  function dfs(node: TreeNode | null): boolean {
    if (!node) return false;

    if (seen.has(k - node.val)) return true;
    seen.add(node.val);

    return dfs(node.left) || dfs(node.right);
  }

  return dfs(root);
}

function main() {
  const root = new TreeNode(
    5,
    new TreeNode(3, new TreeNode(2), new TreeNode(4)),
    new TreeNode(6, null, new TreeNode(7))
  );

  console.log(findTarget(root, 9));
  console.log(findTarget(root, 28));
}

main();
