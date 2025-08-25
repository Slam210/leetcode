/**
 *
 * We can solve this problem by parsing both sides of the equation and collecting two things, the sum of x coefficients and the sum of constant numbers.
 * By rearranging terms, we transform the equation into a standard form ax = b. Then, depending on whether a is zero, we determine if there is no solution,
 * infinite solutions, or a unique solution for x.
 *
 */

function solveEquation(equation: string): string {
  function parseExpression(expr: string): [number, number] {
    let coeffX = 0;
    let constVal = 0;
    let i = 0;
    let sign = 1;

    while (i < expr.length) {
      if (expr[i] === "+") {
        sign = 1;
        i++;
      } else if (expr[i] === "-") {
        sign = -1;
        i++;
      }

      let num = 0;
      let hasNum = false;

      while (i < expr.length && expr[i] >= "0" && expr[i] <= "9") {
        num = num * 10 + (expr[i].charCodeAt(0) - "0".charCodeAt(0));
        i++;
        hasNum = true;
      }

      if (i < expr.length && expr[i] === "x") {
        if (!hasNum) num = 1;
        coeffX += sign * num;
        i++;
      } else {
        constVal += sign * num;
      }
    }

    return [coeffX, constVal];
  }

  let [lhs, rhs] = equation.split("=");
  let [coeffL, constL] = parseExpression(lhs);
  let [coeffR, constR] = parseExpression(rhs);

  let coeffX = coeffL - coeffR;
  let constVal = constR - constL;

  if (coeffX === 0 && constVal === 0) return "Infinite solutions";
  if (coeffX === 0) return "No solution";

  return "x=" + constVal / coeffX;
}

function main() {
  console.log(solveEquation("x+5-3+x=6+x-2"));
  console.log(solveEquation("x=x"));
  console.log(solveEquation("2x=x"));
  console.log(solveEquation("x=x+2"));
}
main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
