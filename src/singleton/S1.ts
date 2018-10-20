import Singleton from "./Singleton";

export class S1 extends Singleton {
  a: string;
  b: number;
  show() {
    console.log('haha');
  }
}
