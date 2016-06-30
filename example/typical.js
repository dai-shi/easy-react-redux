import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const SIZE = 10000;
const NAMES = Array.apply(null, new Array(SIZE)).map((_, index) => `name${index}`);

const WrappedTextInputBox = ({ text, dispatch }) => (
  <div>
    <input
      value={text}
      onChange={(event) => dispatch({
        type: 'UPDATE_TEXT',
        value: event.target.value,
      })}
    />
    <button
      onClick={() => dispatch({
        type: 'FINALIZE_TEXT',
      })}
    >
      Copy Text
    </button>
  </div>
);

WrappedTextInputBox.propTypes = {
  text: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ text: state.draftText });
const TextInputBox = connect(mapStateToProps)(WrappedTextInputBox);

const WrappedTextViewBox = ({ text }) => (
  <div>
    <span>Text: {text}</span>
  </div>
);

WrappedTextViewBox.propTypes = {
  text: PropTypes.string.isRequired,
};

const mapStateToProps2 = (state) => ({ text: state.finalText });
const TextViewBox = connect(mapStateToProps2)(WrappedTextViewBox);

const App = () => (
  <div>
    <h1>TextBox</h1>
    <TextInputBox />
    {NAMES.map((name) => (
      <TextViewBox key={name} />
    ))}
  </div>
);

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
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('content')
  );
};

export default () => {
  render();
};
