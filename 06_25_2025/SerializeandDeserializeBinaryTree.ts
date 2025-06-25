/**
 *
 * Serialization is the process of converting a data structure or object into
 * a sequence of bits so that it can be stored in a file or memory buffer, eventually
 * being reconstructed into the original data structure, with that process being known
 * as deserialization. We are asked to perform this somehow. We can do this by converting the
 * tree to a string at the beginning for serialization using pre-order traversal. When
 * deserializing, we can split the string, and build the tree using the some format.
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

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  const result: string[] = [];

  function dfs(node: TreeNode | null): void {
    if (!node) {
      result.push("null");
      return;
    }
    result.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return result.join(",");
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  const values = data.split(",");
  let index = 0;

  function buildTree(): TreeNode | null {
    const val = values[index++];
    if (val === "null") return null;

    const node = new TreeNode(Number(val));
    node.left = buildTree();
    node.right = buildTree();
    return node;
  }

  return buildTree();
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

const root = new TreeNode(
  1,
  new TreeNode(2),
  new TreeNode(3, new TreeNode(4), new TreeNode(5))
);

const s = serialize(root);
console.log(s);

const tree = deserialize(s);
console.log(serialize(tree));

/**
 *
 * Both serialize and deserialize() have O(n) time complexity
 * Both serialize and deserialzie() have O(n) space compleixty
 *
 */
