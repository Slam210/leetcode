class _Node {
  val: number;
  children: _Node[];

  constructor(val?: number) {
    this.val = val === undefined ? 0 : val;
    this.children = [];
  }
}

function postorder(root: _Node | null): number[] {
  const result: number[] = [];

  function dfs(node: _Node | null) {
    if (!node) return;
    for (const child of node.children) {
      dfs(child);
    }
    result.push(node.val);
  }

  dfs(root);
  return result;
}
