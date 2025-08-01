/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  const inorderMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  function build(preStart, preEnd, inStart, inEnd) {
    if (preStart > preEnd) return null;

    const rootVal = preorder[preStart];
    const root = new TreeNode(rootVal);

    const rootIndex = inorderMap.get(rootVal);

    const leftSize = rootIndex - inStart;

    root.left = build(
      preStart + 1,
      preStart + leftSize,
      inStart,
      rootIndex - 1
    );
    root.right = build(preStart + leftSize + 1, preEnd, rootIndex + 1, inEnd);

    return root;
  }

  return build(0, preorder.length - 1, 0, inorder.length - 1);
};
