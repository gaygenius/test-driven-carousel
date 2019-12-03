import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../Carousel';
import CarouselButton from '../CarouselButton';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
  const slides = [
    {
      imgUrl: 'https://example.com/slide1.png',
      description: 'Slide 1',
      attribution: 'Uno Pizzeria',
    },
    {
      imgUrl: 'https://example.com/slide2.png',
      description: 'Slide 2',
      attribution: 'Dos Equis',
    },
    {
      imgUrl: 'https://example.com/slide3.png',
      description: 'Slide 3',
      attribution: 'Three Amigos',
    },
  ];

  it('renders a <div>', () => {
    const wrapper = shallow(<Carousel slides={slides} />);
    expect(wrapper.type()).toBe('div');
  });

  it('has an initial ’slideIndex’ of 0', () => {
    const wrapper = shallow(<Carousel slides={slides} />);
    expect(wrapper.state('slideIndex')).toBe(0);
  });

  it('renders a CarouselButton labeled ‘Prev‘', () => {
    const wrapper = shallow(<Carousel slides={slides} />);
    expect(
      wrapper
        .find(CarouselButton)
        .at(0)
        .prop('children')
    ).toBe('Prev');
  });

  it('decrements ‘slideIndex‘ when Prev is clicked', () => {
    const wrapper = shallow(<Carousel slides={slides} />);
    wrapper.setState({ slideIndex: 1 });
    wrapper.find('[data-action="prev"]').simulate('click');
    expect(wrapper.state('slideIndex')).toBe(0);
  });

  it('increments ‘slideIndex‘ when Next is clicked', () => {
    const wrapper = shallow(<Carousel slides={slides} />);
    wrapper.setState({ slideIndex: 1 });
    wrapper.find('[data-action="next"]').simulate('click');
    expect(wrapper.state('slideIndex')).toBe(2);
  });

  it('renders the current slide as a CarouselSlide', () => {
    const wrapper = shallow(<Carousel slides={slides} />);
    expect(wrapper.find(CarouselSlide).props()).toEqual(slides[0]);
    wrapper.setState({ slideIndex: 1 });
    expect(wrapper.find(CarouselSlide).props()).toEqual(slides[1]);
  });
});
