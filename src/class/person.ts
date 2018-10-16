
export default class Person {
  name: string;
  constructor(data: { name: string }) {
    this.name = data.name;
  }
  intro() {
    return `name:${this.name}`;
  }
  play() {
    return 'play something normal';
  }

  show() {
    console.log(`${this.intro()} / ${this.play()}`);
  }

  validate(value: number) {
    if (value > 10) {
      return value + ' is too hard for person';
    }
    return '';
  }

  validateBreakWhen(result: string) {
    return !!result;
  }
}
