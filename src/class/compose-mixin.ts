// typescript完美支持了ES6 class 的掺元方式
// 不要在使用老式的篡改原型的掺元方式
// 具体参照 https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#typescript-22


import { Constructor } from "./mixin";
import Person from "./person";


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
  };
};
export default ComposeMixin;
