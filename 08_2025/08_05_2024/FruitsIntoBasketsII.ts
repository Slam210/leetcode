function numOfUnplacedFruits(fruits: number[], baskets: number[]): number {
  const used = new Set<number>();
  let unplacedCount = 0;

  for (let i = 0; i < fruits.length; i++) {
    let placed = false;

    for (let j = 0; j < baskets.length; j++) {
      if (!used.has(j) && baskets[j] >= fruits[i]) {
        used.add(j);
        placed = true;
        break;
      }
    }

    if (!placed) unplacedCount++;
  }

  return unplacedCount;
}

function main() {
  const fruits = [5, 3, 7, 2];
  const baskets = [4, 5, 2, 8];

  const result = numOfUnplacedFruits(fruits, baskets);
  console.log("Number of unplaced fruits:", result);
}

main();
