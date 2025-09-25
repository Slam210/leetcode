/**
 *
 * To solve this, we use the observation that each partition must include every occurrence of every character it contains.
 * By first recording the last index of each character, we can scan through the string and expand the current partition to
 * cover all these last appearances. Whenever the current index reaches this partition end, we know the partition is valid,
 * and we cut it. Doing this repeatedly ensures each letter belongs to exactly one partition while maximizing the number of partitions.
 *
 */

export default function partitionLabels(s: string): number[] {
  let last: { [key: string]: number } = {};
  for (let i = 0; i < s.length; i++) {
    last[s[i]] = i;
  }

  let result: number[] = [];
  let start = 0,
    end = 0;

  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]]);
    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }

  return result;
}

function main() {
  console.log(partitionLabels("ababcc"));
  console.log(partitionLabels("eccbbbbdec"));
  console.log(partitionLabels("abac"));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
