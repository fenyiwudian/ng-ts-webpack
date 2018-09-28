import MyApp from '../app';
import './style.less';

class PersonDetailController {
    constructor(_$scope, $element) {
        console.log(arguments);
        this.person = {
            name: 'laiq',
            gold: 100,
            attack: 100,
            armor: 100,
        }
        this.$element = $element;
    }

    $postLink() {
        var $img = $('<img/>');
        $img.attr({
            'src': require('../../assets/man.jpg'),
            'width': 350,
            'height': 200,
        })
        this.$element.find('.partial').append($img);
    }

    changeGold(gold) {
        this.person.gold += gold;
    }

    changeAttack(attack) {
        this.person.attack += attack;
    }

    changeArmor(armor) {
        this.person.armor += armor;
    }
}
PersonDetailController.$inject = ['$scope', '$element'];

MyApp.component('personDetail', {
    template: require('./template.pug')(),
    controller: PersonDetailController,
});