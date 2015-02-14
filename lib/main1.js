import {bootstrap} from './bootstrap1';
bootstrap();

console.log("main angular: " + (typeof angular !== 'undefined' ? angular.version.full : "undefined"));
