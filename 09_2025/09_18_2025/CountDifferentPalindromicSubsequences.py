"""

To count all different palindromic subsequences, we use dynamic programming. We define dp[i][j] as the number of distinct palindromic subsequences in s[i..j]. 
For each substring, we consider whether the first and last characters are equal or not. If they are equal, we account for new palindromes created by adding the 
matching characters at both ends. If they are different, we combine counts from smaller substrings while avoiding double-counting overlaps. Using this DP approach 
and precomputing the positions of each character, we efficiently compute the count modulo 10^9+7

"""

class Solution:
    def countPalindromicSubsequences(self, s: str) -> int:
        MOD = 10**9 + 7
        n = len(s)
        dp = [[0]*n for _ in range(n)]

        # base case: single letters
        for i in range(n):
            dp[i][i] = 1

        for length in range(2, n+1):
            for i in range(n-length+1):
                j = i + length - 1
                if s[i] == s[j]:
                    left, right = i+1, j-1
                    # find first occurrence of s[i] in s[i+1..j-1]
                    while left <= right and s[left] != s[i]:
                        left += 1
                    # find last occurrence
                    while left <= right and s[right] != s[i]:
                        right -= 1
                    if left > right:
                        dp[i][j] = dp[i+1][j-1]*2 + 2
                    elif left == right:
                        dp[i][j] = dp[i+1][j-1]*2 + 1
                    else:
                        dp[i][j] = dp[i+1][j-1]*2 - dp[left+1][right-1]
                else:
                    dp[i][j] = dp[i+1][j] + dp[i][j-1] - dp[i+1][j-1]

                dp[i][j] = (dp[i][j] + MOD) % MOD

        return dp[0][n-1]


def main():
    sol = Solution()
    tests = [
        "bccb",          
        "abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba"  
    ]
    for s in tests:
        print(f"String: {s[:30]}... -> Output: {sol.countPalindromicSubsequences(s)}")


if __name__ == "__main__":
    main()

"""

Time complexity is O(n^3)
Space complexity is O(n^2)

"""