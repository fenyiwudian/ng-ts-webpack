export default class Person {
  name: string;
  constructor(name = 'no name') {
    this.name = name;
  }
  play() {
    console.log('play something normal');
  }
}
