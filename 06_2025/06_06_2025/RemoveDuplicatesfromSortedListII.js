/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  const dummy = new ListNode(0);
  dummy.next = head;

  let prev = dummy;
  let current = head;

  while (current) {
    if (current.next && current.val === current.next.val) {
      const dupVal = current.val;

      while (current && current.val === dupVal) {
        current = current.next;
      }

      prev.next = current;
    } else {
      prev = current;
      current = current.next;
    }
  }

  return dummy.next;
};

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Helper to convert array to ListNode
function arrayToList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (let num of arr) {
    current.next = new ListNode(num);
    current = current.next;
  }
  return dummy.next;
}

// Helper to print list as array
function printList(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

// Example
const input = arrayToList([1, 2, 3, 3, 4, 4, 5]);
const output = deleteDuplicates(input);
console.log(printList(output)); // [1, 2, 5]
