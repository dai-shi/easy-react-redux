import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {
  subscribeWithKey,
  subscribeWithoutKey,
} from '../src/index.js';

const SIZE = 10000;
const NAMES = Array.apply(null, new Array(SIZE)).map((_, index) => `name${index}`);

const WrappedTextInputBox = ({ store }) => {
  const text = store.getState().draftText;
  return (
    <div>
      <input
        value={text}
        onChange={(event) => store.dispatch({
          type: 'UPDATE_TEXT',
          value: event.target.value,
        })}
      />
      <button
        onClick={() => store.dispatch({
          type: 'FINALIZE_TEXT',
        })}
      >
        Copy Text
      </button>
    </div>
  );
};

WrappedTextInputBox.propTypes = {
  store: PropTypes.object.isRequired,
};

const TextInputBox = subscribeWithKey('draftText')(WrappedTextInputBox);

const WrappedTextViewBox = ({ store }) => {
  const text = store.getState().finalText;
  return (
    <div>
      <span>Text: {text}</span>
    </div>
  );
};

WrappedTextViewBox.propTypes = {
  store: PropTypes.object.isRequired,
};

const TextViewBox = subscribeWithoutKey('draftText')(WrappedTextViewBox);

const App = ({ store }) => (
  <div>
    <h1>TextBox</h1>
    <TextInputBox store={store} />
    {NAMES.map((name) => (
      <TextViewBox key={name} store={store} />
    ))}
  </div>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

const initialState = {
  draftText: '',
  finalText: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return Object.assign({}, state, {
        draftText: action.value,
      });
    case 'FINALIZE_TEXT':
      return Object.assign({}, state, {
        finalText: state.draftText,
        draftText: '',
      });
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('content')
  );
};

export default () => {
  render();
};
