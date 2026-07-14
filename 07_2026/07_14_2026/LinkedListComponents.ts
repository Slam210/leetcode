/*
 * @lc app=leetcode id=817 lang=typescript
 *
 * [817] Linked List Components
 */
// @lc code=start

/**
 * Definition for singly-linked list.
 */
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function numComponents(head: ListNode | null, nums: number[]): number {
  const values = new Set(nums);

  let count = 0;
  let current = head;

  while (current !== null) {
    if (values.has(current.val)) {
      if (current.next === null || !values.has(current.next.val)) {
        count++;
      }
    }

    current = current.next;
  }

  return count;
}
// @lc code=end