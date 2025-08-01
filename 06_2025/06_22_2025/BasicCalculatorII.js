/*

The idea is to go through the string one character at a time. 
We build numbers as we encounter digits.
When we see an operator or reach the end of the string, process the 
previous number based on the last operator. For + we push the number 
For - we push the number.For * or / we pop the last number from the 
stack, apply the operation, push the result back At the end, 
add up all numbers in the stack and that’s our final result

*/

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  let stack = [];
  let num = 0;
  let sign = "+";

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (c >= "0" && c <= "9") {
      num = num * 10 + parseInt(c);
    }

    if ((isOperator(c) && c !== " ") || i === s.length - 1) {
      if (sign === "+") {
        stack.push(num);
      } else if (sign === "-") {
        stack.push(-num);
      } else if (sign === "*") {
        stack.push(stack.pop() * num);
      } else if (sign === "/") {
        let last = stack.pop();
        stack.push(Math.trunc(last / num));
      }

      sign = c;
      num = 0;
    }
  }

  return stack.reduce((a, b) => a + b, 0);
};

function isOperator(c) {
  return c === "+" || c === "-" || c === "*" || c === "/";
}

console.log(calculate("3+2*2"));
console.log(calculate(" 3/2 "));
console.log(calculate(" 3+5 / 2 "));

/*

Time complexity is O(n) as we only pass through the string once
Space complexity is O(n) as the stack holds numbers for final summation

*/
