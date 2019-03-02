import React from 'react';
import {connect} from "react-redux";
import {Action, Dispatch} from "redux";
import {AppState} from "../store";

const initialState: CounterState = {
  count: 0
};

export interface CounterState {
  readonly count: number
}

interface CounterProps {
  readonly count: number
  readonly dispatch: Dispatch
}

function mapStateToProps(state: AppState) {
  return {
    count: state.counter.count
  };
}

enum CounterActions {
  INCREMENT,
  DECREMENT,
}

export function counterReducer(state = initialState, action: Action<CounterActions>) {
  const {INCREMENT, DECREMENT} = CounterActions;
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1
      };
    case DECREMENT:
      return {
        count: state.count - 1
      };
    default:
      return state;
  }
}

class ReduxCounter extends React.Component<CounterProps, CounterState> {
  increment = () => {
    this.props.dispatch({type: CounterActions.INCREMENT});
  };

  decrement = () => {
    this.props.dispatch({type: CounterActions.INCREMENT});
  };

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>count: {this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ReduxCounter);
