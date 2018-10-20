export default class Singleton {
  private static _inst: Singleton;
  static get inst() {
    if (!this._inst) {
      this._inst = new this();
    }
    return this._inst;
  }
  protected constructor() {
  }
}
