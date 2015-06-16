'use strict';

module.exports = annotate;

function annotate(fn) {

  if (typeof fn !== 'function') {
    throw new Error('Could not parse function signature for injection dependencies: Object is not a function');
  }

  if (!fn.length) return [];

  var injects = /^function *([^ \(]*) *\(([^\)]*)\)/.exec(fn + '') ||
                  /^()\(?([^)=]*)\)? *=>/.exec(fn + '');

  if (!injects) {
    throw new Error('Could not parse function signature for injection dependencies: ' + fn + '');
  }

  return injects[2].split(',')
  .map(function (arg) {
    return arg && arg.trim();
  })
  .filter(Boolean);
}
