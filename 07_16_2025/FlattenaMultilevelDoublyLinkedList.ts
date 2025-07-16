/**
 *
 * We're given a multilevel doubly linked list where each node has val, next , prev and child.
 * We must flatten this structure into a single-level doubly linked list in-place, ensuring
 * that each child list is inserted immediately after its parent node and all child pointers are
 * set to null. This is like doing a depth-first traversal (DFS) of a tree, but in a doubly linked list form.
 *
 */

class _Node {
  val: number;
  prev: _Node | null;
  next: _Node | null;
  child: _Node | null;

  constructor(
    val?: number,
    prev?: _Node | null,
    next?: _Node | null,
    child?: _Node | null
  ) {
    this.val = val ?? 0;
    this.prev = prev ?? null;
    this.next = next ?? null;
    this.child = child ?? null;
  }
}

function flatten(head: _Node | null): _Node | null {
  if (!head) return null;

  function flattenDFS(node: _Node): _Node {
    let current: _Node | null = node;
    let last: _Node = node;

    while (current) {
      const next: _Node | null = current.next;

      if (current.child) {
        const childHead = current.child;
        const childTail = flattenDFS(childHead);

        current.next = childHead;
        childHead.prev = current;
        current.child = null;

        if (next) {
          childTail.next = next;
          next.prev = childTail;
        }

        last = childTail;
        current = next;
      } else {
        last = current;
        current = current.next;
      }
    }

    return last;
  }

  flattenDFS(head);
  return head;
}

function main(): void {
  const head = new _Node(1);
  const node2 = new _Node(2);
  const node3 = new _Node(3);
  const node4 = new _Node(4);
  const node5 = new _Node(5);
  const node6 = new _Node(6);
  const node7 = new _Node(7);
  const node8 = new _Node(8);

  head.next = node2;
  node2.prev = head;
  node2.next = node3;
  node3.prev = node2;
  node3.next = node4;
  node4.prev = node3;

  node2.child = node5;
  node5.next = node6;
  node6.prev = node5;

  node6.child = node7;
  node7.next = node8;
  node8.prev = node7;

  const flat = flatten(head);

  let current: _Node | null = flat;
  const values: number[] = [];
  while (current) {
    values.push(current.val);
    current = current.next;
  }

  console.log("Flattened:", values);
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(d)
 *
 */
