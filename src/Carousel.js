import React from 'react';
import PropTypes from 'prop-types';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';

class Carousel extends React.PureComponent {
  static propTypes = {
    defaultImg: CarouselSlide.propTypes.Img,
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
  };
  static defaultProps = {
    defaultImg: CarouselSlide.defaultProps.Img,
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
  };
  state = {
    slideIndex: 0,
  };
  render() {
    const { defaultImg, defaultImgHeight, slides, ...rest } = this.props;
    return (
      <div {...rest}>
        <CarouselSlide
          Img={defaultImg}
          imgHeight={defaultImgHeight}
          {...slides[this.state.slideIndex]}
        />
        <CarouselButton
          data-action="prev"
          onClick={() =>
            this.setState(({ slideIndex }) => ({
              slideIndex: slideIndex === 0 ? slides.length - 1 : slideIndex - 1,
            }))
          }
        >
          Prev
        </CarouselButton>
        <CarouselButton
          data-action="next"
          onClick={() =>
            this.setState(({ slideIndex }) => ({
              slideIndex: slideIndex === slides.length - 1 ? 0 : slideIndex + 1,
            }))
          }
        >
          Next
        </CarouselButton>
      </div>
    );
  }
}

export default Carousel;
