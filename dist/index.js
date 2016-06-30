'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeWithCustomKey = exports.subscribeWithoutKey = exports.subscribeWithPath = exports.subscribeWithKey = exports.subscribe = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-multi-comp: 0 */
/* eslint react/prop-types: 0 */

var subscribe = exports.subscribe = function subscribe() {
  return function (WrappedComponent) {
    return function (_React$Component) {
      _inherits(_class, _React$Component);

      function _class(props, context) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, props, context));

        _this.store = props.store || context.store;
        _this.state = { storeState: _this.store.getState() };
        return _this;
      }

      _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          if (!this.unsubscribe) {
            this.unsubscribe = this.store.subscribe(function () {
              var nextStoreState = _this2.store.getState();
              _this2.setState({ storeState: nextStoreState });
            });
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
          }
        }
      }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
          var storeState = this.state.storeState;
          var nextStoreState = nextState.storeState;
          if (storeState !== nextStoreState) return true;
          if (!(0, _shallowequal2.default)(this.props, nextProps)) return true;
          return false;
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return _class;
    }(_react2.default.Component);
  };
};

var subscribeWithKey = exports.subscribeWithKey = function subscribeWithKey(key) {
  return function (WrappedComponent) {
    return function (_React$Component2) {
      _inherits(_class2, _React$Component2);

      function _class2(props, context) {
        _classCallCheck(this, _class2);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).call(this, props, context));

        _this3.store = props.store || context.store;
        _this3.state = { storeState: _this3.store.getState() };
        return _this3;
      }

      _createClass(_class2, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this4 = this;

          if (!this.unsubscribe) {
            this.unsubscribe = this.store.subscribe(function () {
              var storeState = _this4.state.storeState;
              var nextStoreState = _this4.store.getState();
              if (storeState[key] !== nextStoreState[key]) {
                _this4.setState({ storeState: nextStoreState });
              }
            });
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
          }
        }
      }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
          var storeState = this.state.storeState;
          var nextStoreState = nextState.storeState;
          if (storeState !== nextStoreState) return true;
          if (!(0, _shallowequal2.default)(this.props, nextProps)) return true;
          return false;
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return _class2;
    }(_react2.default.Component);
  };
};

var subscribeWithPath = exports.subscribeWithPath = function subscribeWithPath(path) {
  return function (WrappedComponent) {
    return function (_React$Component3) {
      _inherits(_class3, _React$Component3);

      function _class3(props, context) {
        _classCallCheck(this, _class3);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class3).call(this, props, context));

        _this5.store = props.store || context.store;
        _this5.state = { storeState: _this5.store.getState() };
        return _this5;
      }

      _createClass(_class3, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this6 = this;

          if (!this.unsubscribe) {
            this.unsubscribe = this.store.subscribe(function () {
              var storeState = _this6.state.storeState;
              var nextStoreState = _this6.store.getState();
              if (_lodash2.default.get(storeState, path) !== _lodash2.default.get(nextStoreState, path)) {
                _this6.setState({ storeState: nextStoreState });
              }
            });
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
          }
        }
      }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
          var storeState = this.state.storeState;
          var nextStoreState = nextState.storeState;
          if (storeState !== nextStoreState) return true;
          if (!(0, _shallowequal2.default)(this.props, nextProps)) return true;
          return false;
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return _class3;
    }(_react2.default.Component);
  };
};

var subscribeWithoutKey = exports.subscribeWithoutKey = function subscribeWithoutKey(key) {
  return function (WrappedComponent) {
    return function (_React$Component4) {
      _inherits(_class4, _React$Component4);

      function _class4(props, context) {
        _classCallCheck(this, _class4);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class4).call(this, props, context));

        _this7.store = props.store || context.store;
        _this7.state = { storeState: _this7.store.getState() };
        return _this7;
      }

      _createClass(_class4, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this8 = this;

          if (!this.unsubscribe) {
            this.unsubscribe = this.store.subscribe(function () {
              var storeState = _this8.state.storeState;
              var nextStoreState = _this8.store.getState();
              if (Object.keys(nextStoreState).some(function (x) {
                return x !== key && storeState[x] !== nextStoreState[x];
              })) {
                _this8.setState({ storeState: nextStoreState });
              }
            });
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
          }
        }
      }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
          var storeState = this.state.storeState;
          var nextStoreState = nextState.storeState;
          if (storeState !== nextStoreState) return true;
          if (!(0, _shallowequal2.default)(this.props, nextProps)) return true;
          return false;
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return _class4;
    }(_react2.default.Component);
  };
};

var subscribeWithCustomKey = exports.subscribeWithCustomKey = function subscribeWithCustomKey(propsToKey) {
  return function (WrappedComponent) {
    return function (_React$Component5) {
      _inherits(_class5, _React$Component5);

      function _class5(props, context) {
        _classCallCheck(this, _class5);

        var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class5).call(this, props, context));

        _this9.store = props.store || context.store;
        _this9.state = { storeState: _this9.store.getState() };
        return _this9;
      }

      _createClass(_class5, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this10 = this;

          if (!this.unsubscribe) {
            this.unsubscribe = this.store.subscribe(function () {
              var storeState = _this10.state.storeState;
              var nextStoreState = _this10.store.getState();
              var key = propsToKey(_this10.props);
              if (storeState[key] !== nextStoreState[key]) {
                _this10.setState({ storeState: nextStoreState });
              }
            });
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
          }
        }
      }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
          var storeState = this.state.storeState;
          var nextStoreState = nextState.storeState;
          if (storeState !== nextStoreState) return true;
          if (!(0, _shallowequal2.default)(this.props, nextProps)) return true;
          return false;
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return _class5;
    }(_react2.default.Component);
  };
};