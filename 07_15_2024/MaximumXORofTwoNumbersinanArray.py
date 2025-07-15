"""

To find the maximum XOR of any two numbers in an array, we leverage the fact that XOR is 
maximized when two numbers differ at the highest possible bit positions. Instead of comparing 
every pair, we use a Trie to store the binary representation of each number, allowing us to 
efficiently find the best possible number to XOR with each element. As we insert each number, 
we try to follow the path in the Trie that takes the opposite bit at each position—because differing 
bits contribute a 1 in XOR, maximizing the result.

"""

from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}
        self.val = 0

class Trie:
    def __init__(self, bit_length: int):
        self.root = TrieNode()
        self.bit_length = bit_length

    def insert(self, num: int) -> None:
        node = self.root
        for i in range(self.bit_length, -1, -1): 
            bit = 1 if num & (1 << i) else 0
            if bit not in node.children:
                node.children[bit] = TrieNode()
            node = node.children[bit]
        node.val = num 

    def max_xor(self, num: int) -> int:
        node = self.root
        for i in range(self.bit_length, -1, -1):
            bit = 1 if num & (1 << i) else 0
            toggled = 1 - bit
            if toggled in node.children:
                node = node.children[toggled]
            else:
                node = node.children[bit]
        return num ^ node.val


class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        max_bit = len(bin(max(nums))) - 2 
        trie = Trie(max_bit)

        for num in nums:
            trie.insert(num)

        result = 0
        for num in nums:
            result = max(result, trie.max_xor(num))

        return result


def main():
    solution = Solution()
    test1 = [3, 10, 5, 25, 2, 8] 
    test2 = [426, 657, 427, 92, 613, 624]  
    test3 = [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70] 

    print("Test 1 result:", solution.findMaximumXOR(test1))
    print("Test 2 result:", solution.findMaximumXOR(test2))
    print("Test 3 result:", solution.findMaximumXOR(test3))


if __name__ == "__main__":
    main()

"""

Time complexity is O(n * k)
Space complexity is O(n * k)

"""