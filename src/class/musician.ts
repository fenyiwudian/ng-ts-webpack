
import Person from "./person";
import ComposeMixin from "./compose-mixin";
import SingMixin from "./sing-mixin";
import PianoMixin from "./piano-mixin";
import { mix, Constructor } from "./mixin-core";

const a = () => {
  return 'undefined';
};

class SuperMan extends Person {

}


class NNN {
  nnn: string;
  constructor(data: { nnn: string }) {
    this.nnn = data.nnn;
  }
  hello() {
    console.log('hellow');
  }
}

const NnnMixin = <T extends Constructor<NNN>>(Base: T) => {
  return class extends Base {
    mmm: string;
    constructor(...args: any[]) {
      super(...args);
      this.mmm = args[0].mmm;
    }
    myHello() {
      this.hello();
      console.log('me');
    }
  };
};

class YYY {
  name: string;
}
const YyyMixin = <T extends Constructor<YYY>>(Base: T) => {
  return class extends Base {
    sss: string;
  };
};

// 继承Person并掺元ComposeMixin, SingMixin, PianoMixin
// 同时在调用with的时候通过泛型指定了掺元类型限制
// 这时候如果尝试掺元一个非为SuperMan或器子集准备的掺元,则会报错,
// 如: 尝试掺元NnnMixin会报错,因为NNN类中的nnn属性在SuperMan中不存在,
// 而Nnn掺元是针对NNN的,极有可能会使用到nnn,而SuperMan上却不存在而出错,这是危险的
// 而掺元YyyMixin却是可以的,因为Yyy掺元从形式上属于SuperMan的子集,
// 任何在Yyy可能使用到类成员都能在SuperMan中找到,这是安全的
class Musician extends mix(Person)
.with<SuperMan>(ComposeMixin, SingMixin, PianoMixin, /*NnnMixin YyyMixin*/) {
  ability: string;
  constructor(data: { name: string, pianoGrade: number, singGrade: number, composeGrade: number }) {
    super(data);
    this.ability = `name:${data.name} pianoGrade: ${data.pianoGrade}`
      + `singGrade:${data.singGrade} composeGrade: ${data.composeGrade}`;
  }
}
// @ts-ignore
const mu = window.mu = new Musician({ name: 'lqq', pianoGrade: 2, singGrade: 6, composeGrade: 9 });

mu.show();
console.log(mu.validate(6));
