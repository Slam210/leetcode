function calPoints(operations: string[]): number {
  const stack: number[] = [];

  for (const op of operations) {
    if (op === "+") {
      const n = stack.length;
      stack.push(stack[n - 1] + stack[n - 2]);
    } else if (op === "D") {
      stack.push(stack[stack.length - 1] * 2);
    } else if (op === "C") {
      stack.pop();
    } else {
      stack.push(Number(op));
    }
  }

  return stack.reduce((a, b) => a + b, 0);
}

function main() {
  console.log(calPoints(["5", "2", "C", "D", "+"]));
  console.log(calPoints(["5", "-2", "4", "C", "D", "9", "+", "+"]));
  console.log(calPoints(["1"]));
}

main();
