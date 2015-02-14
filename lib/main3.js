import {bootstrap} from './bootstrap3';
bootstrap();

console.log("main angular: " + (typeof angular !== 'undefined' ? angular.version.full : "undefined"));
