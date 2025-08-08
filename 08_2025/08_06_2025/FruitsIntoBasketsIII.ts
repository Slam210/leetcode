/**
 *
 * We are given fruits[i] which is the quantity of the i-th fruit type and baskets[j] which is the capacity
 * of the j-th basket. We must place each fruit from left to right into the leftmost available basket such
 * that it has not been used, and has capacity ≥ fruit quantity. Our goal is to return the number of fruits
 * that cannot be placed. We divide the baskets into blocks of size √n, and precompute the maximum capacity
 * in each block. Skip entire blocks quickly if the max value in the block is less than the current fruit size.
 * If a block has a chance of holding the fruit, then we scan only within that small block (at most √n elements).
 * After placing a fruit in a basket we recompute the max of that block since the basket is now unavailable.
 *
 */

function numOfUnplacedFruits(fruits: number[], baskets: number[]): number {
  const capacityMap = new Map<number, number[]>();

  for (let i = 0; i < baskets.length; i++) {
    const cap = baskets[i];
    if (!capacityMap.has(cap)) {
      capacityMap.set(cap, []);
    }
    capacityMap.get(cap)!.push(i);
  }

  const sortedCaps = Array.from(capacityMap.keys()).sort((a, b) => a - b);

  let unplaced = 0;

  for (const fruit of fruits) {
    let left = 0;
    let right = sortedCaps.length - 1;
    let foundIndex = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (sortedCaps[mid] >= fruit) {
        foundIndex = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    if (foundIndex === -1) {
      unplaced++;
      continue;
    }

    const cap = sortedCaps[foundIndex];
    const indexQueue = capacityMap.get(cap)!;

    indexQueue.shift();

    if (indexQueue.length === 0) {
      capacityMap.delete(cap);
      sortedCaps.splice(foundIndex, 1);
    }
  }

  return unplaced;
}

function main() {
  const fruits = [5, 2, 7, 4];
  const baskets = [3, 5, 8, 2];

  const result = numOfUnplacedFruits(fruits, baskets);
  console.log("Number of unplaced fruit types:", result);
}

main();

/**
 *
 * Time complexity is O(sqrt(n))
 * Space complexity is O(sqrt(n))
 *
 */
