'use strict';

module.exports = annotate;

function annotate(fn) {

  if (typeof fn !== 'function') {
    throw new Error('Could not parse function signature for injection dependencies: Object is not a function');
  }

  if (!fn.length) return [];

  var injects = /^()\(?([^)=]*)\)? *=>/.exec(fn + '') ||
                /^[^(]+([^ \(]*) *\(([^\)]*)\)/.exec(fn + '');

  if (!injects) {
    throw new Error('Could not parse function signature for injection dependencies: ' + fn + '');
  }

  var argumentString = injects[2]

  // Strip multi-line comments:
  // Uses the lazy-quantifier (.*?): http://www.rexegg.com/regex-quantifiers.html#lazy_solution
  .replace(/\/\*[\S\s]*?\*\//g, ' ')

  // Strip single-line comments:
  .replace(/\/\/.*/g, ' ');

  return argumentString.split(',')
  .map(function (arg) {
    return arg && arg.trim();
  })
  .filter(Boolean);
}
