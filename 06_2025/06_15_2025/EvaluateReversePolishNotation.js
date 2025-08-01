/*

Reverse Polish Notation implies postfix for the operands.
This means that we can use a stack, and when we run into an operand, pop the first 2 and apply the operand
Afterward, we push the result onto the stack and repeat.
Stack top contains the result afterward.

*/

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = [];

  for (let token of tokens) {
    if (["+", "-", "*", "/"].includes(token)) {
      let b = stack.pop();
      let a = stack.pop();
      let result;

      switch (token) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "*":
          result = a * b;
          break;
        case "/":
          result = a / b;
          result = result < 0 ? Math.ceil(result) : Math.floor(result);
          break;
      }

      stack.push(result);
    } else {
      stack.push(parseInt(token));
    }
  }

  return stack.pop();
};

console.log(evalRPN(["2", "1", "+", "3", "*"]));

/*

Run time is O(n) since we do one iteration with a stack;
Space time is O(n) since we create a stack that is at most n numbers

*/
