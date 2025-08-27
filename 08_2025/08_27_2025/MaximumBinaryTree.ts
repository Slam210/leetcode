/**
 *
 * To build a maximum binary tree, we find the maximum element in the array, make it the root, and recursively apply the
 * same process to the subarrays on its left and right. Each recursive call constructs a subtree from a smaller portion of
 * the array. By repeating this process, we eventually construct the full tree with the maximum values placed at the top and
 * smaller values distributed in left and right subtrees.
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

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;

  let maxIndex = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[maxIndex]) {
      maxIndex = i;
    }
  }

  const root = new TreeNode(nums[maxIndex]);
  root.left = constructMaximumBinaryTree(nums.slice(0, maxIndex));
  root.right = constructMaximumBinaryTree(nums.slice(maxIndex + 1));

  return root;
}

function main() {
  const nums = [3, 2, 1, 6, 0, 5];
  const root = constructMaximumBinaryTree(nums);

  console.log(root?.val);
  console.log(root?.left?.val);
  console.log(root?.right?.val);
}

main();

/**
 *
 * Time complexity is O(n^2) worst case
 * Space complexity is O(n^2) worst case
 *
 */
