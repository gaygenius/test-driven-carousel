import React from 'react';
import { shallow, mount } from 'enzyme';
import CarouselSlide from '../CarouselSlide';

describe('Img', () => {
  it('renders an <img> with the given src', () => {
    const imgUrl = 'https://example.com/default.jpg';
    const Img = CarouselSlide.defaultProps.Img;
    const mounted = mount(<Img src={imgUrl} imgHeight={500} />);
    expect(mounted.containsMatchingElement(<img src={imgUrl} />)).toBe(true);
  });
});

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
    expect(wrapper.childAt(0).type()).toBe(CarouselSlide.defaultProps.Img);
    expect(wrapper.childAt(1).type()).toBe('figcaption');
  });

  it('passes ’imgUrl’ through to the <img>', () => {
    const wrapper = buildCarouselSlide();
    const img = wrapper.find(CarouselSlide.defaultProps.Img);
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
