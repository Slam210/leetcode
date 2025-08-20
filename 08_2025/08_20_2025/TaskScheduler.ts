/**
 *
 * We want to minimize idle time while scheduling tasks with cooldown restrictions. The key is to recognize that
 * the most frequent tasks dictate the structure of the schedule. By arranging them first with the required cooldown
 * gaps and then filling gaps with other tasks, we guarantee an efficient layout. The solution comes from comparing
 * the theoretical minimum arrangement created by the most frequent tasks with the total number of tasks, ensuring
 * we account for both idle-filled and non-idle scenarios.
 *
 */

function leastInterval(tasks: string[], n: number): number {
  let freq: number[] = Array(26).fill(0);
  for (let task of tasks) {
    freq[task.charCodeAt(0) - "A".charCodeAt(0)]++;
  }

  let f_max = Math.max(...freq);
  let count_max = freq.filter((f) => f === f_max).length;
  let length = (f_max - 1) * (n + 1) + count_max;
  return Math.max(tasks.length, length);
}

function main() {
  console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2));
  console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 0));
  console.log(leastInterval(["A", "A", "A", "A", "B", "B", "C", "C"], 2));
}

main();

/**
 *
 * Time complexity is O(task.length)
 * Space complexity is O(1)
 *
 */
