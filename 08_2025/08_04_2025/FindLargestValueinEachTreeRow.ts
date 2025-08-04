/**
 *
 * We are tasked with traversing the tree level by level using a queue. For each level,
 * find the maximum value among all nodes at that level. Return an array of these maximum
 * values. Level-order traversal ensures we group nodes by row. At each row, we scan all
 * the nodes to find the largest value and add it to the result array.
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

function largestValues(root: TreeNode | null): number[] {
  if (!root) return [];

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    let levelSize = queue.length;
    let maxVal = -Infinity;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      maxVal = Math.max(maxVal, node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(maxVal);
  }

  return result;
}

function main() {
  const root = new TreeNode(
    1,
    new TreeNode(3, new TreeNode(5), new TreeNode(3)),
    new TreeNode(2, null, new TreeNode(9))
  );

  console.log(largestValues(root));
}

main();

/**
 *
 * Time complexity is O(n) as we hit each node
 * Space complexity is O(w) where w is the width of the largest level
 *
 */
