/**
 *
 * We're given an N-ary tree (each node can have multiple children). We need to return a 2D
 * array where each subarray contains the values of the nodes at that level in the tree, from
 * top to bottom. This is a classic level-order traversal (BFS) on a tree, generalized to an N-ary tree.
 *
 */

class _Node {
  val: number;
  children: _Node[];

  constructor(val: number) {
    this.val = val;
    this.children = [];
  }
}

function levelOrder(root: _Node | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  const queue: _Node[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      queue.push(...node.children);
    }

    result.push(currentLevel);
  }

  return result;
}

function main(): void {
  const root = new _Node(1);
  const child2 = new _Node(2);
  const child3 = new _Node(3);
  const child4 = new _Node(4);
  const child5 = new _Node(5);
  const child6 = new _Node(6);

  root.children.push(child3, child2, child4);
  child3.children.push(child5, child6);
  console.log(levelOrder(root));
}

main();

/**
 *
 * Run time is O(n)
 * Space complexity is O(n)
 *
 */
