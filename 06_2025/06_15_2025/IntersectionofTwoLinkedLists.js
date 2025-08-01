/*

The idea behind this problem is that the two lists share an indentical end if they are linked.
Therefore, we only need to find the difference in length between the list sizes.
From there we traverse both lists by what they reference, and not the value.
If the two lists reference the same thing, then we return that as the intersection.
Otherwise we return null at the end.

*/

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function getLength(head) {
  let len = 0;
  while (head !== null) {
    len++;
    head = head.next;
  }
  return len;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let lenA = getLength(headA);
  let lenB = getLength(headB);

  while (lenA > lenB) {
    headA = headA.next;
    lenA--;
  }

  while (lenB > lenA) {
    headB = headB.next;
    lenB--;
  }

  while (headA !== null && headB !== null) {
    if (headA === headB) {
      return headA;
    }
    headA = headA.next;
    headB = headB.next;
  }

  return null;
};

const intersect = new ListNode(8);
intersect.next = new ListNode(9);

const listA = new ListNode(1);
listA.next = new ListNode(2);
listA.next.next = intersect;

const listB = new ListNode(3);
listB.next = new ListNode(4);
listB.next.next = intersect;

const result = getIntersectionNode(listA, listB);
console.log(result ? result.val : "No intersection");

/*

Run Time is O(m+n) where m and n are the lengths of listA and listB since we traverse each list twice.
Space time is O(1) since we don't create any extra data structures.

*/
