console.log('init Person module start');
export default class Person {
  name: string;
  constructor(name = 'no name') {
    this.name = name;
  }
  play() {
    console.log('play something normal');
  }
}
console.log('init Person module end');
