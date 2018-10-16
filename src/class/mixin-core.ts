
export type Constructor<T> = new (...args: any[]) => T;
export type Mixin<B> = <T extends Constructor<B>>(Base: T) => T;

export const mix = <T extends Constructor<any>>(superclass: T) => {
  return new MixinBuilder(superclass);
};

class MixinBuilder<T extends Constructor<any>> {
  private superclass: T;
  constructor(superclass: T) {
    this.superclass = superclass || class { } as any;
  }

  with<M>(...mixins: Array<Mixin<M>>) {
    return mixins.reduce((c, m) => m(c), this.superclass);
  }
}
