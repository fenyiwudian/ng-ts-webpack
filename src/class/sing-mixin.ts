import Person from "./person";
import { Constructor, Mixin } from "./mixin-core";

const SingMixin = <T extends Constructor<Person>>(Base: T) => {
  return class MSingMixin extends Base {
    singGrade: number = 1;
    constructor(...args: any[]) {
      super(...args);
      this.singGrade = args[0].singGrade;
    }
    play() {
      return super.play() + ` / sing a song, grade: ${this.singGrade}`;
    }
  };
};
export default SingMixin;




