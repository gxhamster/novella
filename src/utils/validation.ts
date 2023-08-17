interface ValidationOptions {
  inclusive?: boolean;
  min?: number;
  max?: number;
  message: string;
}

export interface ValidationResult {
  result: boolean;
  message: string | null;
}

type NumericValidator = number;
type StringValidator = string;

export class InputValidator {
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
  ): ValidationResult {
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

  isEmpty(): ValidationResult {
    return typeof this.value === "string" && this.value.length === 0
      ? { result: true, message: "Input is empty" }
      : { result: false, message: "Input is not empty" };
  }

  isNumeric(
    options: ValidationOptions = { message: "Not a number" }
  ): ValidationResult {
    if (isNaN(this.value as number)) {
      return { result: false, message: options.message };
    }
    return { result: true, message: null };
  }

  isAlpha(
    options: ValidationOptions = {
      message: "Should contain only A-z a-z 0-9 .",
    }
  ): ValidationResult {
    const re = /^[A-za-z0-9.]*$/;
    return typeof this.value === "string" && re.test(this.value)
      ? { result: true, message: null }
      : { result: false, message: options.message };
  }

  isPhone(
    options: ValidationOptions = { message: "Not a valid phone number" }
  ): ValidationResult {
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

// New Validator 2.0
// Why am i not using a library :(
export class Validator {
  _value: string | number;
  result: boolean;
  error: string;
  constructor(text: string | number) {
    this._value = text;
    this.result = true;
    this.error = "";
  }
  required() {
    const str = this._value.toString();
    const match = str.length > 0;
    this.result = this.result && match;
    if (!match) this.error = "Field is required";

    return this;
  }
  isAlpha() {
    const re = /^[A-za-z0-9.]*$/;
    const match = re.test(this._value as string);
    this.result = this.result && match;
    if (!match) this.error = "Field should be alphanumerical";

    return this;
  }
  between(min: number, max: number) {
    const temp = this._value;
    if (typeof this._value == "string") {
      this._value = this._value.length;
    }
    const match = this._value > min && this._value < max ? true : false;
    this.result = this.result && match;

    if (!match) this.error = `Field should be between ${min} and ${max}`;
    this._value = temp;
    return this;
  }
  email() {
    const re = /^[A-za-z0-9.]+@[A-za-z0-9.]+$/;
    const match = re.test(this._value as string);
    this.result = this.result && match;
    if (!match) this.error = "Field should be an email";

    return this;
  }

  unwrap(): ValidationResult {
    return {
      result: this.result,
      message: this.error,
    };
  }
}
