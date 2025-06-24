"""

We must try every possible split of digits and insert operators between them.  
The challenge is to avoid leading zeros and correctly compute the expression 
considering operator precedence, especially for *. This is a backtracking problem 
with recursion and careful expression evaluation.

"""

from typing import List

class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        res = []

        def backtrack(index, path, value, prev):
            if index == len(num):
                if value == target:
                    res.append(path)
                return

            for i in range(index, len(num)):
                if i != index and num[index] == '0':
                    break

                curr_str = num[index:i+1]
                curr = int(curr_str)

                if index == 0:
                    backtrack(i + 1, curr_str, curr, curr)
                else:
                    backtrack(i + 1, path + '+' + curr_str, value + curr, curr)
                    backtrack(i + 1, path + '-' + curr_str, value - curr, -curr)
                    backtrack(i + 1, path + '*' + curr_str, value - prev + prev * curr, prev * curr)

        backtrack(0, '', 0, 0)
        return res

if __name__ == "__main__":
    sol = Solution()
    print(sol.addOperators("123", 6))

"""

Time complexity is O(4ⁿ) due to combinations
Space is O(n)

"""