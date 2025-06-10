/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  const inorderMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  let postIndex = postorder.length - 1;

  function build(inStart, inEnd) {
    if (inStart > inEnd) return null;

    const rootVal = postorder[postIndex--];
    const root = newTreeNode(rootVal);

    const rootIndex = inorderMap.get(rootVal);

    root.right = build(rootIndex + 1, inEnd);
    root.left = build(inStart, rootIndex - 1);

    return root;
  }

  return build(0, inorder.length - 1);
};
