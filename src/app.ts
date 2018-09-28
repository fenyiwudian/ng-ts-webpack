
//
// angularjs模块是依附在全局window上的,没有使用umd和amd,
// 但是其types定义却是作为umd和amd方式定义的,这是矛盾的
// 这导致
// 1. 如果直接使用window上面的angular对象会不满足@types中的定义会报错.
// 2. 如果尝试import angular 则满足了@type的要求,
// 但是angular不是umd/amd的,import进来的东西会是一个空对象,导致代码无法运行
// 综合考虑,我们使用第一种方式,通知明确指定
//

// @ts-ignore
export default angular.module('MyApp', []);
// @ts-ignore
const $injector = angular.injector(['ng']);
export const $timeout = $injector.get('$timeout');
export const $http = $injector.get('$http');
export const $q = $injector.get('$q');
export const $compile = $injector.get('$compile');