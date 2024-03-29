// typescript完美支持了ES6 class 的掺元方式
// 不要在使用老式的篡改原型的掺元方式
// 具体参照 https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#typescript-22


import { Constructor, Mixin } from "./mixin-core";
import Person from "./person";
export type Mixin<B> = <T extends Constructor<B>>(Base: T) => T;

const ComposeMixin = <T extends Constructor<Person>>(Base: T) => {
  return class MComposeMixin extends Base {
    composeGrade: number = 1;
    constructor(...args: any[]) {
      super(...args);
      this.composeGrade = args[0].composeGrade;
    }
    play() {
      return 'compose a song grade: ' + this.composeGrade;
    }
    validate(value: number) {
      const baseResult = super.validate(value);
      if (this.validateBreakWhen(baseResult)) {
        return baseResult;
      }
      if (value > this.composeGrade) {
        return value + 'value is too hard for compose';
      }
    }

    collect() {
      return super.collect().concat(['compose', this.composeGrade.toString()]);
    }

    export() {
      return {
        ...super.export(),
        composeGrade: this.composeGrade,
      };
    }
  };
};
export default ComposeMixin;
