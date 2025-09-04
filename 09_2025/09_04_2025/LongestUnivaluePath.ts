/**
 *
 * We traverse the tree with DFS. At each node, we ask “what is the longest univalue path starting at this node and going downwards?”
 * If the left child matches the node, we can extend into the left path, same for the right child. The longest path through this node
 * may combine both left and right extensions. We keep track of a global maximum. Finally, we return the maximum number of edges found.
 *
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function longestUnivaluePath(root: TreeNode | null): number {
  let maxLen = 0;

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;
    const left = dfs(node.left);
    const right = dfs(node.right);

    let leftPath = 0,
      rightPath = 0;
    if (node.left && node.left.val === node.val) {
      leftPath = left + 1;
    }
    if (node.right && node.right.val === node.val) {
      rightPath = right + 1;
    }

    maxLen = Math.max(maxLen, leftPath + rightPath);
    return Math.max(leftPath, rightPath);
  }

  dfs(root);
  return maxLen;
}

function main(): void {
  const root1 = new TreeNode(
    5,
    new TreeNode(4, new TreeNode(1), new TreeNode(1)),
    new TreeNode(5, null, new TreeNode(5))
  );
  console.log("Result 1:", longestUnivaluePath(root1));

  const root2 = new TreeNode(
    1,
    new TreeNode(4, new TreeNode(4), new TreeNode(4)),
    new TreeNode(5, null, new TreeNode(5))
  );
  console.log("Result 2:", longestUnivaluePath(root2));
}

main();

export { longestUnivaluePath };
