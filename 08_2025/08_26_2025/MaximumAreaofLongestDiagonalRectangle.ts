function areaOfMaxDiagonal(dimensions: number[][]): number {
  let maxDiagSq = 0;
  let maxArea = 0;

  for (let [length, width] of dimensions) {
    let diagSq = length * length + width * width;
    let area = length * width;

    if (diagSq > maxDiagSq) {
      maxDiagSq = diagSq;
      maxArea = area;
    } else if (diagSq === maxDiagSq) {
      maxArea = Math.max(maxArea, area);
    }
  }

  return maxArea;
}

function main() {
  console.log(
    areaOfMaxDiagonal([
      [9, 3],
      [8, 6],
    ])
  );

  console.log(
    areaOfMaxDiagonal([
      [3, 4],
      [4, 3],
    ])
  );
}

main();
