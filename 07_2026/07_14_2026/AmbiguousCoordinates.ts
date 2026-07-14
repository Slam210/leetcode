/*
 * @lc app=leetcode id=816 lang=typescript
 *
 * [816] Ambiguous Coordinates
 */
// @lc code=start
function ambiguousCoordinates(s: string): string[] {
    const digits = s.slice(1, -1);
    const result: string[] = [];

    function generate(str: string): string[] {
        const n = str.length;
        const possibilies: string[] = [];

        if (n === 1) {
            return [str];
        }

        if (str[0] === "0" && str[n - 1] === "0") {
            return [];
        }

        if (str[0] === "0") {
          return ["0." + str.slice(1)];
        }

        if (str[n - 1] === "0") {
          return [str];
        }

        possibilies.push(str);

        for (let i = 1; i < n; i++) {
            possibilies.push(`${str.slice(0, i)}.${str.slice(i)}`);
        }

        return possibilies;
    }

    for (let i = 1; i < digits.length; i++) {
        const left = digits.slice(0, i);
        const right = digits.slice(i);

        const leftNums = generate(left);
        const rightNums = generate(right);

        for (const l of leftNums) {
            for (const r of rightNums) {
            result.push(`(${l}, ${r})`);
            }
        }
    }

    return result;

};
// @lc code=end