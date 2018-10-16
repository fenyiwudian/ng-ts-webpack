import { Constructor, Mixin } from "./mixin-core";
import Person from "./person";


const PianoMixin = <T extends Constructor<Person>>(Base: T) => {
  return class MPianoMixin extends Base {
    pianoGrade: number = 1;
    constructor(...args: any[]) {
      super(...args);
      this.pianoGrade = args[0].pianoGrade;
    }
    play() {
      return super.play() + ' / play piano grade: ' + this.pianoGrade;
    }
  };
};

export default PianoMixin;
