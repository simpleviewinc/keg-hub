'use strict';

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

var Url = require('../url');

describe('/url', function () {
  beforeEach(function () {
    return jest.resetAllMocks();
  });
  describe('queryToObj', function () {
    it('should return a valid object with querystring items', function () {
      var obj = Url.queryToObj('?name=daniel&id=5');
      expect(obj.name).toEqual('daniel');
      expect(obj.id).toEqual('5');
      var obj2 = Url.queryToObj('????????name=daniel&id=5');
      expect(obj2.name).toEqual('daniel');
      expect(obj2.id).toEqual('5');
      var obj3 = Url.queryToObj('/hello?name=daniel&id=5');
      expect(obj3.name).toEqual('daniel');
      expect(obj3.id).toEqual('5');
      var obj4 = Url.queryToObj('?name=some%20sentence%20with%20spaces');
      expect(obj4.name).toEqual('some sentence with spaces');
    });
    it('should return a valid object given array', function () {
      var obj = Url.queryToObj('?names=daniel,foo,man&id=5');
      expect(obj.names).toEqual(expect.arrayContaining(['daniel', 'foo', 'man']));
      expect(obj.id).toEqual('5');
      var obj2 = Url.queryToObj('?names=daniel,&id=5');
      expect(obj2.names).toEqual(expect.arrayContaining(['daniel']));
      expect(obj2.id).toEqual('5');
      var obj3 = Url.queryToObj('?name=daniel&groups=1%2C2%2C3');
      expect(obj3.groups).toEqual(expect.arrayContaining(['1', '2', '3']));
      expect(obj3.name).toEqual('daniel');
    });
    it('should return the last set of valid querystring items', function () {
      var obj = Url.queryToObj('?name=daniel&id=5^^^*^*^*^*^*^foo=bar');
      expect(obj.name).toEqual('daniel');
      expect(obj.id).toEqual('5^^^*^*^*^*^*^foo=bar');
      expect(obj.foo).toEqual(undefined);
      var obj2 = Url.queryToObj('?color=foobar???name=daniel&id=5');
      expect(obj2.name).toEqual('daniel');
      expect(obj2.id).toEqual('5');
      expect(obj.color).toEqual(undefined);
    });
    it('should return empty object on invalid querystring', function () {
      var obj = Url.queryToObj('just some random string?');
      expect(obj).toEqual({});
      var obj3 = Url.queryToObj('just some random string');
      expect(obj3).toEqual({});
    });
    it('should combine duplicate keys into array', function () {
      var obj = Url.queryToObj('?names=daniel&names=foo');
      expect(obj.names).toEqual(expect.arrayContaining(['daniel', 'foo']));
      var obj2 = Url.queryToObj('?names=&names=foo');
      expect(obj2.names).toEqual(expect.arrayContaining(['foo', '']));
    });
  });
  describe('isValidUrl', function () {
    it('should return TRUE for valid urls', function () {
      var urls = ["https://google.com?name=daniel&id=1", "http://google.com????", "https://www.google.uk", "https://zsales.zerista.com"];
      urls.map(function (url) {
        expect(Url.isValidUrl(url)).toBe(true);
      });
    });
    it('should return FALSE for invalid urls', function () {
      var urls = ["hasdfas://google.com?name=daniel&id=1", "//google.com????", "htp://www.google.uk", "zsales.zerista.com"];
      urls.map(function (url) {
        expect(Url.isValidUrl(url)).toBe(false);
      });
    });
  });
  describe('objToQuery', function () {
    it('return a valid querystring from the given object with strings', function () {
      var obj = {
        name: 'daniel',
        food: 'pasta'
      };
      var result = Url.objToQuery(obj);
      expect(result).toEqual('?name=daniel&food=pasta');
      var obj2 = {
        name: 'some sentence with spaces'
      };
      var result2 = Url.objToQuery(obj2);
      expect(result2).toEqual('?name=some%20sentence%20with%20spaces');
    });
    it('return a valid querystring from the given object with number', function () {
      var obj = {
        name: 'daniel',
        id: 100
      };
      var result = Url.objToQuery(obj);
      expect(result).toEqual('?name=daniel&id=100');
    });
    it('return a valid querystring from the given object with nested object', function () {
      var obj = {
        name: 'daniel',
        id: {
          foo: 'bar'
        }
      };
      var result = Url.objToQuery(obj); // just appends the nested object via JSON string

      expect(result).toEqual('?name=daniel&id=%7B%22foo%22%3A%22bar%22%7D');
    });
    it('return a valid querystring from the given object with boolean', function () {
      var obj = {
        name: 'daniel',
        alive: true
      };
      var result = Url.objToQuery(obj); // just appends the nested object via JSON string

      expect(result).toEqual('?name=daniel&alive=true');
    });
    it('should convert array object for commas', function () {
      var obj = {
        name: 'daniel',
        groups: [1, 2, 3]
      };
      var result = Url.objToQuery(obj);
      expect(result).toEqual('?name=daniel&groups=1%2C2%2C3');
    });
    it('should return valid inputs only, invalid inputs are excluded', function () {
      var obj = {
        name: 'daniel',
        func: function func() {}
      };
      var result = Url.objToQuery(obj);
      expect(result).toEqual('?name=daniel');
    });
    it('should return emptystring on null or empty obj', function () {
      expect(Url.objToQuery({})).toEqual('');
      expect(Url.objToQuery(null)).toEqual('');
    });
  });
});