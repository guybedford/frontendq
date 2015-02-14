import 'angular';

export function bootstrap() {
  console.log("bootstrap foo: " + (typeof foo !== 'undefined' ? foo.version.full : "undefined"));
  console.log("bootstrap angular: " + (typeof angular !== 'undefined' ? angular.version.full : "undefined"));
}

