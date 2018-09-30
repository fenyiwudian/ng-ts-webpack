
// 此处展示了用语言级模块放置导入angular内置服务的方式
import {MyApp} from '../app';
// 直接导入样式,在webpack.config.ts配置文件中指定了对应的
// less-loader/css-loader/style-loader处理导入的less文件,
// webapck编译的时候会将样式放到head中
import './style.less';

import i18n from '../service/i18n';

class PersonDetailController {
    // 依赖注入
    static $inject = ['$element'];
    person: {
        name: string,
        gold: number,
        attack: number,
        armor: number,
    };
    $element: JQuery;
    // 依赖项会被注入到构造函数
    constructor($element: JQuery) {
        this.person = {
            name: 'laiq',
            gold: 100,
            attack: 100,
            armor: 100,
        }
        this.$element = $element;
    }
    // component的生命周期函数之一
    $postLink() {
        var $img = $('<img/>');
        $img.attr({
            'src': require('../../assets/man.jpg'),
            'width': 350,
            'height': 200,
        })
        const $partial = this.$element.find('.partial')
        $partial.append($img);
        const message = i18n.translate('LANG.person.message', this.person);
        $partial.append(`<div>${message}</div>`);
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

MyApp.component('personDetail', {
    // 不再用templateUrl,而是直接template,内容是从基本文件中
    // 依赖过来的,webpack编译的时候会按照webpack.config.ts中指定的pug-loader
    // 编译时,将pug转成html并替换到这里.
    template: require('./template.pug')(),
    controller: PersonDetailController,
});