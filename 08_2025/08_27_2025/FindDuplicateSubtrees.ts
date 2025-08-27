/**
 *
 * We want to detect duplicate subtrees in a binary tree by uniquely representing each subtree using a serialization.
 * We’ll do a post-order traversal where each subtree returns a string that encodes its structure and node values.
 * By storing these serializations in a map, we can track how many times each subtree has appeared. If a serialization
 * is seen more than once, that means we’ve found a duplicate, and we add its root to our results. This guarantees we
 * capture only unique duplicates.
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

function findDuplicateSubtrees(root: TreeNode | null): Array<TreeNode | null> {
  const map: Map<string, number> = new Map();
  const result: Array<TreeNode | null> = [];

  function serialize(node: TreeNode | null): string {
    if (!node) return "#";
    const left = serialize(node.left);
    const right = serialize(node.right);
    const serial = `${node.val},${left},${right}`;
    const count = (map.get(serial) || 0) + 1;
    map.set(serial, count);
    if (count === 2) {
      result.push(node);
    }
    return serial;
  }

  serialize(root);
  return result;
}

function main() {
  const root = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4)),
    new TreeNode(3, new TreeNode(2, new TreeNode(4)), new TreeNode(4))
  );

  const duplicates = findDuplicateSubtrees(root);
  console.log(
    "Duplicate Subtrees Roots:",
    duplicates.map((node) => node?.val)
  );
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
