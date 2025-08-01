function findPoisonedDuration(timeSeries: number[], duration: number): number {
  if (timeSeries.length === 0) return 0;

  let total = 0;

  for (let i = 0; i < timeSeries.length - 1; i++) {
    const current = timeSeries[i];
    const next = timeSeries[i + 1];
    const gap = next - current;
    total += Math.min(gap, duration);
  }

  total += duration;
  return total;
}

function main() {
  const testCases: { timeSeries: number[]; duration: number }[] = [
    { timeSeries: [1, 4], duration: 2 },
    { timeSeries: [1, 2], duration: 2 },
    { timeSeries: [], duration: 2 },
    { timeSeries: [1, 2, 3, 4], duration: 2 },
    { timeSeries: [1, 10], duration: 5 },
  ];

  for (const { timeSeries, duration } of testCases) {
    const result = findPoisonedDuration(timeSeries, duration);
    console.log(
      `Attacks: [${timeSeries.join(
        ", "
      )}], Duration: ${duration} → Total Poisoned Time: ${result}`
    );
  }
}

main();
