class InputValidator {
  #_value;
  constructor(value) {
    this.#_value = value;
  }

  isEmpty() {
    return this.#_value.length === 0 ? true : false;
  }

  between(
    options = { inclusive: true, min: 5, max: 10, message: "Invalid input" }
  ) {
    if (this.isEmpty()) {
      return { result: true, message: null };
    }
    if (options.inclusive) {
      if (
        this.#_value.length >= options.min &&
        this.#_value.length <= options.max
      ) {
        return { result: true, message: null };
      }
    } else if (!options.inclusive) {
      if (
        this.#_value.length > options.min &&
        this.#_value.length < options.max
      ) {
        return { result: true, message: null };
      }
    }
    return { result: false, message: options.message };
  }

  isNumeric(options = { message: "Not a number" }) {
    return isNaN(this.#_value)
      ? { result: false, message: options.message }
      : { result: true, message: null };
  }

  isAlpha(options = { message: "Not an alphanumeric" }) {
    const re = /^[A-za-z0-9.]*$/;
    return re.test(this.#_value)
      ? { result: true, message: null }
      : { result: false, message: options.message };
  }

  isPhone(options = { message: "Not a valid number" }) {
    const re = /^[0-9]*$/;
    return this.#_value.length === 7 && re.test(this.#_value)
      ? { result: true, message: null }
      : { result: false, message: options.message };
  }
}

export function validate(value) {
  return new InputValidator(value);
}
