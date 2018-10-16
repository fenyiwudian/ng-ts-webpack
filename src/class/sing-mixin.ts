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

    validate(value: number) {
      const baseResult = super.validate(value);
      if (this.validateBreakWhen(baseResult)) {
        return baseResult;
      }
      if (value > this.singGrade) {
        return value + 'value is too hard for sing';
      }
    }

    collect() {
      return super.collect().concat(['sing', this.singGrade.toString()]);
    }

    export() {
      return {
        ...super.export(),
        singGrade: this.singGrade,
      };
    }
  };
};
export default SingMixin;




