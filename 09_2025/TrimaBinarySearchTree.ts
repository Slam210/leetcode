/**
 *
 * We want to trim a BST so that only values between low and high remain. Thanks to BST ordering, we can efficiently prune
 * entire subtrees as if a node is too small, discard its left side and if too large, discard its right side.
 * If it falls inside the range, we recursively trim its children and keep it. This ensures the tree remains a
 * valid BST with only the allowed values.
 *
 */

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

function trimBST(
  root: TreeNode | null,
  low: number,
  high: number
): TreeNode | null {
  if (root === null) return null;

  if (root.val < low) {
    return trimBST(root.right, low, high);
  }

  if (root.val > high) {
    return trimBST(root.left, low, high);
  }

  root.left = trimBST(root.left, low, high);
  root.right = trimBST(root.right, low, high);
  return root;
}

function main() {
  const root = new TreeNode(
    3,
    new TreeNode(0, null, new TreeNode(2, new TreeNode(1))),
    new TreeNode(4)
  );

  const trimmed = trimBST(root, 1, 3);
  console.log(JSON.stringify(trimmed));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(h) where h is the height of the tree
 *
 */
