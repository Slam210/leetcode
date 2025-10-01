from typing import List, Tuple

class Solution:
    def numWaterBottles(self, numBottles: int, numExchange: int) -> int:
        if numExchange <= 1:
            raise ValueError("numExchange must be >= 2 for meaningful exchanges.")
        
        total = numBottles   
        empties = numBottles 
        
        while empties >= numExchange:
            exchange = empties // numExchange   
            total += exchange                
            empties = exchange + (empties % numExchange) 
        
        return total


def run_tests(tests: List[Tuple[int,int]]) -> None:
    sol = Solution()
    for nb, ne in tests:
        try:
            result = sol.numWaterBottles(nb, ne)
            print(f"numBottles={nb}, numExchange={ne} -> drank {result}")
        except ValueError as e:
            print(f"numBottles={nb}, numExchange={ne} -> Error: {e}")


if __name__ == "__main__":
    sample_tests = [
        (9, 3), 
        (15, 4), 
        (2, 3),  
        (10, 2), 
    ]
    run_tests(sample_tests)
