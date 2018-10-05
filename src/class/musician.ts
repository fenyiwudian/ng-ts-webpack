console.log('init musician module start');
import Person from "./person";
import ComposeMixin from "./compose-mixin";
import SingMixin from "./sing-mixin";
import PianoMixin from "./piano-mixin";


class Musician extends Person implements ComposeMixin, SingMixin, PianoMixin {

}
export default Musician;

console.log('init musician module end');
