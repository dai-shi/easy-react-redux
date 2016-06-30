/* eslint react/no-multi-comp: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import shallowequal from 'shallowequal';
import lodash from 'lodash';

export const subscribe = () => (WrappedComponent) => (
  class extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.store = props.store || context.store;
      this.state = { storeState: this.store.getState() };
    }
    componentDidMount() {
      if (!this.unsubscribe) {
        this.unsubscribe = this.store.subscribe(() => {
          const nextStoreState = this.store.getState();
          this.setState({ storeState: nextStoreState });
        });
      }
    }
    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      const storeState = this.state.storeState;
      const nextStoreState = nextState.storeState;
      if (storeState !== nextStoreState) return true;
      if (!shallowequal(this.props, nextProps)) return true;
      return false;
    }
    render() {
      return (<WrappedComponent {...this.props} />);
    }
  }
);

export const subscribeWithKey = (key) => (WrappedComponent) => (
  class extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.store = props.store || context.store;
      this.state = { storeState: this.store.getState() };
    }
    componentDidMount() {
      if (!this.unsubscribe) {
        this.unsubscribe = this.store.subscribe(() => {
          const storeState = this.state.storeState;
          const nextStoreState = this.store.getState();
          if (storeState[key] !== nextStoreState[key]) {
            this.setState({ storeState: nextStoreState });
          }
        });
      }
    }
    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      const storeState = this.state.storeState;
      const nextStoreState = nextState.storeState;
      if (storeState !== nextStoreState) return true;
      if (!shallowequal(this.props, nextProps)) return true;
      return false;
    }
    render() {
      return (<WrappedComponent {...this.props} />);
    }
  }
);

export const subscribeWithPath = (path) => (WrappedComponent) => (
  class extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.store = props.store || context.store;
      this.state = { storeState: this.store.getState() };
    }
    componentDidMount() {
      if (!this.unsubscribe) {
        this.unsubscribe = this.store.subscribe(() => {
          const storeState = this.state.storeState;
          const nextStoreState = this.store.getState();
          if (lodash.get(storeState, path) !== lodash.get(nextStoreState, path)) {
            this.setState({ storeState: nextStoreState });
          }
        });
      }
    }
    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      const storeState = this.state.storeState;
      const nextStoreState = nextState.storeState;
      if (storeState !== nextStoreState) return true;
      if (!shallowequal(this.props, nextProps)) return true;
      return false;
    }
    render() {
      return (<WrappedComponent {...this.props} />);
    }
  }
);

export const subscribeWithoutKey = (key) => (WrappedComponent) => (
  class extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.store = props.store || context.store;
      this.state = { storeState: this.store.getState() };
    }
    componentDidMount() {
      if (!this.unsubscribe) {
        this.unsubscribe = this.store.subscribe(() => {
          const storeState = this.state.storeState;
          const nextStoreState = this.store.getState();
          if (Object.keys(nextStoreState).some((x) => (
            x !== key && storeState[x] !== nextStoreState[x]
          ))) {
            this.setState({ storeState: nextStoreState });
          }
        });
      }
    }
    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      const storeState = this.state.storeState;
      const nextStoreState = nextState.storeState;
      if (storeState !== nextStoreState) return true;
      if (!shallowequal(this.props, nextProps)) return true;
      return false;
    }
    render() {
      return (<WrappedComponent {...this.props} />);
    }
  }
);

export const subscribeWithCustomKey = (propsToKey) => (WrappedComponent) => (
  class extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.store = props.store || context.store;
      this.state = { storeState: this.store.getState() };
    }
    componentDidMount() {
      if (!this.unsubscribe) {
        this.unsubscribe = this.store.subscribe(() => {
          const storeState = this.state.storeState;
          const nextStoreState = this.store.getState();
          const key = propsToKey(this.props);
          if (storeState[key] !== nextStoreState[key]) {
            this.setState({ storeState: nextStoreState });
          }
        });
      }
    }
    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      const storeState = this.state.storeState;
      const nextStoreState = nextState.storeState;
      if (storeState !== nextStoreState) return true;
      if (!shallowequal(this.props, nextProps)) return true;
      return false;
    }
    render() {
      return (<WrappedComponent {...this.props} />);
    }
  }
);
