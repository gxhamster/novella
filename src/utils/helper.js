export const prettyCapitalize = (str) => {
  if (typeof str !== "string") {
    return str;
  }
  return str
    .split(" ")
    .map((v) => `${v.charAt(0).toUpperCase()}${v.split("").splice(1).join("")}`)
    .join(" ");
};

export function fiveDaysAfterDate(date) {
  return new Date(new Date(date).getTime() + 5 * 24 * 60 * 60 * 1000);
}

// This class describes one input field in a page
export class PageLayoutData {
  constructor(
    title,
    full = true,
    searchable = false,
    validator = null,
    text = "",
    date = null
  ) {
    this.title = title;
    this.full = full;
    this.searchable = searchable;
    this.validator = validator;
    this.text = text;
    this.search_data = [];
    // Only for date inputs
    this.date = date;
  }

  clearText() {
    this.text = "";
    return this;
  }

  clearDate() {
    this.date = null;
    return this;
  }

  setSearchData(n_data) {
    if (this.searchable) this.search_data = n_data;
    return this;
  }

  clearSearchData() {
    this.search_data = [];
    return this;
  }
}

const filteredWords = {
  shit: "s**t",
  fuck: "f**k",
  motherfuck: "motherf**k",
  retard: "challenged",
  arse: "a**e",
  dick: "d**k",
  ass: "a**",
  bitch: "b**ch",
  pussy: "p***y",
  tit: "t*t",
  boobs: "b**bs",
  idiot: "",
  stupid: "",
  mayahoki: "ma***oki",
  fui: "f**",
  nagubalhu: "na***alhu",
  nagoobalhu: "na***alhu",
  foa: "f**",
  haivanu: "ha***nu",
  haivaanu: "ha***nu",
  bakata: "ba**ta",
  bakhata: "ba**ta",
  bakataa: "ba**taa",
};

export const filteredTextInput = (inputString) => {
  const newString = inputString;
  const re = new RegExp(Object.keys(filteredWords).join("|"), "gi");
  return newString.replace(re, (val) => {
    for (const key in filteredWords) {
      if (key == val) {
        return filteredWords[key];
      }
    }
  });
};
