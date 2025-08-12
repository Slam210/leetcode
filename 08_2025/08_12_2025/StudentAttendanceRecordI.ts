function checkRecord(s: string): boolean {
  let absentCount = 0;
  let lateStreak = 0;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (ch === "A") {
      absentCount++;
      if (absentCount >= 2) return false;
      lateStreak = 0;
    } else if (ch === "L") {
      lateStreak++;
      if (lateStreak >= 3) return false;
    } else {
      lateStreak = 0;
    }
  }

  return true;
}

function main() {
  console.log(checkRecord("PPALLP"));
  console.log(checkRecord("PPALLL"));
  console.log(checkRecord("PAAP"));
}

main();
