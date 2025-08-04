/**
 *
 * We're given the root of a binary tree. You need to return the leftmost value in the
 * last row (deepest level) of the tree. To find the leftmost node at the deepest level,
 * we need to traverse the tree level by level (BFS), and return the first node (leftmost)
 * at the last level.
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

function findBottomLeftValue(root: TreeNode | null): number {
  if (!root) throw new Error("Tree is empty");

  const queue: TreeNode[] = [root];
  let leftmost = root.val;

  while (queue.length > 0) {
    const levelSize = queue.length;
    leftmost = queue[0].val;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return leftmost;
}

function main() {
  const root = new TreeNode(2, new TreeNode(1), new TreeNode(3));
  console.log(findBottomLeftValue(root));

  const root2 = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4)),
    new TreeNode(3, new TreeNode(5, new TreeNode(7)), new TreeNode(6))
  );
  console.log(findBottomLeftValue(root2));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(w) where w is the width of the tree
 *
 */
