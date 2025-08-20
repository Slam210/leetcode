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

function mergeTrees(
  root1: TreeNode | null,
  root2: TreeNode | null
): TreeNode | null {
  if (!root1) return root2;
  if (!root2) return root1;

  let merged = new TreeNode(root1.val + root2.val);
  merged.left = mergeTrees(root1.left, root2.left);
  merged.right = mergeTrees(root1.right, root2.right);

  return merged;
}

function main() {
  let root1 = new TreeNode(
    1,
    new TreeNode(3, new TreeNode(5)),
    new TreeNode(2)
  );

  let root2 = new TreeNode(
    2,
    new TreeNode(1, null, new TreeNode(4)),
    new TreeNode(3, null, new TreeNode(7))
  );

  let mergedRoot = mergeTrees(root1, root2);

  function preorder(node: TreeNode | null): number[] {
    if (!node) return [];
    return [node.val, ...preorder(node.left), ...preorder(node.right)];
  }

  console.log(preorder(mergedRoot));
}

main();
