/**
 *
 * The problem asks us to find the k-th character in a string built from a series of
 * transformations starting from "a". Each operation either doubles the string by appending
 * a copy of itself or appends a version where each character is shifted to its next alphabet
 * letter. Instead of building the entire string, which becomes exponentially large, we track
 * how the string’s length grows and reverse-simulate the operations to trace back where the
 * k-th character came from. By doing this in reverse, we determine whether the character
 * originated from the first or second half of a previous version, and accumulate how many
 * shifts were applied. Ultimately, the answer is the original 'a' shifted by the total number
 * of accumulated shifts, allowing us to compute the result efficiently without ever constructing
 * the full string. This is the same process as the previous problem, however, we only need to shift
 * when the operation is 1.
 *
 */

function kthCharacter(k: number, operations: number[]): string {
  const n = operations.length;
  // lengths[i] = length after i operations
  const lengths: number[] = [1];

  // Build length array (capped at k to avoid overflow)
  for (let i = 0; i < n; i++) {
    const prev = lengths[i];
    const next = prev * 2;
    lengths.push(Math.min(k, next));
  }

  let shifts = 0;

  // Walk backwards
  for (let i = n - 1; i >= 0; i--) {
    const currLen = lengths[i + 1];
    const prevLen = lengths[i];

    if (operations[i] === 0) {
      if (k > prevLen) {
        k -= prevLen; // was in second half
      }
      // else: k stays (was in first half)
    } else if (operations[i] === 1) {
      if (k > prevLen) {
        k -= prevLen; // was in shifted part
        shifts += 1;
      }
      // else: k stays (was in original part)
    }
  }

  // Final character was originally 'a', apply shifts
  const charCode = (("a".charCodeAt(0) - 97 + shifts) % 26) + 97;
  return String.fromCharCode(charCode);
}

/**
 *
 * Time complexity is O(n) for a foward pass and reverse pass
 * Space complexity is O(n) for lengths
 *
 */
