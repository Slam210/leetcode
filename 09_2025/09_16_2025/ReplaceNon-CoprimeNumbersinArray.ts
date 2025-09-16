/**
 *
 * We approach this problem by thinking of it as a chain-reaction merging process.
 * Whenever we encounter two adjacent numbers that are non-coprime, we merge them
 * into their LCM, but this new number may also need to merge with its previous
 * neighbor. To manage this efficiently, we use a stack. Each number is processed
 * one at a time. If it can’t merge, we push it onto the stack and if it can merge,
 * we keep combining until no more merges are possible. By the end, the stack contains
 * the final modified array.
 *
 */

function gcd(a: number, b: number): number {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function replaceNonCoprimes(nums: number[]): number[] {
  const stack: number[] = [];

  for (let num of nums) {
    stack.push(num);

    while (stack.length > 1) {
      let a = stack[stack.length - 1];
      let b = stack[stack.length - 2];

      if (gcd(a, b) > 1) {
        stack.pop();
        stack.pop();
        stack.push(lcm(a, b));
      } else {
        break;
      }
    }
  }

  return stack;
}

function main() {
  const nums1 = [6, 4, 3, 2, 7, 6, 2];
  const nums2 = [2, 2, 1, 1, 3, 3, 3];

  console.log("Input:", nums1, "Output:", replaceNonCoprimes(nums1));
  console.log("Input:", nums2, "Output:", replaceNonCoprimes(nums2));
}

main();

/**
 *
 * Time complexity is O(log(min(a,b)))
 * Space complexity is O(n)
 *
 */
