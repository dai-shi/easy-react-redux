/* eslint-env mocha */

import chai, { expect } from 'chai';
import jsxChai from 'jsx-chai';
import React, { PropTypes } from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { subscribe } from '../src/index.js';
import { createStore } from 'redux';

chai.use(jsxChai);

describe('subscribe spec', () => {
  it('should have a function', () => {
    expect(subscribe).to.not.be.undefined; // eslint-disable-line no-unused-expressions
  });

  it('should render a component', () => {
    const singleStore = createStore(x => x, { counter: 1 });
    const BaseComponent = () => (<div><h1>Base</h1></div>);
    const OurComponent = subscribe()(BaseComponent);

    const renderer = createRenderer();
    renderer.render(<OurComponent store={singleStore} />);
    const renderer2 = createRenderer();
    renderer2.render(renderer.getRenderOutput());
    const actualElement = renderer2.getRenderOutput();
    const expectedElement = (<div><h1>Base</h1></div>);

    expect(actualElement).to.deep.equal(expectedElement);
  });

  it('should render a component with store', () => {
    const singleStore = createStore(x => x, { counter: 1 });
    const BaseComponent = ({ store }) => (<div>Count: {store.getState().counter}</div>);
    BaseComponent.propTypes = {
      store: PropTypes.object.isRequired,
    };
    const OurComponent = subscribe()(BaseComponent);

    const renderer = createRenderer();
    renderer.render(<OurComponent store={singleStore} />);
    const renderer2 = createRenderer();
    renderer2.render(renderer.getRenderOutput());
    const actualElement = renderer2.getRenderOutput();
    const expectedElement = (<div>Count: 1</div>);

    expect(actualElement).to.deep.equal(expectedElement);
  });
});
