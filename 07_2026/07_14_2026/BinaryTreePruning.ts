/*
 * @lc app=leetcode id=814 lang=typescript
 *
 * [814] Binary Tree Pruning
 */
// @lc code=start

/**
 * Definition for a binary tree node.
 */ 
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
  }
}

function pruneTree(root: TreeNode | null): TreeNode | null {
  function prune(node: TreeNode | null): TreeNode | null {
    if (node === null) {
      return null;
    }

    node.left = prune(node.left);
    node.right = prune(node.right);

    if (node.val === 0 && node.left === null && node.right === null) {
      return null;
    }

    return node;
  }

  return prune(root);
}
// @lc code=end