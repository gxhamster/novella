interface ValidationOptions {
  inclusive?: boolean;
  min?: number;
  max?: number;
  message: string;
}

interface ValidaionResult {
  result: boolean;
  message: string | null;
}

type NumericValidator = number;
type StringValidator = string;

class InputValidator {
  value: NumericValidator | StringValidator;
  constructor(value: string | number) {
    this.value = value;
  }

  between(
    options: ValidationOptions = {
      inclusive: true,
      min: 0,
      max: 1000,
      message: "Invalid input",
    }
  ): ValidaionResult {
    if (
      typeof options.min !== "undefined" &&
      typeof options.max !== "undefined"
    ) {
      if (typeof this.value === "number") {
        if (options.inclusive)
          return this.value >= options.min && this.value <= options.max
            ? { result: true, message: null }
            : { result: false, message: options.message };
        else
          return this.value > options.min && this.value < options.max
            ? { result: true, message: null }
            : { result: false, message: options.message };
      } else {
        if (options.inclusive)
          return this.value.length >= options.min &&
            this.value.length <= options.max
            ? { result: true, message: null }
            : { result: false, message: options.message };
        else
          return this.value.length > options.min &&
            this.value.length < options.max
            ? { result: true, message: null }
            : { result: false, message: options.message };
      }
    }

    throw Error("Min and max is not defined");
  }

  isEmpty(): ValidaionResult {
    return typeof this.value === "string" && this.value.length === 0
      ? { result: true, message: "Input is empty" }
      : { result: false, message: "Input is not empty" };
  }

  isNumeric(
    options: ValidationOptions = { message: "Not a number" }
  ): ValidaionResult {
    if (isNaN(this.value as number)) {
      return { result: false, message: options.message };
    }
    return { result: true, message: null };
  }

  isAlpha(
    options: ValidationOptions = {
      message: "Should contain only A-z a-z 0-9 .",
    }
  ): ValidaionResult {
    const re = /^[A-za-z0-9.]*$/;
    return typeof this.value === "string" && re.test(this.value)
      ? { result: true, message: null }
      : { result: false, message: options.message };
  }

  isPhone(
    options: ValidationOptions = { message: "Not a valid phone number" }
  ): ValidaionResult {
    const re = /^[0-9]*$/;
    return typeof this.value === "string" &&
      this.value.length === 7 &&
      re.test(this.value)
      ? { result: true, message: null }
      : { result: false, message: options.message };
  }
}

export function validate(value: string | number) {
  return new InputValidator(value);
}
