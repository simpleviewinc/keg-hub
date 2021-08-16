import { d as _objectWithoutProperties } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import { useMediaProps } from './useMediaProps.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native';
import { CardContent } from './cardContent.js';
import { CardContainer } from './cardContainer.js';
import { CardSection } from './cardSection.js';
import { C as CardMedia } from './cardMedia-df8e7497.js';
import './isValidComponent.js';
import '@keg-hub/re-theme';
import './view.native-f7a27d15.js';
import './useClassName.native-32e8827d.js';
import './cardCallout.js';
import './text.js';
import './kegText-97d3d571.js';
import './kegText.js';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';
import './useClassList.native-70068878.js';
import './renderFromType.js';
import './loading.js';
import './indicator.wrapper-a8ba0314.js';
import './getPlatform-e625f46a.js';
import './image-eb160914.js';
import './getPressHandler.js';
import './getImgSrc.js';

var _excluded = ["styles"],
    _excluded2 = ["contentTitle", "children", "className", "Footer", "footerLines", "Header", "headerLines", "image", "Media", "subtitle", "themePath", "title", "type", "video"];
var Card = function Card(_ref) {
  var styles = _ref.styles,
      props = _objectWithoutProperties(_ref, _excluded);
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
      attributes = _objectWithoutProperties(props, _excluded2);
  var cardStyles = useThemePath(themePath || "card.".concat(type), styles);
  var mediaProps = useMediaProps({
    Media: Media,
    image: image,
    video: video,
    styles: cardStyles
  });
  var hasMedia = Boolean(Media || mediaProps);
  var hasContent = Boolean(children || title || subtitle);
  return React__default.createElement(CardContainer, {
    className: className,
    attributes: attributes,
    styles: cardStyles
  }, Header && React__default.createElement(CardSection, {
    Section: Header,
    type: "header",
    numberOfLines: headerLines,
    styles: cardStyles.header,
    showBorder: !hasMedia
  }), hasMedia && React__default.createElement(CardMedia, {
    mediaProps: mediaProps,
    styles: cardStyles.media,
    hasHeader: Boolean(Header)
  }), hasContent && React__default.createElement(CardContent, {
    title: title,
    subtitle: subtitle,
    styles: cardStyles.content,
    children: children
  }), Footer && React__default.createElement(CardSection, {
    Section: Footer,
    type: "footer",
    numberOfLines: footerLines,
    styles: cardStyles.footer,
    showBorder: hasContent
  }));
};
Card.Body = CardContent;
Card.Container = CardContainer;
Card.Header = CardSection;
Card.Footer = CardSection;
Card.Media = CardMedia;

export { Card };
//# sourceMappingURL=card.js.map
