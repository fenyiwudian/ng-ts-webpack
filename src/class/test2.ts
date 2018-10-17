class Test1A {
  a: string;
  b: number;
  c: boolean;
  aa?: string;
  bb?: number;
  cc?: boolean;
  getA() {
    return this.a;
  }
}
type ITest1APick = Pick<Test1A, 'a' | 'b'>;
const dd: ITest1APick = { a: '', b: 1 };

type ITest1APartial = Partial<Test1A>;

const a: ITest1APartial = {};
const at = typeof a.getA;

type NoneStringKeys<T, B> = {
  [P in keyof T]: T[P] extends B ? never : P;
}[keyof T];
type OmitString<T> = Pick<T, Extract<keyof T, NoneStringKeys<T, string>>>;

type III = OmitString<Test1A>;



type BBB = PickByType<Test1A, string>;
type CCC = PickNotType<Test1A, string>;
type DDD = Partial<PickNotType<Test1A, Function>>;

type ITest1ARequired = Required<Test1A>;

const b: ITest1ARequired = {
  a: '', b: 1, c: false,
  aa: '', bb: 1, cc: false,
  getA() { return ''; }
};

type ITest1AReadonly = Readonly<Test1A>;

const c1: ITest1AReadonly = {
  a: '', b: 1, c: true,
  getA() { return ''; }
};
console.log(c1.a);

type ITest1ARecord = Record<'a' | 'b', string>;

const ee: ITest1ARecord = { a: '', b: '' };

type ITest1AInstanceType = InstanceType<typeof Test1A>;

const ff: ITest1AInstanceType = {
  a: '', b: 1, c: true,
  getA() { return ''; }
};
