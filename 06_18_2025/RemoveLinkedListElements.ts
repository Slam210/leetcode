/*

The intuition behind this code is with the use of a dummy node. We need to
only check the next value of the list, and if it matches the value, then
we set the next pointer to next.next

*/

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeElements(
  head: ListNode | null,
  val: number
): ListNode | null | any {
  const dummy = new ListNode(0, head);
  let current = dummy;

  while (current.next !== null) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return dummy.next;
}

function arrayToList(arr: number[]): ListNode | null {
  const dummy = new ListNode(0);
  let current = dummy;
  for (const num of arr) {
    current.next = new ListNode(num);
    current = current.next;
  }
  return dummy.next;
}

function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  while (head !== null) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

const list = arrayToList([6, 1, 2, 6, 3, 4, 5, 6]);
const newList = removeElements(list, 6);
console.log(listToArray(newList));

/*

Time complexity is O(n) as we traverse the list only once
Space complexity is O(1) as we only use pointers

*/
