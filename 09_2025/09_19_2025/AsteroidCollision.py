"""

We need to simulate asteroid collisions where asteroids move left and right and may destroy each other upon meeting. 
Using a stack helps because asteroids moving right can only collide with future left-moving ones. As we process each 
asteroid, if no collision occurs, we add it to the stack. If collisions happen, we resolve them by comparing sizes and 
updating accordingly. The final stack gives the surviving asteroids in order.

"""

from typing import List


class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        stack = []
        for asteroid in asteroids:
            if asteroid > 0:
                stack.append(asteroid)
            else:
                while stack and stack[-1] > 0 and stack[-1] < abs(asteroid):
                    stack.pop()
                if not stack or stack[-1] < 0:
                    stack.append(asteroid)
                elif stack[-1] == abs(asteroid):
                    stack.pop()
        return stack

def main():
    sol = Solution()
    print(sol.asteroidCollision([5, 10, -5]))    
    print(sol.asteroidCollision([8, -8]))       
    print(sol.asteroidCollision([10, 2, -5]))   
    print(sol.asteroidCollision([-2, -1, 1, 2])) 


if __name__ == "__main__":
    main()

"""

Time complexity is O(n)
Space complexity is O(n)

"""