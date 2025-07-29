"""

Two players take turns picking numbers from either end of an integer array nums. They add the 
picked number to their score. The game ends when the array is empty. We must determine if Player 1 
can win or tie, assuming both play optimally. Instead of tracking actual scores, we focus on the 
score difference player1 - player2. Let dp[i][j] represent the maximum score difference the 
current player can achieve from subarray nums[i..j]. At any turn, a player can take nums[I] where 
their net gain is nums[i] - dp[i+1][j] or take nums[j]: their net gain is nums[j] - dp[i][j-1].

"""

from typing import List

class Solution:
    def predictTheWinner(self, nums: List[int]) -> bool:
        n = len(nums)
        dp = [[0] * n for _ in range(n)]

        for i in range(n):
            dp[i][i] = nums[i]

        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                dp[i][j] = max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1])

        return dp[0][n - 1] >= 0


def main():
    sol = Solution()

    nums1 = [1, 5, 2]
    print("Input:", nums1)
    print("Output:", sol.predictTheWinner(nums1))  

    nums2 = [1, 5, 233, 7]
    print("Input:", nums2)
    print("Output:", sol.predictTheWinner(nums2)) 

    nums3 = [1, 1]
    print("Input:", nums3)
    print("Output:", sol.predictTheWinner(nums3))

if __name__ == "__main__":
    main()

"""

Time complexity is O(n^2)
Space complexity is O(n^2)

"""