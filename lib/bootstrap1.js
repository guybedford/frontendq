import 'angular';

export function bootstrap() {
  console.log("bootstrap angular: " + (typeof angular !== 'undefined' ? angular.version.full : "undefined"));
}

