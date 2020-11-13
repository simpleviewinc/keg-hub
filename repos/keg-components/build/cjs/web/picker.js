'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');

var ModalPicker = function (_Component) {
  _rollupPluginBabelHelpers._inherits(ModalPicker, _Component);
  var _super = _rollupPluginBabelHelpers._createSuper(ModalPicker);
  function ModalPicker(props) {
    var _this;
    _rollupPluginBabelHelpers._classCallCheck(this, ModalPicker);
    _this = _super.call(this, props);
    _this.state = {
      modalVisible: false
    };
    return _this;
  }
  _rollupPluginBabelHelpers._createClass(ModalPicker, [{
    key: "setModalVisible",
    value: function setModalVisible(visible) {
      this.setState({
        modalVisible: visible
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return React__default.createElement(reactNative.View, {
        style: {
          backgroundColor: 'transparent',
          flex: 1,
          position: 'absolute'
        }
      }, React__default.createElement(reactNative.Modal, {
        animationType: "fade",
        transparent: true,
        visible: this.state.modalVisible,
        onRequestClose: function onRequestClose() {
          _this2.setModalVisible(false);
        }
      }, React__default.createElement(reactNative.TouchableHighlight, {
        style: styles.container,
        onPress: function onPress() {
          return _this2.setModalVisible(false);
        },
        underlayColor: '#333333cc'
      }, React__default.createElement(reactNative.View, null, React__default.createElement(reactNative.FlatList, {
        data: this.state.data,
        keyExtractor: function keyExtractor(_, index) {
          return index.toString();
        },
        renderItem: function renderItem(_ref) {
          var item = _ref.item,
              index = _ref.index;
          return React__default.createElement(reactNative.TouchableHighlight, {
            underlayColor: 'transparent',
            onPress: function onPress() {
              _this2.setModalVisible(false);
              _this2.props.onValueChange(item[_this2.props.value], index);
            }
          }, _this2.props.renderRow ? _this2.props.renderRow(item, index) : React__default.createElement(reactNative.Text, {
            style: styles.itemText
          }, item[_this2.props.label]));
        }
      })))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return state.data === props.data ? null : {
        data: props.data
      };
    }
  }]);
  return ModalPicker;
}(React.Component);
var styles = reactNative.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#333333cc',
    padding: 16
  },
  itemText: {
    backgroundColor: '#fff',
    padding: 16,
    fontSize: 18,
    color: '#222',
    borderTopWidth: 1,
    borderColor: '#CCC'
  }
});

exports.ModalPicker = ModalPicker;
//# sourceMappingURL=picker.js.map
