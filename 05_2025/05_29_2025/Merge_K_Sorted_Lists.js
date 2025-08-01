class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(node) {
    this.heap.push(node);
    this.bubbleUp();
  }

  bubbleUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.heap[parent].val <= this.heap[i].val) break;
      [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
      i = parent;
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length !== 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  sinkDown(i) {
    const length = this.heap.length;
    const node = this.heap[i];

    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < length && this.heap[left].val < this.heap[smallest].val)
        smallest = left;
      if (right < length && this.heap[right].val < this.heap[smallest].val)
        smallest = right;
      if (smallest === i) break;

      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }

  size() {
    return this.heap.length;
  }
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function mergeKLists(lists) {
  const heap = new MinHeap();

  // Push initial nodes into heap
  for (let node of lists) {
    if (node) heap.insert(node);
  }

  // Create a dummy head for result
  const dummy = new ListNode(0);
  let current = dummy;

  // While heap is not empty
  while (heap.size() > 0) {
    const minNode = heap.extractMin();
    current.next = minNode;
    current = current.next;

    if (minNode.next) heap.insert(minNode.next);
  }

  return dummy.next;
}

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
let list2 = arrayToList([1, 3, 4]);
let list3 = arrayToList([2, 6]);

let result = mergeKLists([list1, list2, list3]);

// Print result
while (result) {
  console.log(result.val);
  result = result.next;
}
