from typing import List

class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        g.sort()
        s.sort()

        i = 0  
        j = 0 

        while i < len(g) and j < len(s):
            if s[j] >= g[i]:
                i += 1  
            j += 1 

        return i

def main():
    greed_factors = [1, 2, 3]
    cookie_sizes = [1, 1]

    solution = Solution()
    result = solution.findContentChildren(greed_factors, cookie_sizes)

    print("Maximum number of content children:", result)

if __name__ == "__main__":
    main()
