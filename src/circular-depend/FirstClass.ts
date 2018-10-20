import SecondClass from "./SecondClass";
import injector from "../injector";

export default class FirstClass {
  a = 1;
  name = 'first';
  second: SecondClass;
  constructor() {

  }
  say() {
    const S = injector.get('SecondClass');
    this.second = new S();
    console.log(this.name, this.second.b);
  }
}
