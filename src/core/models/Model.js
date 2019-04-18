export default class Model {
  static __count = 0;

  constructor() {}

  get icon() {
    return "far fa-empty";
  }

  get type() {
    return "Undefined";
  }

  get name() {
    return "Undefined";
  }

  static get count() {
    return this.__count;
  }

  static set count(value) {
    this.__count = value;
  }
}
