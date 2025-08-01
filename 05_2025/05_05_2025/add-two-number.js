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

function extractNumberFromList(head) {
  let digits = [];

  while (head !== null) {
    digits.push(head.val);
    head = head.next;
  }

  return parseInt(digits.reverse().join(""), 10);
}

function splitNumberToDigits(num) {
  return num.toString().split("").map(Number);
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const number1 = extractNumberFromList(l1);
  const number2 = extractNumberFromList(l2);
  const resultArray = splitNumberToDigits(number1 + number2).reverse();
  const number3 = number1 + number2;
  console.log(number3);
  return createLinkedList(resultArray);
};

// Example lists
let list1 = createLinkedList([
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1,
]);
let list2 = createLinkedList([5, 6, 4]);

const list3 = addTwoNumbers(list1, list2);
console.log(list3);

/*

Optimal Solution is to tracerse both lists simultaniuosly, using in place addition with carry over using
floor in order to keep track each what new nodes need to be added

var addTwoNumbers = function(l1, l2) {
    let dummyHead = new ListNode(0);
    let current = dummyHead;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry > 0) {
        const val1 = l1 !== null ? l1.val : 0;
        const val2 = l2 !== null ? l2.val : 0;

        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);

        current = current.next;
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }

    return dummyHead.next;
};


*/
