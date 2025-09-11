// Definition for a binary tree node.
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

export default function searchBST(
  root: TreeNode | null,
  val: number
): TreeNode | null {
  if (root === null) return null;
  if (root.val === val) return root;
  if (val < root.val) return searchBST(root.left, val);
  return searchBST(root.right, val);
}

function inorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...inorder(root.left), root.val, ...inorder(root.right)];
}

function main(): void {
  const root = new TreeNode(
    4,
    new TreeNode(2, new TreeNode(1), new TreeNode(3)),
    new TreeNode(7)
  );

  console.log(
    "Searching for 2 → subtree inorder:",
    inorder(searchBST(root, 2))
  );
  console.log(
    "Searching for 7 → subtree inorder:",
    inorder(searchBST(root, 7))
  );
  console.log("Searching for 5 →", searchBST(root, 5));
}

main();
