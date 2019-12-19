import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default (Component, propName, upperBoundPropName) =>
  class ComponentWithAutoAdvance extends PureComponent {
    static displayName = `AutoAdvances(${Component.displayName ||
      Component.name})`;

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
      return <Component {...this.props} />;
    }
  };
