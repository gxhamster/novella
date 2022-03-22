class InputValidator {
  #_value;
  constructor(value) {
    this.#_value = value;
  }

  isEmpty() {
    return this.#_value.length === 0 ? true : false;
  }

  between(
    option = { inclusive: true, min: 5, max: 10, message: "Invalid input" }
  ) {
    if (this.isEmpty()) {
      return { result: true, message: null };
    }
    if (option.inclusive) {
      if (
        this.#_value.length >= option.min &&
        this.#_value.length <= option.max
      ) {
        return { result: true, message: null };
      }
    } else if (!option.inclusive) {
      if (
        this.#_value.length > option.min &&
        this.#_value.length < option.max
      ) {
        return { result: true, message: null };
      }
    }
    return { result: false, message: option.message };
  }
}

export function validate(value) {
  return new InputValidator(value);
}
