function largestGoodInteger(num: string): string {
  let maxGood = "";

  for (let i = 0; i <= num.length - 3; i++) {
    let sub = num.substring(i, i + 3);
    if (sub[0] === sub[1] && sub[1] === sub[2]) {
      if (sub > maxGood) {
        maxGood = sub;
      }
    }
  }
  return maxGood;
}

function main() {
  console.log(largestGoodInteger("6777133339"));
  console.log(largestGoodInteger("2300019"));
  console.log(largestGoodInteger("42352338"));
}

main();
