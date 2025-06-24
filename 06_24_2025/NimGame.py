"""

We are playing a game where we can remove 1-3 stones. Assuming we play optimally,
can we win given n stones. The intuition behind this problem lies with the fact that
if we are given 4 are any multiple of 4 stones, it is impossible to win, even with optimal
plays. Thus, we just need to check whether or not n mod 4 is 0 or not.

"""

class Solution:
    def canWinNim(self, n: int) -> bool:
        return n % 4 != 0

if __name__ == "__main__":
    sol = Solution()
    print(sol.canWinNim(4))   
    print(sol.canWinNim(7)) 

"""

Time complexity is O(1)
Space complexity is O(1)

"""