export default function countBinarySubstrings(s: string): number {
  const groups: number[] = [];
  let count = 1;

  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      groups.push(count);
      count = 1;
    }
  }
  groups.push(count);

  let result = 0;
  for (let i = 0; i < groups.length - 1; i++) {
    result += Math.min(groups[i], groups[i + 1]);
  }

  return result;
}
