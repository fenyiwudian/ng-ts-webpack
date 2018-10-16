class A {
  a = 1;
  export() {
    return { a: this.a };
  }
}

class B extends A {
  b = 2;
  export() {
    return {
      ...super.export(),
      b: this.b,
    };
  }
}


class C extends B {
  c = 3;
  export() {
    return {
      ...super.export(),
      c: this.c
    };
  }
}

const c = new C();
c.export();
