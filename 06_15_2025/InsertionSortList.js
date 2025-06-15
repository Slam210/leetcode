/*

Since it's a linked list, we only need to change pointers, not the element like with arrays.
To do this, we can use a dummy node to perform instertions.
We can traverse the original last and for each node, instert it into the correct place in the sorted part of the list.

*/

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
var insertionSortList = function (head) {
  if (!head) {
    return null;
  }

  let dummy = new ListNode(0);
  let curr = head;

  while (curr !== null) {
    let prev = dummy;
    let nextTemp = curr.next;

    while (prev.next !== null && prev.next.val < curr.val) {
      prev = prev.next;
    }

    curr.next = prev.next;
    prev.next = curr;

    curr = nextTemp;
  }

  return dummy.next;
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
  while (curr !== null) {
    result.push(curr.val);
    curr = curr.next;
  }
  console.log(result.join(" -> "));
}

let head = buildList([4, 2, 1, 3]);
let sortedHead = insertionSortList(head);
printList(sortedHead);

/*

Run time is O(n²) in the worst case
Space time is O(1) since we're sorting in place

*/
