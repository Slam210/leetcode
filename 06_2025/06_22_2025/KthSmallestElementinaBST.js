/*

The in-order traversal of the tree (left → root → right) gives the 
nodes in sorted ascending order. So the k-th smallest element is simply 
the k-th node visited during an in-order traversal.

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  const stack = [];
  let current = root;

  while (current !== null || stack.length > 0) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    k--;

    if (k === 0) return current.val;

    current = current.right;
  }

  return -1;
};

/*

Time complexity is O(H + k) where H is the levels, and k is the nodes rightward
Space compleixty is O(H)

*/
