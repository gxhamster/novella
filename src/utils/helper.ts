import { ref } from "vue";

export const prettyCapitalize = (str: string): string => {
  if (typeof str !== "string") {
    return str;
  }
  return str
    .split(" ")
    .map((v) => `${v.charAt(0).toUpperCase()}${v.split("").splice(1).join("")}`)
    .join(" ");
};

export function fiveDaysAfterDate(date: Date): Date {
  return new Date(new Date(date).getTime() + 5 * 24 * 60 * 60 * 1000);
}

export interface LayoutOptions {
  title: string;
  full: string;
  searchable: boolean;
  validator: any;
  text: string;
  firebase_field: string;
  search_data: any[];
  date: Date;
  phone: string | number;
  required: boolean;
  elem: Element;
}

// This class describes one input field in a page
export class PageLayoutData {
  title: string;
  full: string;
  searchable: boolean;
  validator: any;
  text: string;
  firebase_field: string;
  search_data: any[];
  date: Date | null;
  phone: string | number;
  required: boolean;
  elem: Element;

  // Default values for options
  #defaults = {
    full: true,
    searchable: false,
    validator: null,
    text: "",
    date: null,
    phone: false,
    required: true,
    elem: ref(null),
  };
  constructor(title: string, options: LayoutOptions) {
    const new_options = { ...this.#defaults, ...options };

    options = new_options;
    this.title = title;
    this.full = options.full;
    this.searchable = options.searchable;
    this.validator = options.validator;
    this.text = options.text;
    this.firebase_field = options.firebase_field;
    this.search_data = [];
    this.date = options.date;
    this.phone = options.phone;
    this.required = options.required;
    this.elem = options.elem;
  }
  clearText() {
    this.text = "";
    return this;
  }

  clearDate() {
    this.date = null;
    return this;
  }

  setSearchData(n_data: any[]) {
    if (this.searchable) this.search_data = n_data;
    return this;
  }

  clearSearchData() {
    this.search_data = [];
    return this;
  }
}

// Filtered words list
const filteredWords: any = {
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

export const filteredTextInput = (inputString: string): string => {
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
