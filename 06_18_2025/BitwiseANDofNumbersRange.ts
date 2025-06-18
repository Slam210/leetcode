/*

The intuition behind this problem is that if any bit changes from 1 to 0
in any number in the range, then the result will have a 0 in that bit position.

*/

function rangeBitwiseAnd(left: number, right: number): number {
  let shift = 0;

  while (left !== right) {
    left >>= 1;
    right >>= 1;
    shift++;
  }

  return left << shift;
}

console.log(rangeBitwiseAnd(5, 7));

/*

Run time is O(log(n))
Space complexity is O(1)

*/
