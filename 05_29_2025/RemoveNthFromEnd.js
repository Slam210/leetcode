// Definition for singly-linked list.
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;

  // Move fast pointer n steps ahead
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  // Move both fast and slow until fast.next is null
  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  // Remove the node
  slow.next = slow.next.next;

  return dummy.next;
};

// Helper to create a linked list from an array
function createLinkedList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

// Helper to print linked list
function printLinkedList(head) {
  const result = [];
  while (head !== null) {
    result.push(head.val);
    head = head.next;
  }
  console.log(result.join(" -> "));
}

const head = createLinkedList([1, 2, 3, 4, 5]);
const newHead = removeNthFromEnd(head, 2);
printLinkedList(newHead);
