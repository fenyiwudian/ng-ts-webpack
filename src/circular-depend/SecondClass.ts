import FirstClass from "./FirstClass";
import injector from "../injector";



export default class SecondClass extends FirstClass {
  b = 2;
  name = 'second';
}

injector.register('SecondClass', SecondClass);
