import React from 'react';
import PropTypes from 'prop-types';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';

class Carousel extends React.PureComponent {
  static propTypes = {
    slides: PropTypes.array,
  };
  state = {
    slideIndex: 0,
  };
  render() {
    const { slides, ...rest } = this.props;
    return (
      <div>
        <CarouselSlide {...slides[this.state.slideIndex]} />
        <CarouselButton
          data-action="prev"
          onClick={() =>
            this.setState(({ slideIndex }) => ({ slideIndex: slideIndex - 1 }))
          }
        >
          Prev
        </CarouselButton>
        <CarouselButton
          data-action="next"
          onClick={() =>
            this.setState(({ slideIndex }) => ({ slideIndex: slideIndex + 1 }))
          }
        >
          Next
        </CarouselButton>
      </div>
    );
  }
}

export default Carousel;
