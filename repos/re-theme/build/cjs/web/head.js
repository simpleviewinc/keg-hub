'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jsutils = require('@keg-hub/jsutils');
var headContext = require('./headContext-f5c05ebe.js');
var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-ab0fb5b1.js');
var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = require('react-dom');

var canUseDOM = _rollupPluginBabelHelpers.hasDomAccess();
var HeadElement = function HeadElement(props) {
  var Tag = props.tag,
      style = props.style,
      id = props.id,
      tagProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["tag", "style", "id"]);
  var name = tagProps.name,
      property = tagProps.property;
  var indexRef = React.useRef(-1);
  var headTagsRef = React.useRef(null);
  var children = Tag === 'style' && style || props.children;
  React.useEffect(function () {
    indexRef.current = headTagsRef.current.addTag(Tag, id);
    return function () {
      headTagsRef.current.removeTag(Tag, indexRef.current, id);
    };
  }, [Tag, name, property, style]);
  return React__default.createElement(headContext.Consumer, null, function (headTags) {
    headTagsRef.current = headTags;
    return canUseDOM && headTags.shouldRender(Tag, indexRef.current, id) && ReactDOM.createPortal( React__default.createElement(Tag, _rollupPluginBabelHelpers._extends({}, tagProps, {
      id: id,
      children: children
    })), document.head);
  });
};

var Title = function Title(props) {
  return React__default.createElement(HeadElement, _rollupPluginBabelHelpers._extends({
    tag: "title"
  }, props));
};
var Style = function Style(props) {
  return React__default.createElement(HeadElement, _rollupPluginBabelHelpers._extends({
    tag: "style"
  }, props));
};
var Meta = function Meta(props) {
  return React__default.createElement(HeadElement, _rollupPluginBabelHelpers._extends({
    tag: "meta"
  }, props));
};
var Link = function Link(props) {
  return React__default.createElement(HeadElement, _rollupPluginBabelHelpers._extends({
    tag: "link"
  }, props));
};

var HeadProvider = function (_Component) {
  _rollupPluginBabelHelpers._inherits(HeadProvider, _Component);
  var _super = _rollupPluginBabelHelpers._createSuper(HeadProvider);
  function HeadProvider() {
    var _this;
    _rollupPluginBabelHelpers._classCallCheck(this, HeadProvider);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.ids = new Map();
    _this.canUseDOM = _rollupPluginBabelHelpers.hasDomAccess();
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
        if (!jsutils.isArr(tags)) return;
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
  _rollupPluginBabelHelpers._createClass(HeadProvider, [{
    key: "render",
    value: function render() {
      return this.canUseDOM && React__default.createElement(headContext.Provider, {
        value: this.state
      }, this.props.children);
    }
  }]);
  return HeadProvider;
}(React.Component);

var ReThemeHeadProvider = function ReThemeHeadProvider(props) {
  return React__default.createElement(headContext.ReThemeProvider, props, React__default.createElement(HeadProvider, null, props.children));
};

exports.HeadProvider = HeadProvider;
exports.Link = Link;
exports.Meta = Meta;
exports.ReThemeHeadProvider = ReThemeHeadProvider;
exports.Style = Style;
exports.Title = Title;
//# sourceMappingURL=head.js.map
