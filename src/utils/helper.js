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

function isEmpty(val) {
  return val === undefined ? true : false;
}

// This class describes one input field in a page
export class PageLayoutData {
  #defaults = {
    full: true,
    searchable: false,
    validator: null,
    text: "",
    date: null,
    phone: false,
  };
  constructor(
    title,
    options = {
      full: true,
      searchable: false,
      validator: null,
      text: "",
      date: null,
      phone: false,
    }
  ) {
    const new_options = {};
    for (const key of Object.keys(this.#defaults)) {
      if (isEmpty(options[key])) {
        new_options[key] = this.#defaults[key];
      } else {
        new_options[key] = options[key];
      }
    }
    options = new_options;
    this.title = title;
    this.full = options.full;
    this.searchable = options.searchable;
    this.validator = options.validator;
    this.text = options.text;
    this.search_data = [];
    this.date = options.date;
    this.phone = options.phone;
    console.log(this);
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
