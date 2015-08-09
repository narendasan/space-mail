(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/npm-container/index.js                                                     //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
Meteor.npmRequire = function(moduleName) {                                             // 1
  var module = Npm.require(moduleName);                                                // 2
  return module;                                                                       // 3
};                                                                                     // 4
                                                                                       // 5
Meteor.require = function(moduleName) {                                                // 6
  console.warn('Meteor.require is deprecated. Please use Meteor.npmRequire instead!'); // 7
  return Meteor.npmRequire(moduleName);                                                // 8
};                                                                                     // 9
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
