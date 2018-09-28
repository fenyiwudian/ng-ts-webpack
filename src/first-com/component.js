import {MyApp} from '../hello';


class FirstCom {

    constructor($scope, $element, $attrs){
        console.log($scope, $element, $attrs);
        this.person = {
            name: 'laiq',
            gold: 100,
            attack: 100,
            armor: 100,
        }
    }

    changeGold(gold){
        this.person.gold += gold;
    }

    changeAttack(attack){
        this.person.attack += attack;
    }

    changeArmor(armor){
        this.person.armor += armor;
    }
}

MyApp.component('firstCom', {
    template: require('./template.html'),
    controller: FirstCom,
});