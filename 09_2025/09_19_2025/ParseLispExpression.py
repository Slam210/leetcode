"""
We need to evaluate Lisp-like expressions with operations let, add, and mult while respecting variable scoping. 
A recursive approach works well: integers and variables resolve directly, while complex expressions like add, mult, 
and let require parsing and evaluation of sub-expressions. To handle scoping, we maintain a stack of dictionaries 
so inner scopes can shadow outer ones. Tokenizing expressions carefully allows us to split them while respecting 
nested parentheses. Recursion combined with scope management ensures correctness.
"""

from typing import List, Dict


class Solution:
    def evaluate(self, expression: str) -> int:
        # Recursive function that parses and evaluates the expression
        def parse(expr: str, scope: List[Dict[str, int]]) -> int:
            # expression is a number
            if expr[0] != "(":
                if expr.lstrip("-").isdigit():
                    return int(expr)
                # expression is a variable, resolve from innermost to outermost scope
                for s in reversed(scope):
                    if expr in s:
                        return s[expr]
                # avoid returning None
                raise ValueError(f"Unbound variable: {expr}") 

            # expression is a compound (starts with "(")
             # strip outer parentheses
            expr = expr[1:-1] 
            tokens = self.tokenize(expr)

            if tokens[0] == "add":
                # add expression recursively evaluate operands
                return parse(tokens[1], scope) + parse(tokens[2], scope)
            elif tokens[0] == "mult":
                # mult expression recursively evaluate operands
                return parse(tokens[1], scope) * parse(tokens[2], scope)
            elif tokens[0] == "let":
                # let expression extend scope and assign variables sequentially
                new_scope = scope + [{}]
                for i in range(1, len(tokens) - 1, 2):
                    if i + 1 == len(tokens) - 1:
                        # last token is the final expression to evaluate
                        return parse(tokens[i], new_scope)
                    var, val_expr = tokens[i], tokens[i + 1]
                    val = parse(val_expr, new_scope)
                    new_scope[-1][var] = val
                return parse(tokens[-1], new_scope)
            
            # ensure total coverage
            raise ValueError(f"Unknown expression: {expr}")  

        return parse(expression, [])

    # Helper function to split an expression into tokens while respecting parentheses
    def tokenize(self, expr: str) -> List[str]:
        tokens, bal, cur = [], 0, ""
        for c in expr:
            if c == "(":
                bal += 1
            if c == ")":
                bal -= 1
            if c == " " and bal == 0:
                if cur:
                    tokens.append(cur)
                cur = ""
            else:
                cur += c
        if cur:
            tokens.append(cur)
        return tokens


def main():
    sol = Solution()
    print(sol.evaluate("(let x 2 (mult x (let x 3 y 4 (add x y))))")) 
    print(sol.evaluate("(let x 3 x 2 x)"))  
    print(sol.evaluate("(let x 1 y 2 x (add x y) (add x y))"))  


if __name__ == "__main__":
    main()

"""
Time complexity is O(n), where n is the length of the expression, 
since each token is processed at most once in recursive parsing.
Space complexity is O(n), due to recursion depth and storing scopes.
"""
