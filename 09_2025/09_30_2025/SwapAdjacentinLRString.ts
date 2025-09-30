/**
 *
 * We want to check if a sequence of moves can transform start to result.
 * Observing that 'L' moves only left and 'R' moves only right, we deduce
 * that the relative order of 'L' and 'R' in start and result must match.
 * By comparing their positions while ignoring 'X', we can determine if each
 * 'L' and 'R' can reach its target without violating the movement rules.
 *
 */

export default function canTransform(start: string, result: string): boolean {
  if (start.replace(/X/g, "") !== result.replace(/X/g, "")) return false;

  let i = 0,
    j = 0;
  const n = start.length;

  while (i < n && j < n) {
    while (i < n && start[i] === "X") i++;
    while (j < n && result[j] === "X") j++;

    if (i < n && j < n) {
      if (start[i] !== result[j]) return false;
      if (start[i] === "L" && i < j) return false;
      if (start[i] === "R" && i > j) return false;
      i++;
      j++;
    }
  }

  return true;
}

function main() {
  console.log(canTransform("RXXLRXRXL", "XRLXXRRLX"));
  console.log(canTransform("X", "L"));
  console.log(canTransform("XL", "LX"));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
