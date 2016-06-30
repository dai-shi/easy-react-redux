import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const SIZE = 10000;
const NAMES = Array.apply(null, new Array(SIZE)).map((_, index) => `name${index}`);

const TextInputBox = ({ store }) => {
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

TextInputBox.propTypes = {
  store: PropTypes.object.isRequired,
};

const TextViewBox = ({ store }) => {
  const text = store.getState().finalText;
  return (
    <div>
      <span>Text: {text}</span>
    </div>
  );
};

TextViewBox.propTypes = {
  store: PropTypes.object.isRequired,
};

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
  store.subscribe(render);
  render();
};
