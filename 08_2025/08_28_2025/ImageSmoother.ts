function imageSmoother(img: number[][]): number[][] {
  const m = img.length,
    n = img[0].length;
  const res = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0,
        count = 0;
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          const ni = i + di,
            nj = j + dj;
          if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
            sum += img[ni][nj];
            count++;
          }
        }
      }
      res[i][j] = Math.floor(sum / count);
    }
  }

  return res;
}

function main() {
  const img = [
    [100, 200, 100],
    [200, 50, 200],
    [100, 200, 100],
  ];

  console.log("Original:");
  console.log(img.map((row) => row.join(" ")).join("\n"));

  const smoothed = imageSmoother(img);

  console.log("\nSmoothed:");
  console.log(smoothed.map((row) => row.join(" ")).join("\n"));
}

main();
