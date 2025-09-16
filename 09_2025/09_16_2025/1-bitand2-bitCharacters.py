from typing import List

class Solution:
    def isOneBitCharacter(self, bits: List[int]) -> bool:
        i = 0
        n = len(bits)
        while i < n - 1:
            if bits[i] == 0:
                i += 1
            else:
                i += 2
        return i == n - 1

def main():
    sol = Solution()
    print(sol.isOneBitCharacter([1, 0, 0]))  
    print(sol.isOneBitCharacter([1, 1, 1, 0])) 
if __name__ == "__main__":
    main()
