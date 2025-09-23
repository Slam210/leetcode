function nextGreatestLetter(letters: string[], target: string): string {
  let low = 0,
    high = letters.length - 1;
  let result: string | null = null;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (letters[mid] > target) {
      result = letters[mid];
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return result !== null ? result : letters[0];
}

function main() {
  console.log(nextGreatestLetter(["c", "f", "j"], "a"));
  console.log(nextGreatestLetter(["c", "f", "j"], "c"));
  console.log(nextGreatestLetter(["c", "f", "j"], "d"));
  console.log(nextGreatestLetter(["c", "f", "j"], "g"));
  console.log(nextGreatestLetter(["c", "f", "j"], "j"));
  console.log(nextGreatestLetter(["x", "x", "y", "y"], "z"));
}

main();
