export class Utils {
  static isMultiple(string, value) {
    const isMultiple = value === 0 || value > 1;
    return isMultiple ? `${string}s` : string;
  }
}
