/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let res = 0;

  for (let i = 0; i < 32; i++) {
    let bitSum = 0;
    for (let num of nums) {
      if ((num >> i) & 1) {
        bitSum++;
      }
    }

    if (bitSum % 3 !== 0) {
      res |= 1 << i;
    }
  }

  if (res >= 2 ** 31) {
    res -= 2 ** 32;
  }

  return res;
};
