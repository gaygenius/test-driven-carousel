import React from 'react';
import { shallow } from 'enzyme';
import AutoAdvances from '../AutoAdvances';

const MockComponent = () => null;
MockComponent.displayName = 'MockComponent';
const MockComponentWithAutoAdvance = AutoAdvances(
  MockComponent,
  'index',
  'upperBound'
);

describe('AutoAdvances()', () => {
  it('has the expected displayName', () => {
    expect(MockComponentWithAutoAdvance.displayName).toBe(
      'AutoAdvances(MockComponent)'
    );
  });

  const autoAdvanceDelay = 10e3;
  const upperBound = 5;
  const buildWrapper = () => {
    const indexIncrement = jest.fn();
    const wrapper = shallow(
      <MockComponentWithAutoAdvance
        autoAdvanceDelay={autoAdvanceDelay}
        index={0}
        indexIncrement={indexIncrement}
        upperBound={upperBound}
      />
    );
    wrapper.indexIncrement = indexIncrement;
    return wrapper;
  };

  it('calls the increment function after ‘autoAdvanceDelay’', () => {
    jest.useFakeTimers();
    const wrapper = buildWrapper();
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(wrapper.indexIncrement).toHaveBeenCalledWith(upperBound);
  });

  it('uses ‘upperBound.length’ if upperBound is an array', () => {
    jest.useFakeTimers();
    const wrapper = buildWrapper();
    wrapper.setProps({ upperBound: [1, 2, 3] });
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(wrapper.indexIncrement).toHaveBeenCalledWith(3);
  });

  it('does not set a timer if ‘autoAdvanceDelay’ is 0', () => {
    jest.useFakeTimers();
    const wrapper = buildWrapper();
    wrapper.setProps({ index: 1, autoAdvanceDelay: 0 });
    jest.advanceTimersByTime(999999);
    expect(wrapper.indexIncrement).not.toHaveBeenCalled();
  });

  it('resets the timer when the target prop changes', () => {
    jest.useFakeTimers();
    const wrapper = buildWrapper();
    jest.advanceTimersByTime(autoAdvanceDelay - 1);
    wrapper.setProps({ index: 1 });
    jest.advanceTimersByTime(1);
    expect(wrapper.indexIncrement).not.toHaveBeenCalled();
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(wrapper.indexIncrement).toHaveBeenCalled();
  });

  it('clears the timer on unmount', () => {
    jest.useFakeTimers();
    const wrapper = buildWrapper();
    wrapper.unmount();
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(wrapper.indexIncrement).not.toHaveBeenCalled();
  });
});
