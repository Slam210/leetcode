/**
 *
 * We want to generate a preorder string representation of a binary tree while preserving its structure.
 * To achieve this, we print each node’s value and enclose its children inside parentheses. We omit empty
 * parentheses unless they are necessary to distinguish between missing left children when a right child
 * exists. By carefully following preorder traversal rules, we ensure the output uniquely identifies the
 * binary tree structure.
 *
 */

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

function tree2str(root: TreeNode | null): string {
  if (!root) return "";
  let result = root.val.toString();

  if (root.left) {
    result += "(" + tree2str(root.left) + ")";
  } else if (root.right) {
    result += "()";
  }

  if (root.right) {
    result += "(" + tree2str(root.right) + ")";
  }

  return result;
}

function main() {
  let root = new TreeNode(1);
  root.left = new TreeNode(2, new TreeNode(4));
  root.right = new TreeNode(3);

  console.log(tree2str(root));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(h) where h is tree height
 *
 */
