function toLowerCase(s: string): string {
  let result: string[] = [];
  for (let i = 0; i < s.length; i++) {
    let code = s.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      result.push(String.fromCharCode(code + 32));
    } else {
      result.push(s[i]);
    }
  }
  return result.join("");
}

function main(): void {
  console.log(toLowerCase("Hello"));
  console.log(toLowerCase("here"));
  console.log(toLowerCase("LOVELY"));
  console.log(toLowerCase("MiXeD123"));
}

main();
