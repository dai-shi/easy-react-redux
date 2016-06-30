easy-react-redux
================

[![Build Status](https://travis-ci.org/dai-shi/easy-react-redux.svg?branch=master)](https://travis-ci.org/dai-shi/easy-react-redux)
[![npm version](https://badge.fury.io/js/easy-react-redux.svg)](https://badge.fury.io/js/easy-react-redux)

Yet another react redux integration only with stateless function components.

Background
----------

Some people likes writing only pure functions in [React](https://facebook.github.io/react/) and it's also known as [stateless function components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions).
[Redux](https://github.com/reactjs/redux) helps writing components as stateless functions because it is a single store to hold the entire application state. Technically, one doesn't need to use component level state any more.

There is an official React binding for Redux called [React Redux](https://github.com/reactjs/react-redux). The `connect` method is pretty powerful and carefully tuned for performance. As its major focus is performance and scalability, however, it's not very intuitive for beginners. In the [tutorial](https://egghead.io/courses/getting-started-with-redux), the simple usage of Redux without react-redux is introduced, which is good for learning.

As the official binding is not necessary to use Redux with React, this project is to seek an alternative. The goal of this project is to provide yet another binding for beginners and developers who develop relatively small apps which don't require `connect`-level tuning.

Install
-------

```bash
npm install easy-react-redux --save
```

Usage
-----

### Baseline usage

```javascript
import { subscribe } from 'easy-react-redux';

const Hello = subscribe()(({ name, store }) => (
  <div>
    <div>Hello {name}!</div>
    <p>{store.getState().message}</p>
  </div>
));

const App = ({ store }) => (<Hello name="world" store={store} />);

const store = createStore(reducer, initialState);

ReactDOM.render(<App store={store} />, document.getElementById('app'));
```

When the application state is changed, it will only re-render `Hello` component.

### Limiting subscription

```javascript
import { subscribeWithKey } from 'easy-react-redux';
const Hello = subscribeWithKey('message')(({ name, store }) => (
  <div>
    <div>Hello {name}!</div>
    <p>{store.getState().message}</p>
  </div>
));
```

This will only re-render the component if `message` in the state changes.

### More

There're some other methods: `subscribeWithPath`, `subscribeWithoutKey`, and `subscribeWithCustomKey` which is not simple anymore.

The good thing is that there's no hack and the source code is simple, and hence predictable. Please take a look at the code to get more insight.

If you think passing `store` in the props all the way down is annoying, you can use `Provider` from react-redux and passes `store` in the context. See the example folder for more information.

Example
-------

The [example](example) folder contains a working example.
You can run it with:

```bash
PORT=8080 npm run example
```

and open <http://localhost:8080> in your web browser.
