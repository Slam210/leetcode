function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0) {
      let emptyLeft = i === 0 || flowerbed[i - 1] === 0;
      let emptyRight = i === flowerbed.length - 1 || flowerbed[i + 1] === 0;

      if (emptyLeft && emptyRight) {
        flowerbed[i] = 1;
        n--;
        if (n === 0) return true;
      }
    }
  }
  return n <= 0;
}

function main() {
  console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1));
  console.log(canPlaceFlowers([1, 0, 0, 0, 1], 2));
  console.log(canPlaceFlowers([0, 0, 1, 0, 0], 2));
}

main();
