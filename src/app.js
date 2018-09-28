import angular from 'angular';
export default angular.module('MyApp', []);

const $injector = angular.injector(['ng']);

export const $timeout = $injector.get('$timeout');
export const $http = $injector.get('$http');
export const $q = $injector.get('$q');
export const $compile = $injector.get('$compile');