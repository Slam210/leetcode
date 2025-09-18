from typing import List

def is_self_dividing(num: int) -> bool:
    for d in str(num):
        digit = int(d)
        if digit == 0 or num % digit != 0:
            return False
    return True

class Solution:
    def selfDividingNumbers(self, left: int, right: int) -> List[int]:
        result = []
        for num in range(left, right + 1):
            if is_self_dividing(num):
                result.append(num)
        return result

def main():
    sol = Solution()
    print(sol.selfDividingNumbers(1, 22)) 

if __name__ == "__main__":
    main()
