export function getUppercaseOfWords(input) {
  return input
    ? input
        .split(/\s/)
        .reduce((response, word) => (response += word.slice(0, 1)), "")
        .toUpperCase()
    : "";
}
