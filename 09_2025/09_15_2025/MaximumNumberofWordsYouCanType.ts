function canBeTypedWords(text: string, brokenLetters: string): number {
  const brokenSet = new Set(brokenLetters);

  const words = text.split(" ");

  let count = 0;

  for (const word of words) {
    let canType = true;
    for (const char of word) {
      if (brokenSet.has(char)) {
        canType = false;
        break;
      }
    }
    if (canType) count++;
  }

  return count;
}
