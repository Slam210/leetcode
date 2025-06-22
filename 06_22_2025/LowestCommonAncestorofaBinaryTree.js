/*

To find the lowest common ancestor of two nodes p and q in a binary tree we
perform a post-order traversal (left → right → root). As we visit nodes
if a node is null, return null. If the node is p or q, return the node itself.
Recurse into left and right children. If both left and right return non-null, it means 
one target is in the left subtree, the other in the right so the current node
is the lowest common ancestor

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left !== null && right !== null) {
    return root;
  }

  return left !== null ? left : right;
};

/*

Run time is O(n)
Space time is O(h)

*/
