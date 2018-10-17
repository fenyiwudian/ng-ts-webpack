


const AAAAMixin = <T extends Constructor<AAAA>>(Base: T) => {
  return class extends Base {
    gold: string;
  };
};

class AAAA {
  name: string;
  age: number;
  show() {
    return '';
  }
}


class AAAAExt extends AAAAMixin(AAAA) {
  hehe() {
    console.log(this.gold, this.name);
  }
}
// 掺元不能直接掺元到自身,必须提出基类
