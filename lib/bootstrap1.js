export { default as angular } from 'angular';

export function bootstrap() {
  console.log("bootstrap angular: " + (typeof angular !== 'undefined' ? angular.version.full : "undefined"));
}

