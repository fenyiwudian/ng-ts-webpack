import SecondClass from "./circular-depend/SecondClass";


class Injector {
  services: { [key: string]: any } = {};

  get(name: 'SecondClass'): typeof SecondClass;
  get(name: string): any {
    return this.services[name];
  }
  register(name: 'SecondClass', service: typeof SecondClass): void;
  register(name: string, service: any) {
    if (this.services[name]) {
      throw new Error(`名为${name}的服务已经存在`);
    }
    this.services[name] = service;
  }
}

const injector = new Injector();

export { injector as default };

window.loadDebugger = function () {
  Object.assign(window, injector.services);
};




