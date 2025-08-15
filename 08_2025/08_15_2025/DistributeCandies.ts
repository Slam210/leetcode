function distributeCandies(candyType: number[]): number {
  const uniqueTypes = new Set(candyType).size;
  const maxAllowed = candyType.length / 2;
  return Math.min(uniqueTypes, maxAllowed);
}

function main() {
  console.log(distributeCandies([1, 1, 2, 2, 3, 3]));
  console.log(distributeCandies([1, 1, 2, 3]));
  console.log(distributeCandies([6, 6, 6, 6]));
}

main();
