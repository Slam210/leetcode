"""
We are tasked with breaking down a chemical formula into its atomic counts and returning them in sorted order. 
To approach this, we can think of the formula like a set of nested expressions, where atoms and their counts are 
accumulated, and parentheses create temporary scopes that may be multiplied before merging back into the main result. 
By using a stack of counters, we systematically track counts across different levels of the formula, handle multipliers 
after closing parentheses, and accumulate atom frequencies. In the end, sorting the atoms alphabetically and formatting 
the output gives us the desired result.

"""

from collections import Counter

class Solution:
    def countOfAtoms(self, formula: str) -> str:
        stack = [Counter()]
        i, n = 0, len(formula)

        while i < n:
            if formula[i] == '(':
                stack.append(Counter())
                i += 1
            elif formula[i] == ')':
                i += 1
                # parse multiplier
                start = i
                while i < n and formula[i].isdigit():
                    i += 1
                mult = int(formula[start:i]) if start < i else 1
                top = stack.pop()
                for atom, count in top.items():
                    stack[-1][atom] += count * mult
            else:
                # parse atom name
                start = i
                i += 1
                while i < n and formula[i].islower():
                    i += 1
                atom = formula[start:i]

                # parse count
                start = i
                while i < n and formula[i].isdigit():
                    i += 1
                count = int(formula[start:i]) if start < i else 1

                stack[-1][atom] += count

        # final counts
        final_counts = stack[-1]
        result = []
        for atom in sorted(final_counts.keys()):
            result.append(atom)
            if final_counts[atom] > 1:
                result.append(str(final_counts[atom]))
        return "".join(result)

def main():
    solution = Solution()

    tests = [
        "H2O",           
        "Mg(OH)2",      
        "K4(ON(SO3)2)2" 
    ]

    for formula in tests:
        print(f"Formula: {formula} -> Output: {solution.countOfAtoms(formula)}")


if __name__ == "__main__":
    main()
    
"""

Time complexity is O(n + m log(m))
Space complexity is O(n

"""