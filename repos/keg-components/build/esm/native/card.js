import { d as _objectWithoutProperties } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import { useMediaProps } from './useMediaProps.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native';
import { CardContent } from './cardContent.js';
import { CardContainer } from './cardContainer.js';
import { CardSection } from './cardSection.js';
import { C as CardMedia } from './cardMedia-dd0de55f.js';
import './isValidComponent.js';
import '@keg-hub/re-theme';
import './view.native-b0b1ddd4.js';
import './useClassName.native-32e8827d.js';
import './cardCallout.js';
import './text.js';
import './kegText-f9567f63.js';
import './kegText.js';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';
import './useClassList.native-70068878.js';
import './renderFromType.js';
import './loading.js';
import './indicator.wrapper-83c062e4.js';
import './getPlatform-e625f46a.js';
import './image-d610d905.js';
import './getPressHandler.js';
import './getImgSrc.js';

var Card = function Card(_ref) {
  var styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);
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
      attributes = _objectWithoutProperties(props, ["contentTitle", "children", "className", "Footer", "footerLines", "Header", "headerLines", "image", "Media", "subtitle", "themePath", "title", "type", "video"]);
  var cardStyles = useThemePath(themePath || "card.".concat(type), styles);
  var mediaProps = useMediaProps({
    Media: Media,
    image: image,
    video: video,
    styles: cardStyles
  });
  var hasMedia = Boolean(Media || mediaProps);
  var hasContent = Boolean(children || title || subtitle);
  return React.createElement(CardContainer, {
    className: className,
    attributes: attributes,
    styles: cardStyles
  }, Header && React.createElement(CardSection, {
    Section: Header,
    type: "header",
    numberOfLines: headerLines,
    styles: cardStyles.header,
    showBorder: !hasMedia
  }), hasMedia && React.createElement(CardMedia, {
    mediaProps: mediaProps,
    styles: cardStyles.media,
    hasHeader: Boolean(Header)
  }), hasContent && React.createElement(CardContent, {
    title: title,
    subtitle: subtitle,
    styles: cardStyles.content,
    children: children
  }), Footer && React.createElement(CardSection, {
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
