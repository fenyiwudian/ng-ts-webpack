import {SecondClass} from "./SecondClass";
import {ThirdClass} from "./ThirdClass";

export class FirstClass {
  a = 1;
  name = 'first';

  say() {
    let number;
    if (this instanceof ThirdClass) {
      number = this.c;
    } else if (this instanceof SecondClass) {
      number = this.b;
    } else {
      number = this.a;
    }
    console.log(this.name, number);
  }
}
