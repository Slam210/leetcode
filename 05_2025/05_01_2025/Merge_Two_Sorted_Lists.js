/*

Use a third list and iterate till one of the lists are null, setting next of the third list to the remainder of the second list

*/

// Definition for singly-linked list.
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Helper function to create a linked list from an array
function createLinkedList(arr) {
  let list3 = new ListNode();
  let current = list3;
  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return list3.next;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let list3 = new ListNode(-1); // list3 head node
  let current = list3;

  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // At least one of the lists is now null
  current.next = list1 !== null ? list1 : list2;

  return list3.next;
};

// Example lists
let list1 = createLinkedList([1, 3, 5]);
let list2 = createLinkedList([2, 4, 6]);

const list3 = mergeTwoLists(list1, list2);
console.log(list3);
