import {MyApp} from '../hello';


const firstCom = function(){
    return {
        restrict: 'E',
        template: require('./template.html'),
    }
}

MyApp.directive('firstCom', firstCom);