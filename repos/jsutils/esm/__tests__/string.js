'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var _method = require("../method");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Str = require('../string');

describe('/string', function () {
  beforeEach(function () {
    return jest.resetAllMocks();
  });
  describe('camelCase', function () {
    it('should convert a string to camel case', function () {
      expect(Str.camelCase('CAMEL_CASE')).toEqual('camelCase');
    });
    it('should handle spaces', function () {
      expect(Str.camelCase('CAMEL case')).toEqual('camelCase');
    });
    it('should handle dashs', function () {
      expect(Str.camelCase('CAmEL_case')).toEqual('camelCase');
    });
    it('should handle a mix of spaces dashes and low dashes', function () {
      expect(Str.camelCase('CAm_EL cas-e')).toEqual('camElCasE');
    });
  });
  describe('clean', function () {
    it('should clean a string by removing _ and -', function () {
      expect(Str.cleanStr('STRING_CLEAN-DASH')).toEqual('STRING CLEAN DASH');
    });
  });
  describe('capitalize', function () {
    it('should capitalize the first letter of a string', function () {
      var dirty = 'first letter Capitalize';
      var clean = 'First letter capitalize';
      var cleaned = Str.capitalize(dirty);
      expect(cleaned).toEqual(clean);
    });
    it('should lowerCase other characters', function () {
      var dirty = 'first letter capitalize';
      var cleaned = Str.capitalize(dirty);
      expect(cleaned.indexOf('Capitalize')).toEqual(-1);
    });
    it('should return passed in data when data is not a string', function () {
      var dirty = {};
      var cleaned = Str.capitalize(dirty);
      expect(cleaned).toEqual(dirty);
    });
  });
  describe('isStr', function () {
    it('should check if some data is a string', function () {
      var amString = 'I am a string';
      var notString = {};
      expect(Str.isStr(amString)).toEqual(true);
      expect(Str.isStr(notString)).toEqual(false);
    });
  });
  describe('isEmail', function () {
    it('should check if some data is a email string', function () {
      var amValid1 = 'lt@test.com';
      var amValid2 = 's@e.co';
      var notValid1 = {};
      var notValid2 = 'failed$test.com';
      var notValid3 = 'failed@test';
      expect(Str.isEmail(amValid1)).toEqual(true);
      expect(Str.isEmail(amValid2)).toEqual(true);
      expect(Str.isEmail(notValid1)).toEqual(false);
      expect(Str.isEmail(notValid2)).toEqual(false);
      expect(Str.isEmail(notValid3)).toEqual(false);
    });
  });
  describe('isPhone', function () {
    it('should check if some data is a phone number string', function () {
      var amValid1 = '1231231234';
      var amValid2 = '123-123-1234';
      var notValid1 = {};
      var notValid2 = '1w2123123R';
      var notValid3 = '623-123-12345';
      expect(Str.isPhone(amValid1)).toEqual(true);
      expect(Str.isPhone(amValid2)).toEqual(true);
      expect(Str.isPhone(notValid1)).toEqual(false);
      expect(Str.isPhone(notValid2)).toEqual(false);
      expect(Str.isPhone(notValid3)).toEqual(false);
    });
  });
  describe('isUrl', function () {
    it('should check if some data is a url string', function () {
      var amValid1 = 'www.test.com';
      var amValid2 = 'test.com';
      var amValid3 = 'https://pass.com';
      var amValid4 = 'http://www.pass.com';
      var notValid1 = {};
      var notValid2 = 'test';
      var notValid3 = 'https://fail';
      expect(Str.isUrl(amValid1)).toEqual(true);
      expect(Str.isUrl(amValid2)).toEqual(true);
      expect(Str.isUrl(amValid3)).toEqual(true);
      expect(Str.isUrl(amValid4)).toEqual(true);
      expect(Str.isUrl(notValid1)).toEqual(false);
      expect(Str.isUrl(notValid2)).toEqual(false);
      expect(Str.isUrl(notValid3)).toEqual(false);
    });
  });
  describe('isUuid', function () {
    it('should check if some data is a uuid string', function () {
      var amValid1 = "d3aa88e2-c754-41e0-8ba6-4198a34aa0a2";
      var amValid2 = (0, _method.uuid)();
      var notValid1 = "abcdef00-0000-0000-0000-000000000000";
      var notValid2 = "d3aa88e2-c754-41ex-8ba6-4198a34aa0a2";
      var notValid3 = '123-123-12345-432-1';
      expect(Str.isUuid(amValid1)).toEqual(true);
      expect(Str.isUuid(amValid2)).toEqual(true);
      expect(Str.isUuid(notValid1)).toEqual(false);
      expect(Str.isUuid(notValid2)).toEqual(false);
      expect(Str.isUuid(notValid3)).toEqual(false);
    });
  });
  describe('parseJSON,', function () {
    it('should parse json string into an object', function () {
      var amString = JSON.stringify({
        test: 'I am a string'
      });
      expect(_typeof(amString)).toEqual('string');
      expect(_typeof(Str.parseJSON(amString))).toEqual('object');
    });
    it('should call console.error and not throw on invalid json', function () {
      var consoleErr = console.error;
      console.error = jest.fn();
      var amString = JSON.stringify({
        test: 'I am a string'
      }) + '#$^$#';
      var notObj = Str.parseJSON(amString);
      expect(console.error).toHaveBeenCalled();
      expect(notObj).toEqual(null);
      console.error = consoleErr;
    });
  });
  describe('plural', function () {
    it('adds s to word not ending in s', function () {
      expect(Str.plural('string')).toEqual('strings');
    });
    it('does not add s to word ending in s', function () {
      expect(Str.plural('strings')).toEqual('strings');
    });
  });
  describe('removeDot', function () {
    it('should remove . from start and end of a string', function () {
      expect(Str.removeDot('.string.')).toEqual('string');
      expect(Str.removeDot('.string')).toEqual('string');
      expect(Str.removeDot('string.')).toEqual('string');
    });
    it('does change a string with not dots', function () {
      expect(Str.removeDot('string')).toEqual('string');
    });
  });
  describe('sanitize', function () {
    it('should strip html from string', function () {
      var dirty = '<p>This is the dirty string</p>';
      var clean = '&lt;p&gt;This is the dirty string&lt;/p&gt;';
      var cleaned = Str.sanitize(dirty);
      expect(cleaned).toEqual(clean);
    });
  });
  describe('singular', function () {
    it('removes s from word ending in s', function () {
      expect(Str.singular('strings')).toEqual('string');
    });
    it('does not modify string not ending in s', function () {
      expect(Str.singular('string')).toEqual('string');
    });
  });
  describe('styleCase', function () {
    it('should convert a string into style case', function () {
      expect(Str.styleCase('background-color')).toEqual('backgroundColor');
    });
    it('should handle spaces', function () {
      expect(Str.styleCase('background color')).toEqual('backgroundColor');
    });
    it('should handle low dashes', function () {
      expect(Str.styleCase('background-color')).toEqual('backgroundColor');
    });
    it('should handle mixed spaces dashes and low dashes', function () {
      expect(Str.styleCase('-background color_')).toEqual('backgroundColor');
    });
  });
  describe('trainCase', function () {
    it('should convert a string into train case', function () {
      var testString = 'I am A strIng';
      var trainCase = Str.trainCase(testString);
      expect(trainCase).toEqual('i-am-a-str-ing');
    });
    it('should return passed in data when data is not a string', function () {
      var dirty = {};
      var cleaned = Str.trainCase(dirty);
      expect(cleaned).toEqual(dirty);
    });
  });
  describe('wordCaps', function () {
    it('should capitalize each word of a string', function () {
      expect(Str.wordCaps('i should be capitalized')).toEqual('I Should Be Capitalized');
    });
    it('should make all chars lowercase except the first', function () {
      expect(Str.wordCaps('i shOuld bE caPitalized')).toEqual('I Should Be Capitalized');
    });
  });
  describe('snakeCase', function () {
    var cases = ['fooBar', 'foo_bar', 'FOO_BAR', 'FooBar', 'FooBAR', 'foo-bar', 'foo-BAR', 'Foo-Bar', 'FOO-BAR', 'Foo Bar', 'foo bar'];
    cases.map(function (str) {
      it("should convert ".concat(str, " to snake case"), function () {
        var result = Str.snakeCase(str);
        expect(result).toEqual('foo_bar');
      });
    });
    it('should leave a single word unchanged', function () {
      var word = 'foo';
      expect(Str.snakeCase(word)).toEqual('foo');
    });
  });
  describe('mapString', function () {
    it('should map each character', function () {
      var result = Str.mapString('test', function (c) {
        return c === 's' ? 'x' : c;
      });
      expect(result).toEqual('text');
    });
  });
});