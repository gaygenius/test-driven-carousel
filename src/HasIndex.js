import React from 'react';

const HasIndex = (Component, indexPropName) =>
  class ComponentWithIndex extends React.PureComponent {
    static displayName = `HasIndex(${Component.displayName || Component.name})`;

    state = {
      index: 0,
    };

    handleDecrement = upperBound => {
      this.setState(({ index }) => ({
        index: upperBound ? (index + upperBound - 1) % upperBound : index - 1,
      }));
    };

    handleIncrement = upperBound => {
      this.setState(({ index }) => ({
        index: upperBound ? (index + 1) % upperBound : index + 1,
      }));
    };

    render() {
      const indexProps = {
        [indexPropName]: this.state.index,
        [`${indexPropName}Decrement`]: this.handleDecrement,
        [`${indexPropName}Increment`]: this.handleIncrement,
      };
      return <Component {...this.props} {...indexProps} />;
    }
  };

export default HasIndex;
