"""

We scan the temperatures from left to right and maintain a stack of indices whose next warmer day hasn’t been found yet. 
When we encounter a temperature higher than the one at the index on top of the stack, we pop that index and compute the 
distance between the current day and that popped index. We keep popping while the current temperature is higher than the 
temperature at the top of the stack.

"""

from typing import List

class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        answer = [0] * n
        stack = []  

        for i, temp in enumerate(temperatures):
            while stack and temp > temperatures[stack[-1]]:
                prev_index = stack.pop()
                answer[prev_index] = i - prev_index
            stack.append(i)

        return answer


def main():
    sol = Solution()
    tests = [
        ([73,74,75,71,69,72,76,73], [1,1,4,2,1,1,0,0]),
        ([30,40,50,60], [1,1,1,0]),
        ([30,60,90], [1,1,0]),
        ([90,80,70,60], [0,0,0,0]),
    ]

    for temps, expected in tests:
        result = sol.dailyTemperatures(temps)
        print(f"temps = {temps}\n -> result = {result}    expected = {expected}\n")


if __name__ == "__main__":
    main()

"""

Time complexity is O(n)
Space complexity is O(n)

"""