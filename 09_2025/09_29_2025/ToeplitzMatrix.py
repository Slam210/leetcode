from typing import List

class Solution:
    def isToeplitzMatrix(self, matrix: List[List[int]]) -> bool:
        m, n = len(matrix), len(matrix[0])
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] != matrix[i-1][j-1]:
                    return False
        return True
    
def main():
    s = Solution()
    tests = [
        [[1,2,3],[4,1,2],[5,4,1]],    
        [[1,2],[2,2]],                
        [[7]],                          
        [[1,2,3,4],[5,1,2,3],[9,5,1,2]] 
    ]
    for mat in tests:
        print(f"matrix = {mat} -> {s.isToeplitzMatrix(mat)}")

if __name__ == "__main__":
    main()