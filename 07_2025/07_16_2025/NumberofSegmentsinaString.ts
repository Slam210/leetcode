function countSegments(s: string): number {
  return s.split(" ").filter((str) => str.length > 0).length;
}
