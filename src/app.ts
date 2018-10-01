
//
// angularjs模块是依附在全局window上的,没有使用umd和amd,
// 但是其types定义却是作为umd和amd方式定义的,这是矛盾的
// 这导致
// 1. 如果直接使用window上面的angular对象会不满足@types中的定义会报错.
// 2. 如果尝试import angular 则满足了@type的要求,
// 但是angular不是umd/amd的,import进来的东西会是一个空对象,导致代码无法运行
// 综合考虑,我们使用第一种方式,通知明确指定@ts-ignore绕过import检查,同时
// angular又能得到ts类型检测支持
//

// 在es5环境下编程时,angular的依赖注入机制被充分利用来
// 对代码进行模块划分,使用了很多service,factory等,
// 使用es6或者typescript的模块编程之后,angular自带的依赖注入模块划分已经变得很不重要,
// (依赖注入相对于语言级模块划分而言,编程起来更蹩脚)
// 我们不会再用service和factory来创建模块,依赖注入的使用场合将变得非常少,
// 大部分都能能用语言模块替换
// 当然也无法避免很多模块要使用到angular内置的服务,因为我们已经摒弃了依赖注入
// 所这些内置服务可以向下面一样从某个模块统一导出,以便其他模块可以直接用语言级
// 模块方式导入,而不再使用蹩脚的依赖注入


// 在组件控制器中如果需要使用$scope,$element则依然要使用以来注入
// 这种情况,因为组件的控制器已经改为一个class,所以依赖项会被注入到构造函数中.
// 而依赖项正好使用这个class的静态属性$inject来指定,
// 这个使用方法在在person-detail/component.ts有演示.

// 在person-detail/component.ts中有演示直接导入$timeout
import i18n from './service/i18n';
// @ts-ignore
export const ng = angular;
export const MyApp = ng.module('MyApp', ['pascalprecht.translate']);
const $injector = ng.injector(['ng', 'pascalprecht.translate']);
export const $timeout = $injector.get('$timeout');
export const $http = $injector.get('$http');
export const $q = $injector.get('$q');
export const $compile = $injector.get('$compile');


interface IBuildInNgService {
    $filter: angular.IFilterService;
    $timeout: angular.ITimeoutService;
    $http: angular.IHttpService;
    $compile: angular.ICompileService;
    $q: angular.IQService;
}
export const $service: IBuildInNgService = {
    $timeout: $injector.get('$timeout'),
    $http: $injector.get('$http'),
} as any;


MyApp.run(['$filter', '$timeout', '$http', '$q', '$compile', (
    filter: any,
    timeout: any,
    http: any,
    q: any,
    compile: any) => {
    $service.$filter = filter;
    $service.$timeout = timeout;
    $service.$http = http;
    $service.$q = q;
    $service.$compile = compile;
}]);

i18n.load().then(({ data, code }) => {
    MyApp.config(['$translateProvider', function ($translateProvider: any) {
        $translateProvider.translations(code, data);
        $translateProvider.preferredLanguage(code);
    }]);
    ng.bootstrap(document.body, ['MyApp']);
});
