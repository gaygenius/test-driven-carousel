import React from 'react';
import { shallow } from 'enzyme';
import CarouselButton from '../CarouselButton';

describe('CarouselButton', () => {
  const text = 'Button text';
  const subject = () => {
    return shallow(<CarouselButton>{text}</CarouselButton>);
  };

  it('renders a <button>', () => {
    expect(subject().type()).toBe('button');
  });

  it('passes ‘children’ through to the <button>', () => {
    expect(subject().prop('children')).toBe(text);
  });

  it('passes other props through to the <button>', () => {
    const onClick = () => {};
    const className = 'my-carousel-button';
    const dataAction = 'prev';
    const wrapper = subject();
    wrapper.setProps({ onClick, className, 'data-action': dataAction });
    expect(wrapper.prop('onClick')).toBe(onClick);
    expect(wrapper.prop('className')).toBe(className);
    expect(wrapper.prop('data-action')).toBe(dataAction);
  });
});
