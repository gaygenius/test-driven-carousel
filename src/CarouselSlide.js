import React from 'react';
import PropTypes from 'prop-types';

const CarouselSlide = ({ imgUrl, description, attribution, ...otherProps }) => (
  <figure {...otherProps}>
    <img src={imgUrl} />
    <figcaption>
      {description} {attribution}
    </figcaption>
  </figure>
);

CarouselSlide.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  attribution: PropTypes.string,
};

export default CarouselSlide;
