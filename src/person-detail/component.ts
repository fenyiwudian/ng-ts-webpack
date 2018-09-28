import MyApp, {$timeout} from '../app';
import './style.less';
$timeout(() => {
    console.log(' immediately hehe after haha');
}, 1000);
console.log('immediately haha');

class PersonDetailController {
    person: any;
    $element: any;
    constructor(_$scope: any, $element: any) {
        console.log(arguments);
        this.person = {
            name: 'laiq',
            gold: 100,
            attack: 100,
            armor: 100,
        }
        this.$element = $element;
        $timeout(() => {
            console.log('hehe after haha');
        }, 1000);
        console.log('haha');

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

    changeGold(gold: number) {
        this.person.gold += gold;
    }

    changeAttack(attack: number) {
        this.person.attack += attack;
    }

    changeArmor(armor: number) {
        this.person.armor += armor;
    }
}
PersonDetailController.$inject = ['$scope', '$element'];

MyApp.component('personDetail', {
    template: require('./template.pug')(),
    controller: PersonDetailController,
});