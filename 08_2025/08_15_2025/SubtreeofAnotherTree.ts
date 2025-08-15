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

function isSameTree(a: TreeNode | null, b: TreeNode | null): boolean {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.val !== b.val) return false;
  return isSameTree(a.left, b.left) && isSameTree(a.right, b.right);
}

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  if (!subRoot) return true;
  if (!root) return false;
  if (isSameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function main() {
  const root = new TreeNode(3);
  root.left = new TreeNode(4, new TreeNode(1), new TreeNode(2));
  root.right = new TreeNode(5);

  const subRoot = new TreeNode(4, new TreeNode(1), new TreeNode(2));

  console.log(isSubtree(root, subRoot));
}

main();
