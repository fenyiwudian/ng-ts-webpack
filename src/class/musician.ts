import Person from "./person";
import ComposeMixin from "./compose-mixin";
import SingMixin from "./sing-mixin";
import PianoMixin from "./piano-mixin";
import { Class } from "../../node_modules/@types/babel-types/index";


class Musician extends Person implements ComposeMixin, SingMixin, PianoMixin {

}


const musician = new Musician();

musician.play();
console.log(ComposeMixin.prototype.play);
