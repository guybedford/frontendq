import {bootstrap} from './bootstrap3';
bootstrap().then(function(m) {
  console.log("main angular: " + (typeof m !== 'undefined' ? m.version.full : "undefined"));  
});


