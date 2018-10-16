
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
//
// mix-with语法糖通过中转的Mixin<T>类型实现了掺元限制的功能
// 但是会让掺元后的结果丢失掺元类的信息,而只留下了基类信息
// 这样变得一点都不好用
// 主要是Mixin的type 定义中返回的是 T类型,而不是 T & {...custom deprive}
// 是的具体的掺元实现信息丢失掉了
// 这是因小失大的做法,除非能找到对中转Mixin<T>的更好的类型定义方法,使得中转后具体掺元实现不会对视
// 否则将会放弃这种用法,而仍然使用原始语法的方式
class Musician extends mix(Person)
  .with<SuperMan>(ComposeMixin, SingMixin, PianoMixin) {
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

// 下面是方法组合测试

// validate这个组合方法用来检查问题
// 任何一层的基类检查出问题都会提前中断检查并将检查出的问题返回
console.log(mu.validate(6));


// collect这个方法会逐层收集信息,并将数据叠加到一个数组中;
console.log(mu.collect());

// export方法会逐层收集信息并粘附到一个对象中
console.log(mu.export());
const exported = mu.export();

console.log(exported.name);

// 用原始语法的掺元不会因为Minix<T>的泛型中转而丢失具体掺元信息
// 虽然不能限制可掺元的类型,但是问题不大
class Musician2 extends ComposeMixin(PianoMixin(SingMixin(Person))) {
  ability: string;
  constructor(data: { name: string, pianoGrade: number, singGrade: number, composeGrade: number }) {
    super(data);
    this.ability = `name:${data.name} pianoGrade: ${data.pianoGrade}`
      + `singGrade:${data.singGrade} composeGrade: ${data.composeGrade}`;
  }
}

const mu2 = new Musician2({ name: 'lqq', pianoGrade: 2, singGrade: 6, composeGrade: 9 });
const exported2 = mu2.export();
// 多重掺元后,无法正确识别掺元后组合方法返回对象的属性
// 这种情况不多,如果出现这样的使用场合,在基类中显示标记返回值格式.
console.log(exported2.composeGrade);
