function fib(n: number): number {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let prev = 0,
    curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

function main() {
  console.log(fib(0));
  console.log(fib(1));
  console.log(fib(2));
  console.log(fib(5));
  console.log(fib(10));
  console.log(fib(20));
}

main();
