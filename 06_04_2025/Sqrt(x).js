var mySqrt = function (x) {
  if (x < 2) return x;

  let left = 1,
    right = x;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let midSquared = mid * mid;

    if (midSquared === x) {
      return mid;
    } else if (midSquared < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right;
};

console.log(mySqrt(81));
