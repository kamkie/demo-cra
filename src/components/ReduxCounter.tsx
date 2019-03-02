import React from 'react';
import {connect} from "react-redux";
import {Action, Dispatch} from "redux";
import {AppState} from "../store";

export interface CounterState {
  count: number
}

interface CounterProps {
  count: number,
  dispatch: Dispatch
}

function mapStateToProps(state: AppState) {
  return {
    count: state.counter.count
  };
}

export function reducer(state = {count: 0}, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    default:
      return state;
  }
}

class ReduxCounter extends React.Component<CounterProps, CounterState> {
  increment = () => {
    this.props.dispatch({type: 'INCREMENT'});
  };

  decrement = () => {
    this.props.dispatch({type: 'DECREMENT'});
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
