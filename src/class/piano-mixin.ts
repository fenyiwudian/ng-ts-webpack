import { Constructor } from "./mixin";
import Person from "./person";
import { thisTypeAnnotation } from "babel-types";


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
