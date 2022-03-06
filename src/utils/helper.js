export const prettyCapitalize = (str) => str.split(" ").map(v => `${v.charAt(0).toUpperCase()}${v.split('').splice(1) .join('')}` ).join(" ")

export function fiveDaysAfterDate(date) {
   return new Date(new Date(date).getTime() + (5 * 24 * 60 * 60 * 1000))
}

const filteredWords = {
  'shit': 's**t',
  'fuck': 'f**k',
  'motherfuck': 'motherf**k',
  'retard': 'challenged',
  'arse': 'a**e',
  'ass': 'a**',
  'bitch': 'b**ch',
  'pussy': 'p***y',
  'tit': 't*t',
  'boobs': 'b**bs',
  'idiot': '',
  'stupid': '',
  'mayahoki': 'ma***oki',
  'fui': 'f**',
  'nagubalhu': 'na***alhu',
  'nagoobalhu': 'na***alhu',
  'foa': 'f**',
  'haivanu': 'ha***nu',
  'haivaanu': 'ha***nu',
  'bakata': 'ba**ta',
  'bakhata': 'ba**ta',
  'bakataa': 'ba**taa',
}

export const filteredTextInput = (inputString) => {
  const newString = inputString
  const re = new RegExp(Object.keys(filteredWords).join("|"), "gi")
  return newString.replace(re, (val) => {
      for (const key in filteredWords) {
        if (key == val) {
          return filteredWords[key]
        }
      }
    })
}
