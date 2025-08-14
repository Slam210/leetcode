function matrixReshape(mat: number[][], r: number, c: number): number[][] {
  let m = mat.length;
  let n = mat[0].length;

  if (m * n !== r * c) return mat;

  let flat: number[] = mat.flat();

  let result: number[][] = [];
  let idx = 0;
  for (let i = 0; i < r; i++) {
    let row: number[] = [];
    for (let j = 0; j < c; j++) {
      row.push(flat[idx++]);
    }
    result.push(row);
  }

  return result;
}

function main() {
  console.log(
    matrixReshape(
      [
        [1, 2],
        [3, 4],
      ],
      1,
      4
    )
  );

  console.log(
    matrixReshape(
      [
        [1, 2],
        [3, 4],
      ],
      2,
      4
    )
  );
}

main();
