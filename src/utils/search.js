import { unref } from 'vue'

export class SearchItemClass {
  constructor(title, type, optional = {}) {
    this.title = title
    this.type = type
    this.optional = optional
  }
}

// This function expects data to have object of SearchItemClass
export function filterPromise(searchText, data) {
  const text = unref(searchText)
  return Promise.resolve().then(() => {
    const re = new RegExp(`${text.toLowerCase()}`, 'g')
    const result = data.filter((v) => {
      const infoStr = `${v.title} ${Object.values(v.optional).join(' ')}`.toLowerCase()
      if (infoStr.search(re) > -1) {
        return true
      }
      return false
    })
    if (result === 'null' || result === 'undefined')
      return null
    return result
  })
}

// Groups a list of SearchItemClass objects with a key
export function groupByKey(key, data, is_key_optional) {
  const grouped_result = new Map()
  for (const obj of data) {
    let title
    if (is_key_optional)
      title = obj.optional[key].toLowerCase().trim()
    else
      title = obj[key].toLowerCase().trim()

    if (!grouped_result.get(title)) {
      grouped_result.set(title, [])
    }
    grouped_result.set(title, [...grouped_result.get(title), obj])
  }

  return grouped_result
}
