'use strict';

var annotate = require('../');

var expect = require('expect');

function describeIf(name, condition, handler) {
  if (condition) return describe(name, handler);
  return describe.skip(name, handler);
}

describe('annotate(function)', function () {
  it('should parse an anonymous function', function () {

    var args = annotate(function (x, y, z) {});

    expect(args).toEqual(['x', 'y', 'z']);

  });

  it('should parse a named function', function () {
    function fn(x, y, z) {

    }
    expect(annotate(fn)).toEqual(['x', 'y', 'z']);
  });
  it ('should parse a function without argument spaces', function () {
    expect(annotate(function (x,y,z){})).toEqual(['x', 'y', 'z']);
  });

  it('should parse native methods', function () {
    var method = [].slice.bind(null);
    expect(annotate(method)).toEqual([]);
  });
  it('should parse itself', function () {
    expect(annotate(annotate)).toEqual(['fn']);
  });
  it('should parse comments', function () {
    expect(annotate(function (
      // testing
      fn
    ) {})).toEqual(['fn']);
  });
  it('should multi-line comments', function () {
    expect(annotate(function (
      /*
        Hello World.
       */
      fn
    ) {})).toEqual(['fn']);
  });
});

var EVIL = 'eval';

function supportsArrow() {
  try {
    var fn = global[EVIL]('(x => 3)');
    return typeof fn === 'function';
  } catch (ex) {
    return false;
  }
}

function supportsGenerator() {
  try {
    var fn = global[EVIL]('(function *() { yield 3; })');
    return typeof fn === 'function';
  } catch (ex) {
    return false;
  }
}

if (supportsArrow()) {
  require('./arrow');
}

if(supportsGenerator()) {
  require('./generator');
}
