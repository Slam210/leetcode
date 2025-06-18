/*

The intuition behind this problem lies behind having a helper function that can
calculate the currect sum alongside a set. Once we have the new sum, we can check if
it's already within the set, as it would indicate a loop. If we reach 1, then we can
return true, otherwise we can return false.

*/

function isHappy(n: number): boolean {
  function getDigitSquareSum(num: number): number {
    let sum: number = 0;
    while (num > 0) {
      const digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  const seen = new Set<number>();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = getDigitSquareSum(n);
  }

  return n === 1;
}

console.log(isHappy(19));

/*

The run time complexity is O(log(n)) as we continue to break the number down
The space complexity is O(1) as we use a set which contains a set amount of max digits

*/
