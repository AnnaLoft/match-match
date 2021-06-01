class Validation {
  static testInput = (value: string, regex: RegExp): boolean => regex.test(value);

  static validateName(name: string): boolean {
    if (name && this.testInput(name, /^[a-zA-Zа-яА-Я]{1,30}$/)) {
      // console.log('o');
      return true;
    }
    // console.log('ne');
    return false;
  }

  static validateEmail(email: string): boolean {
    if (email && this.testInput(email, /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-z]{2,6}$/)) {
      return true;
    }

    return false;
  }
}

export default Validation;
