export const prettyCapitalize = (str) => str.split(" ").map(v => `${v.charAt(0).toUpperCase()}${v.split('').splice(1) .join('')}` ).join(" ")
