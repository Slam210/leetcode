/**
 *
 * We want the number of unique bulb configurations after exactly presses button presses. Since button effects are periodic, only
 * the first 6 bulbs matter, and pressing a button twice cancels its effect. That means we just need to simulate all parity
 * combinations of the four buttons. Then, depending on presses, we select which combinations are valid. This reduces the problem
 * to checking at most 16 cases.
 *
 */

function flipLights(n: number, presses: number): number {
  if (presses === 0) return 1;
  n = Math.min(n, 6);

  function applyButton(state: number[], button: number) {
    const len = state.length;
    if (button === 0) {
      for (let i = 0; i < len; i++) state[i] ^= 1;
    } else if (button === 1) {
      for (let i = 1; i < len; i += 2) state[i] ^= 1;
    } else if (button === 2) {
      for (let i = 0; i < len; i += 2) state[i] ^= 1;
    } else if (button === 3) {
      for (let i = 0; i < len; i += 3) state[i] ^= 1;
    }
  }

  const seen = new Set<string>();

  for (let mask = 0; mask < 16; mask++) {
    const bits = mask.toString(2).split("1").length - 1;
    if (bits % 2 === presses % 2 && bits <= presses) {
      const state = new Array(n).fill(1);
      for (let b = 0; b < 4; b++) {
        if ((mask >> b) & 1) applyButton(state, b);
      }
      seen.add(state.join(""));
    }
  }

  return seen.size;
}

function main() {
  console.log(flipLights(1, 1));
  console.log(flipLights(2, 1));
  console.log(flipLights(3, 1));
  console.log(flipLights(3, 2));
}

main();

/**
 *
 * Time complexity is O(1)
 * Space complexity is O(1)
 *
 */
