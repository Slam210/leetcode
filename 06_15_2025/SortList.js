/*

The intuition behind this problem is to use merge sort.
The first step is to divide the list into 2 halves recursibly.
We then sort the halves.
Merge the two sorted halves as we return up.

*/

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function merge(l1, l2) {
  let dummy = new ListNode(0);
  let tail = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }

  tail.next = l1 || l2;
  return dummy.next;
}

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
var sortList = function (head) {
  if (!head || !head.next) return head;

  let slow = head;
  let fast = head;
  let prev = null;

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  prev.next = null;

  let l1 = sortList(head);
  let l2 = sortList(slow);

  return merge(l1, l2);
};

function buildList(arr) {
  let dummy = new ListNode(0);
  let curr = dummy;
  for (let val of arr) {
    curr.next = new ListNode(val);
    curr = curr.next;
  }
  return dummy.next;
}

function printList(head) {
  let curr = head;
  let result = [];
  while (curr) {
    result.push(curr.val);
    curr = curr.next;
  }
  console.log(result.join(" -> "));
}

let head = buildList([4, 2, 1, 3]);
let sorted = sortList(head);
printList(sorted);

/*

Run time is O(nlogn) since we go through the list before using recursion to sort
Space time is O(logn) since we use recursion stacks

*/
