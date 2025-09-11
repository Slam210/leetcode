/**
 *
 * We will traverse the BST starting at the root, comparing the new value with the current node.
 * If the value is smaller, we go left. Ff larger, we go right. When we find an empty spot, we
 * create a new node and insert it there. By always moving left or right based on comparisons,
 * we preserve the BST property after insertion.
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

export default function insertIntoBST(
  root: TreeNode | null,
  val: number
): TreeNode | null {
  if (root === null) {
    return new TreeNode(val);
  }

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
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

  console.log("Original inorder:", inorder(root));

  insertIntoBST(root, 5);
  console.log("After inserting 5 inorder:", inorder(root));

  insertIntoBST(root, 0);
  console.log("After inserting 0 inorder:", inorder(root));

  insertIntoBST(root, 8);
  console.log("After inserting 8 inorder:", inorder(root));
}

main();

/**
 *
 * Time complexity is O(log(n)) or O(n) in the worst case
 * Space complexity is O(log(n)) or O(n) in the worst case
 *
 */
