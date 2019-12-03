import React from 'react';
import { shallow } from 'enzyme';
import CarouselSlide from '../CarouselSlide';

describe('CarouselSlide', () => {
  const imgUrl = 'https://example.com/image.png';
  const description = 'A jaw-droppingly spectacular image';
  const buildCarouselSlide = () =>
    shallow(<CarouselSlide imgUrl={imgUrl} description={description} />);

  it('renders a <figure>', () => {
    const wrapper = buildCarouselSlide();
    expect(wrapper.type()).toBe('figure');
  });

  it('renders an <img> and a <figcaption>', () => {
    const wrapper = buildCarouselSlide();
    expect(wrapper.childAt(0).type()).toBe('img');
    expect(wrapper.childAt(1).type()).toBe('figcaption');
  });

  it('passes ’imgUrl’ through to the <img>', () => {
    const wrapper = buildCarouselSlide();
    const img = wrapper.find('img');
    expect(img.prop('src')).toBe(imgUrl);
  });

  it('uses ’description’ and ’attribution’ as the <figcaption>', () => {
    const attribution = 'Trevor Burnham';
    const wrapper = buildCarouselSlide();
    wrapper.setProps({ attribution });
    expect(wrapper.find('figcaption').text()).toBe(
      `${description} ${attribution}`
    );
  });

  it('passes other props through to the <figure>', () => {
    const wrapper = buildCarouselSlide();
    const style = {};
    const onClick = () => {};
    const className = 'my-carousel-slide';
    wrapper.setProps({ style, onClick, className });
    expect(wrapper.prop('style')).toBe(style);
    expect(wrapper.prop('onClick')).toBe(onClick);
    expect(wrapper.prop('className')).toBe(className);
  });
});
