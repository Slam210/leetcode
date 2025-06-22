/*

Since we can’t go backwards, we can’t update the .next of the previous node.  
Instead, we copy the next node’s value into the current node and delete the next node instead.  
This trick works because all values are unique, so it’s safe to overwrite.ß

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  if (node === null || node.next === null) return;
  node.val = node.next.val;
  node.next = node.next.next;
};

/*

Run time is O(1)
Space time is O(1)

*/
