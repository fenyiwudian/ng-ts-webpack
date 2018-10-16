

export type Constructor<T> = new (...args: any[]) => T;
class Name {
  name: string;
  constructor(data: { name: string }) {
    this.name = data.name;
  }
}

class Name2 {
  name: string;
  haha: string;
  constructor(data: { name: string }) {
    this.name = data.name;
  }
}

class Not {
  name1: string;
  haha: string;
  constructor(data: { name: string }) {
    this.name1 = data.name;
  }
}

/**
 * 生成一个掺元age能力掺元工厂,任何满足类型Name格式的类型都可以有资格掺元age能力
 * 不满足Name的格式的类型无法掺元该age能力
 * @param Base 基类
 */
const AgeMixin = <T extends Constructor<Name>>(Base: T) => {
  return class extends Base {
    age: number;
    constructor(...args: any[]) {
      super(...args);
      // super();
      this.age = args[0].age;
    }
  };
};
// Name就是Name,当然满足Name所要求的格式,可以掺元age能力
class Person extends AgeMixin(Name) {
  gender: string;
  constructor(data: { age: number, name: string, gender: string }) {
    super(data);
    this.gender = data.gender;
  }
}

const person = new Person({ name: 'someone', age: 10, gender: 'male' });

// Name2是Name的超集,当然满足Name的格式,也可以掺元age能力
class Person2 extends AgeMixin(Name2) {
  gender: string;
  constructor(data: { age: number, name: string, gender: string }) {
    super(data);
    this.gender = data.gender;
  }
}
// Not不满足Name类型的格式,无法掺元age能力,会报错
// class Person3 extends AgeMixin(Not) {
//   gender: string;
//   constructor(data: { age: number, name: string, gender: string }) {
//     super(data);
//     this.gender = data.gender;
//   }
// }
