/**
 * @param {number[]} status
 * @param {number[]} candies
 * @param {number[][]} keys
 * @param {number[][]} containedBoxes
 * @param {number[]} initialBoxes
 * @return {number}
 */
var maxCandies = function (
  status,
  candies,
  keys,
  containedBoxes,
  initialBoxes
) {
  let totalCandies = 0;
  const queue = [...initialBoxes];
  const seen = new Set();
  const unlocked = new Set();
  const locked = new Set();

  while (queue.length > 0) {
    const box = queue.shift();

    if (seen.has(box)) continue;

    if (status[box] === 0 && !unlocked.has(box)) {
      locked.add(box);
      continue;
    }

    seen.add(box);

    totalCandies += candies[box];

    for (const key of keys[box]) {
      if (!unlocked.has(key)) {
        unlocked.add(key);
        if (locked.has(key)) {
          queue.push(key);
          locked.delete(key);
        }
      }
    }

    for (const contained of containedBoxes[box]) {
      queue.push(contained);
    }
  }

  return totalCandies;
};

console.log(
  maxCandies(
    [1, 0, 1, 0],
    [7, 5, 4, 100],
    [[], [], [1], []],
    [[1, 2], [3], [], []],
    [0]
  )
);
