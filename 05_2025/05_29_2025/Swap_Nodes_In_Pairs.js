class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
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
var swapPairs = function (head) {
  let dummy = new ListNode(0);
  dummy.next = head;

  let prev = dummy;

  while (prev.next && prev.next.next) {
    let a = prev.next; // first node
    let b = a.next; // second node

    // Swapping
    prev.next = b;
    a.next = b.next;
    b.next = a;

    // Move prev two nodes ahead
    prev = a;
  }

  return dummy.next;
};

function arrayToList(arr) {
  const dummy = new ListNode(0);
  let curr = dummy;
  for (let num of arr) {
    curr.next = new ListNode(num);
    curr = curr.next;
  }
  return dummy.next;
}

let list1 = arrayToList([1, 4, 5]);
console.log(swapPairs(list1));
