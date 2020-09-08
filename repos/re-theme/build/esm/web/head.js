import { isArr } from '@keg-hub/jsutils';
import { l as Consumer, P as Provider, k as ReThemeProvider } from './headContext-19a2409a.js';
import { b as _objectWithoutProperties, a as _extends, h as hasDomAccess, f as _inherits, g as _createSuper, i as _createClass, j as _classCallCheck } from './_rollupPluginBabelHelpers-8470caf4.js';
import React__default, { useRef, useEffect, Component } from 'react';
import { createPortal } from 'react-dom';

var canUseDOM = hasDomAccess();
var HeadElement = function HeadElement(props) {
  var Tag = props.tag,
      style = props.style,
      id = props.id,
      tagProps = _objectWithoutProperties(props, ["tag", "style", "id"]);
  var name = tagProps.name,
      property = tagProps.property;
  var indexRef = useRef(-1);
  var headTagsRef = useRef(null);
  var children = Tag === 'style' && style || props.children;
  useEffect(function () {
    indexRef.current = headTagsRef.current.addTag(Tag, id);
    return function () {
      headTagsRef.current.removeTag(Tag, indexRef.current, id);
    };
  }, [Tag, name, property, style]);
  return React__default.createElement(Consumer, null, function (headTags) {
    headTagsRef.current = headTags;
    return canUseDOM && headTags.shouldRender(Tag, indexRef.current, id) && createPortal( React__default.createElement(Tag, _extends({}, tagProps, {
      id: id,
      children: children
    })), document.head);
  });
};

var Title = function Title(props) {
  return React__default.createElement(HeadElement, _extends({
    tag: "title"
  }, props));
};
var Style = function Style(props) {
  return React__default.createElement(HeadElement, _extends({
    tag: "style"
  }, props));
};
var Meta = function Meta(props) {
  return React__default.createElement(HeadElement, _extends({
    tag: "meta"
  }, props));
};
var Link = function Link(props) {
  return React__default.createElement(HeadElement, _extends({
    tag: "link"
  }, props));
};

var HeadProvider = function (_Component) {
  _inherits(HeadProvider, _Component);
  var _super = _createSuper(HeadProvider);
  function HeadProvider() {
    var _this;
    _classCallCheck(this, HeadProvider);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.ids = new Map();
    _this.canUseDOM = hasDomAccess();
    _this.state = {
      addTag: function addTag(tag, id) {
        var tags = _this.ids.get(id) || [];
        tags.push(tag);
        _this.ids.set(id, tags);
        return tags.length - 1;
      },
      shouldRender: function shouldRender(tag, index, id) {
        return !_this.state.enforceId(tag, id);
      },
      removeTag: function removeTag(tag, index, id) {
        var tags = _this.ids.get(id);
        if (!isArr(tags)) return;
        index = index || tags.indexOf(tag);
        tags = index >= -1 && tags.splice(index, 1);
        !tags.length ? _this.ids["delete"](id) : _this.ids.set(id, tags);
      },
      hasHash: function hasHash(hash) {
        var tags = _this.ids.get(hash);
        return Boolean(tags && tags.length);
      },
      enforceId: function enforceId(tag, id) {
        var tags = _this.ids.get(id) || [];
        if (tags.includes(tag)) return id;
        _this.state.addTag(tag, id);
        return false;
      }
    };
    return _this;
  }
  _createClass(HeadProvider, [{
    key: "render",
    value: function render() {
      return this.canUseDOM && React__default.createElement(Provider, {
        value: this.state
      }, this.props.children);
    }
  }]);
  return HeadProvider;
}(Component);

var ReThemeHeadProvider = function ReThemeHeadProvider(props) {
  return React__default.createElement(ReThemeProvider, props, React__default.createElement(HeadProvider, null, props.children));
};

export { HeadProvider, Link, Meta, ReThemeHeadProvider, Style, Title };
//# sourceMappingURL=head.js.map
