export function bootstrap() {
  return System.import('angular').then(function(m) {
    console.log("bootstrap cb m: " + (typeof m !== 'undefined' ? m.version.full : "undefined"));
    console.log("bootstrap cb angular: " + (typeof angular !== 'undefined' ? angular.version.full : "undefined"));
    return m;
  });
  console.log("bootstrap angular: " + (typeof angular !== 'undefined' ? angular.version.full : "undefined"));
}
