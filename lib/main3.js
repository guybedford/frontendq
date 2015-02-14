import {bootstrap} from './bootstrap3';
bootstrap();

console.log("main foo: " + (typeof foo !== 'undefined' ? foo.version.full : "undefined"));
console.log("main angular: " + (typeof angular !== 'undefined' ? angular.version.full : "undefined"));
