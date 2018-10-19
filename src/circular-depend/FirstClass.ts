import { SecondClass } from "./SecondClass";

export class FirstClass {
  a = 1;
  name = 'first';
  second: SecondClass;
  constructor() {
    // this.second = new SecondClass();
  }
  say() {

    console.log(this.name);
  }
}
