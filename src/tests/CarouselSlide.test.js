import React from 'react';
import { shallow, mount } from 'enzyme';
import CarouselSlide from '../CarouselSlide';

describe('Img', () => {
  const imgUrl = 'https://example.com/default.jpg';
  const mountImg = () => {
    const Img = CarouselSlide.defaultProps.Img;
    return mount(<Img src={imgUrl} imgHeight={500} />);
  };

  it('renders an <img> with the given src', () => {
    expect(mountImg().containsMatchingElement(<img src={imgUrl} />)).toBe(true);
  });

  it('has the expected static styles', () => {
    const mounted = mountImg();
    expect(mounted).toHaveStyleRule('width', '100%');
    expect(mounted).toHaveStyleRule('object-fit', 'cover');
  });

  it('uses imgHeight as the height style property', () => {
    const mounted = mountImg();
    expect(mounted).toHaveStyleRule('height', '500px');
    mounted.setProps({ imgHeight: 'calc(100vh - 100px)' });
    expect(mounted).toHaveStyleRule('height', 'calc(100vh - 100px)');
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
