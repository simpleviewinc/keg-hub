import { d as _objectWithoutProperties } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import './getPlatform-e625f46a.js';
import React__default from 'react';
import './isValidComponent.js';
import './renderFromType.js';
import './getPressHandler.js';
import './getImgSrc.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './view.native-54e7e7ef.js';
import './useTextAccessibility.js';
import './kegText.js';
import '@keg-hub/re-theme/styleInjector';
import '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText-ef69c4aa.js';
import './text.js';
import { useMediaProps } from './useMediaProps.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import './useClassList.native-70068878.js';
import './cardCallout.js';
import { CardContent } from './cardContent.js';
import { CardContainer } from './cardContainer.js';
import { CardSection } from './cardSection.js';
import './indicator.wrapper-e28eda76.js';
import './loading.js';
import './image-209e0d5e.js';
import { C as CardMedia } from './cardMedia-328b6ade.js';

var Card = function Card(_ref) {
  var styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);
  var contentTitle = props.contentTitle,
      children = props.children,
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
