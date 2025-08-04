/**
 *
 * We are given an array fruits, where each element represents a fruit type from a tree.
 * We can start picking fruits at any point and move to the right, one tree at a time.
 * We have only two baskets, and each basket can carry unlimited fruits of only one type.
 * Our goal is to return the maximum number of fruits you can pick from a contiguous
 * subarray that contains at most two different types of fruits. This is a sliding window
 * problem. We want the longest contiguous subarray with at most two distinct elements (fruit types).
 *
 */

function totalFruit(fruits: number[]): number {
  let left = 0;
  let right = 0;
  let maxFruits = 0;
  const basket = new Map<number, number>();

  for (right = 0; right < fruits.length; right++) {
    const fruit = fruits[right];
    basket.set(fruit, (basket.get(fruit) || 0) + 1);

    while (basket.size > 2) {
      const leftFruit = fruits[left];
      basket.set(leftFruit, basket.get(leftFruit)! - 1);
      if (basket.get(leftFruit) === 0) {
        basket.delete(leftFruit);
      }
      left++;
    }
    maxFruits = Math.max(maxFruits, right - left + 1);
  }

  return maxFruits;
}

function main() {
  const test1 = [1, 2, 1];
  const test2 = [0, 1, 2, 2];
  const test3 = [1, 2, 3, 2, 2];

  console.log(totalFruit(test1));
  console.log(totalFruit(test2));
  console.log(totalFruit(test3));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1) or O(k) which is O(2) in the constraints
 *
 */
