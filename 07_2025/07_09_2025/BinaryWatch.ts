/**
 * 
 * We have a binary watch with 4 hour LEDs representing hours 0 to 11 and 6 minute LEDs 
 * representing minutes 0 to 59 Each LED represents a bit in the binary representation of 
 * hours or minutes.  Given an integer turnedOn, return all valid times where exactly turnedOn 
 * LEDs are ON. This is a combinatorial enumeration problem we want to find all combinations of 
 * hour/minute such that the total number of 1s in their binary representation equals turnedOn. 
 * For every possible hour and minute we count the number of 1s in hour and minute
 * (bitCount(hour) + bitCount(minute)) If it equals turnedOn, format the time and store it.
 * 
 */

function readBinaryWatch(turnedOn: number): string[] {
  const results: string[] = [];

  function countBits(x: number): number {
    return x.toString(2).split("0").join("").length;
  }

  for (let h = 0; h < 12; h++) {
    for (let m = 0; m < 60; m++) {
      if (countBits(h) + countBits(m) === turnedOn) {
        results.push(`${h}:${m.toString().padStart(2, "0")}`);
      }
    }
  }

  return results;
}

/**
 * 
 * Time complexity is O(720) since 12 * 60 = 720
 * Space complexity is O(k)
 * 
 */