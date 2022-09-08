import { unref } from "vue";

export class SearchItemClass {
  title: string;
  type: string;
  optional: any;
  constructor(title: string, type: string, optional: any = {}) {
    this.title = title;
    this.type = type;
    this.optional = optional;
  }
}

export interface SearchItemType {
  title: string;
  type: string;
  optional: Record<string, string>;
}

export function SearchItem(
  title: string,
  type: string,
  optional: any = {}
): SearchItemType {
  return {
    title,
    type,
    optional,
  };
}

// This function expects data to have object of SearchItemClass
export function filterPromise(searchText: string, data: SearchItemType[]) {
  const text = unref(searchText);
  return Promise.resolve().then(() => {
    const re = new RegExp(`${text.toLowerCase()}`, "g");
    const result = data.filter((v) => {
      const infoStr = `${v.title} ${Object.values(v.optional).join(
        " "
      )}`.toLowerCase();
      if (infoStr.search(re) > -1) {
        return true;
      }
      return false;
    });
    if (result === []) return null;
    return result;
  });
}

// Groups a list of SearchItemClass objects with a key
export function groupByTitle(data: SearchItemType[]) {
  const grouped_result = new Map();
  for (const obj of data) {
    const title = obj.title.toLowerCase().trim();

    if (!grouped_result.get(title)) {
      grouped_result.set(title, []);
    }
    grouped_result.set(title, [...grouped_result.get(title), obj]);
  }

  return grouped_result;
}
