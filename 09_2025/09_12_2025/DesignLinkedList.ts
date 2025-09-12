/**
 *
 * We can think of the linked list as a chain of connected nodes where each node stores a value and a reference
 * to the next node. To implement operations, we manage this chain carefully, traversing for access, inserting
 * new links when adding, and bypassing nodes when deleting. By tracking both the head and the size of the list,
 * we can efficiently determine whether operations are valid and perform them step by step.
 *
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export default class MyLinkedList {
  private head: ListNode | null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  get(index: number): number {
    if (index < 0 || index >= this.size) return -1;
    let curr = this.head;
    for (let i = 0; i < index; i++) {
      curr = curr!.next;
    }
    return curr!.val;
  }

  addAtHead(val: number): void {
    const node = new ListNode(val, this.head);
    this.head = node;
    this.size++;
  }

  addAtTail(val: number): void {
    const node = new ListNode(val);
    if (!this.head) {
      this.head = node;
    } else {
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = node;
    }
    this.size++;
  }

  addAtIndex(index: number, val: number): void {
    if (index < 0 || index > this.size) return;

    if (index === 0) {
      this.addAtHead(val);
      return;
    }
    if (index === this.size) {
      this.addAtTail(val);
      return;
    }

    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev!.next;
    }
    const node = new ListNode(val, prev!.next);
    prev!.next = node;
    this.size++;
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.size) return;

    if (index === 0) {
      this.head = this.head!.next;
    } else {
      let prev = this.head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev!.next;
      }
      prev!.next = prev!.next!.next;
    }
    this.size--;
  }
}

function main(): void {
  const list = new MyLinkedList();
  list.addAtHead(1);
  list.addAtTail(3);
  list.addAtIndex(1, 2);
  console.log(list.get(1));
  list.deleteAtIndex(1);
  console.log(list.get(1));
}

main();

/**
 *
 * Average time complexity is O(n)
 * Space complexuty is O(n)
 *
 *
 */
