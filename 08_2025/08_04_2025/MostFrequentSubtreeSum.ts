/**
 *
 * We are given the root of a binary tree. Our task is to compute the subtree sum for each node
 * and return the value(s) that appear most frequently. A subtree sum is the sum of all values
 * in a subtree (including the node itself). If multiple subtree sums occur with the highest
 * frequency, return all of them in any order. We need to explore all subtrees and compute their
 * total sums. This naturally suggests a post-order traversal, where we first calculate the sum
 * of the left subtree, then the right subtree, and then add the current node’s value.
 *
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

function findFrequentTreeSum(root: TreeNode | null): number[] {
  const sumFrequency = new Map<number, number>();
  let maxFreq = 0;

  function postOrder(node: TreeNode | null): number {
    if (!node) return 0;
    const left = postOrder(node.left);
    const right = postOrder(node.right);
    const sum = left + right + node.val;

    const freq = (sumFrequency.get(sum) || 0) + 1;
    sumFrequency.set(sum, freq);
    maxFreq = Math.max(maxFreq, freq);

    return sum;
  }

  postOrder(root);

  const result: number[] = [];
  for (const [sum, freq] of sumFrequency.entries()) {
    if (freq === maxFreq) result.push(sum);
  }

  return result;
}

function main() {
  const root = new TreeNode(5, new TreeNode(2), new TreeNode(-3));
  console.log(findFrequentTreeSum(root));

  const root2 = new TreeNode(5, new TreeNode(2), new TreeNode(-5));
  console.log(findFrequentTreeSum(root2));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
