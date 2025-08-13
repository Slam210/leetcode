class _Node {
  val: number;
  children: _Node[];
  constructor(val?: number, children?: _Node[]) {
    this.val = val === undefined ? 0 : val;
    this.children = children === undefined ? [] : children;
  }
}

function maxDepth(root: _Node | null): number {
  if (!root) return 0;
  if (root.children.length === 0) return 1;

  let maxChildDepth = 0;
  for (const child of root.children) {
    maxChildDepth = Math.max(maxChildDepth, maxDepth(child));
  }
  return 1 + maxChildDepth;
}

function main(): void {
  const node5 = new _Node(5);
  const node6 = new _Node(6);
  const node3 = new _Node(3, [node5, node6]);
  const node2 = new _Node(2);
  const node4 = new _Node(4);
  const root = new _Node(1, [node3, node2, node4]);

  console.log(maxDepth(root));
}

main();
