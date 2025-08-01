function constructRectangle(area: number): number[] {
  let sqrt = Math.floor(Math.sqrt(area));

  for (let W = sqrt; W >= 1; W--) {
    if (area % W === 0) {
      let L = area / W;
      return [L, W];
    }
  }

  return [];
}

function main() {
  const testAreas = [1, 2, 4, 37, 122122];

  for (const area of testAreas) {
    const result = constructRectangle(area);
    console.log(`Dimensions for area ${area}: [${result[0]}, ${result[1]}]`);
  }
}

main();
