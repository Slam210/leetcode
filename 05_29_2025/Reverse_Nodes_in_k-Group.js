function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  // Helper to get the kth node from current
  function getKthNode(curr, k) {
    while (curr && k > 0) {
      curr = curr.next;
      k--;
    }
    return curr;
  }

  const dummy = new ListNode(0);
  dummy.next = head;

  let groupPrev = dummy;

  while (true) {
    let kth = getKthNode(groupPrev, k);
    if (!kth) break;

    let groupNext = kth.next;

    // Reverse the group
    let prev = groupNext;
    let curr = groupPrev.next;

    while (curr !== groupNext) {
      let temp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }

    let temp = groupPrev.next; // old head becomes tail
    groupPrev.next = kth;
    groupPrev = temp;
  }

  return dummy.next;
};

// Convert array to list
function arrayToList(arr) {
  let dummy = new ListNode(0);
  let current = dummy;
  for (let num of arr) {
    current.next = new ListNode(num);
    current = current.next;
  }
  return dummy.next;
}

// Print list
function printList(head) {
  let curr = head;
  let result = [];
  while (curr) {
    result.push(curr.val);
    curr = curr.next;
  }
  console.log(result.join(" -> "));
}

let head = arrayToList([1, 2, 3, 4, 5]);
let k = 3;
let result = reverseKGroup(head, k);
printList(result); // Output: 3 -> 2 -> 1 -> 4 -> 5
