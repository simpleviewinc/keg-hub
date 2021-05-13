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
import { C as CardMedia } from './cardMedia-95a961d2.js';
import './isValidComponent.js';
import '@keg-hub/re-theme';
import './view-2274aefb.js';
import './view.native-a7f08b5b.js';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';
import './cardCallout.js';
import './text.js';
import './kegText-5c4aeb4b.js';
import './kegText.native-be460636.js';
import './useTextAccessibility.js';
import './useTextStyles.js';
import './useClassList-1d418045.js';
import './renderFromType.js';
import './loading.js';
import './indicator.wrapper-ddd47db5.js';
import './getPlatform-95568099.js';
import './image-fd980ec1.js';
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
