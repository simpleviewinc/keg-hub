'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var useMediaProps = require('./useMediaProps.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native-web');
var cardContent = require('./cardContent.js');
var cardContainer = require('./cardContainer.js');
var cardSection = require('./cardSection.js');
var cardMedia = require('./cardMedia-c980073d.js');
require('./isValidComponent.js');
require('@keg-hub/re-theme');
require('./view-3fcb25db.js');
require('./view.native-895f9104.js');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');
require('./cardCallout.js');
require('./text.js');
require('./kegText-b0f1b442.js');
require('./kegText.native-100193df.js');
require('./useTextAccessibility.js');
require('./useTextStyles.js');
require('./useClassList-89a8dbd4.js');
require('./renderFromType.js');
require('./loading.js');
require('./indicator.wrapper-b537ce8c.js');
require('./getPlatform-ec53cd5e.js');
require('./image-5ba5f8b8.js');
require('./getPressHandler.js');
require('./getImgSrc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["styles"],
    _excluded2 = ["contentTitle", "children", "className", "Footer", "footerLines", "Header", "headerLines", "image", "Media", "subtitle", "themePath", "title", "type", "video"];
var Card = function Card(_ref) {
  var styles = _ref.styles,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  props.contentTitle;
      var children = props.children,
      className = props.className,
      Footer = props.Footer,
      footerLines = props.footerLines,
      Header = props.Header,
      headerLines = props.headerLines,
      image = props.image,
      Media = props.Media,
      subtitle = props.subtitle,
      themePath = props.themePath,
      title = props.title,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      video = props.video,
      attributes = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded2);
  var cardStyles = useThemePath.useThemePath(themePath || "card.".concat(type), styles);
  var mediaProps = useMediaProps.useMediaProps({
    Media: Media,
    image: image,
    video: video,
    styles: cardStyles
  });
  var hasMedia = Boolean(Media || mediaProps);
  var hasContent = Boolean(children || title || subtitle);
  return React__default['default'].createElement(cardContainer.CardContainer, {
    className: className,
    attributes: attributes,
    styles: cardStyles
  }, Header && React__default['default'].createElement(cardSection.CardSection, {
    Section: Header,
    type: "header",
    numberOfLines: headerLines,
    styles: cardStyles.header,
    showBorder: !hasMedia
  }), hasMedia && React__default['default'].createElement(cardMedia.CardMedia, {
    mediaProps: mediaProps,
    styles: cardStyles.media,
    hasHeader: Boolean(Header)
  }), hasContent && React__default['default'].createElement(cardContent.CardContent, {
    title: title,
    subtitle: subtitle,
    styles: cardStyles.content,
    children: children
  }), Footer && React__default['default'].createElement(cardSection.CardSection, {
    Section: Footer,
    type: "footer",
    numberOfLines: footerLines,
    styles: cardStyles.footer,
    showBorder: hasContent
  }));
};
Card.Body = cardContent.CardContent;
Card.Container = cardContainer.CardContainer;
Card.Header = cardSection.CardSection;
Card.Footer = cardSection.CardSection;
Card.Media = cardMedia.CardMedia;

exports.Card = Card;
//# sourceMappingURL=card.js.map
