function hasAlternatingBits(n: number): boolean {
  const x = n ^ (n >> 1);

  return (x & (x + 1)) === 0;
}

function main() {
  console.log(hasAlternatingBits(5));
  console.log(hasAlternatingBits(7));
  console.log(hasAlternatingBits(10));
}

main();
