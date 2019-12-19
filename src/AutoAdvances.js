import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default (Component, propName, upperBoundPropName) =>
  class ComponentWithAutoAdvance extends PureComponent {
    static displayName = `AutoAdvances(${Component.displayName ||
      Component.name})`;

    static propTypes = {
      [propName]: PropTypes.number.isRequired,
      [`${propName}Increment`]: PropTypes.func.isRequired,
      [upperBoundPropName]: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
      ]).isRequired,
      autoAdvanceDelay: PropTypes.number.isRequired,
    };

    static defaultProps = {
      autoAdvanceDelay: 10e3,
    };

    componentDidMount() {
      this.startTimer();
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps[propName] !== this.props[propName] ||
        prevProps[upperBoundPropName] !== this.props[upperBoundPropName]
      ) {
        this.startTimer();
      }
    }

    componentWillUnmount() {
      clearTimeout(this._timer);
    }

    getUpperBound() {
      const upperBoundFromProps = this.props[upperBoundPropName];
      if (typeof upperBoundFromProps === 'number') return upperBoundFromProps;
      if (upperBoundFromProps != null) return upperBoundFromProps.length;
    }

    startTimer() {
      clearTimeout(this._timer);
      const { autoAdvanceDelay } = this.props;
      if (!autoAdvanceDelay) return;
      const upperBound = this.getUpperBound();
      this._timer = setTimeout(() => {
        this.props[`${propName}Increment`](upperBound);
      }, autoAdvanceDelay);
    }

    render() {
      const { autoAdvanceDelay: _autoAdvanceDelay, ...rest } = this.props;
      return <Component {...rest} />;
    }
  };
