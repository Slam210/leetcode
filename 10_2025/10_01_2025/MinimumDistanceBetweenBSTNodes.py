from typing import Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        self.prev = None
        self.min_diff = 10**9
        
        def inorder(node):
            if not node:
                return
            inorder(node.left)
            if self.prev is not None:
                self.min_diff = min(self.min_diff, node.val - self.prev)
            self.prev = node.val
            inorder(node.right)
        
        inorder(root)
        return self.min_diff


def build_bst_from_list(values):
    """Helper function to build a BST for testing."""
    if not values:
        return None
    root = TreeNode(values[0])
    for v in values[1:]:
        root = insert_into_bst(root, v)
    return root

def insert_into_bst(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert_into_bst(root.left, val)
    else:
        root.right = insert_into_bst(root.right, val)
    return root

if __name__ == "__main__":
    values = [4,2,6,1,3]
    root = build_bst_from_list(values)
    sol = Solution()
    print(sol.minDiffInBST(root))  
