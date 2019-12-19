import React from 'react';
import { mount, shallow } from 'enzyme';
import Carousel, { Carousel as CoreCarousel } from '../Carousel';
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

  describe('component with HOC', () => {
    it('sets slideIndex={0} on the core component', () => {
      const wrapper = shallow(<Carousel slides={slides} />);
      expect(wrapper.find(CoreCarousel).prop('slideIndex')).toBe(0);
    });

    it('passes ‘slides’ down to the core component', () => {
      const wrapper = shallow(<Carousel slides={slides} />);
      expect(wrapper.find(CoreCarousel).prop('slides')).toBe(slides);
    });

    it('allows ‘slideIndex’ to be controlled', () => {
      const mounted = mount(<Carousel slides={slides} slideIndex={1} />);
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(1);
      mounted.setProps({ slideIndex: 0 });
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(0);
    });

    it('advances the slide after ‘autoAdvanceDelay’ elapses', () => {
      const autoAdvanceDelay = 10e3;
      jest.useFakeTimers();
      const mounted = mount(
        <Carousel slides={slides} autoAdvanceDelay={autoAdvanceDelay} />
      );
      jest.advanceTimersByTime(autoAdvanceDelay);
      mounted.update();
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(1);
    });
  });

  describe('core component', () => {
    const buildCarousel = () => {
      const slideIndexDecrement = jest.fn();
      const slideIndexIncrement = jest.fn();
      const wrapper = shallow(
        <CoreCarousel
          slides={slides}
          slideIndex={0}
          slideIndexDecrement={slideIndexDecrement}
          slideIndexIncrement={slideIndexIncrement}
        />
      );
      wrapper.slideIndexDecrement = slideIndexDecrement;
      wrapper.slideIndexIncrement = slideIndexIncrement;
      return wrapper;
    };

    it('renders a <div>', () => {
      const wrapper = buildCarousel();
      expect(wrapper.type()).toBe('div');
    });

    it('renders a CarouselButton labeled ‘Prev‘', () => {
      expect(
        buildCarousel()
          .find(CarouselButton)
          .at(0)
          .prop('children')
      ).toBe('Prev');
    });

    it('renders a CarouselButton labeled ‘Next‘', () => {
      expect(
        buildCarousel()
          .find(CarouselButton)
          .at(1)
          .prop('children')
      ).toBe('Next');
    });

    it('renders the current slide as a CarouselSlide', () => {
      const wrapper = buildCarousel();
      expect(wrapper.find(CarouselSlide).props()).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[0],
      });
      wrapper.setProps({ slideIndex: 1 });
      expect(wrapper.find(CarouselSlide).props()).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[1],
      });
    });

    it('decrements ‘slideIndex‘ when Prev is clicked', () => {
      const wrapper = buildCarousel();
      wrapper.find('[data-action="prev"]').simulate('click');
      expect(wrapper.slideIndexDecrement).toHaveBeenCalledWith(slides.length);
    });

    it('increments ‘slideIndex‘ when Next is clicked', () => {
      const wrapper = buildCarousel();
      wrapper.find('[data-action="next"]').simulate('click');
      expect(wrapper.slideIndexIncrement).toHaveBeenCalledWith(slides.length);
    });

    it('passes defaultImg and defaultImgHeight to the CarouselSlide', () => {
      const defaultImg = () => 'test';
      const defaultImgHeight = 1234;
      const wrapper = buildCarousel();
      wrapper.setProps({ defaultImg, defaultImgHeight });
      expect(wrapper.find(CarouselSlide).prop('Img')).toBe(defaultImg);
      expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(
        defaultImgHeight
      );
    });
  });
});
