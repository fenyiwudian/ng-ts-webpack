
import Person from "./person";
import ComposeMixin from "./compose-mixin";
import SingMixin from "./sing-mixin";
import PianoMixin from "./piano-mixin";

class Musician extends PianoMixin(SingMixin(ComposeMixin(Person))) {
  ability: string;
  constructor(data: { name: string, pianoGrade: number, singGrade: number, composeGrade: number }) {
    super(data);
    this.ability = `name:${data.name} pianoGrade: ${data.pianoGrade}`
      + `singGrade:${data.singGrade} composeGrade: ${data.composeGrade}`;
  }
}

const mu = new Musician({ name: 'lqq', pianoGrade: 2, singGrade: 3, composeGrade: 4 });

mu.show();
