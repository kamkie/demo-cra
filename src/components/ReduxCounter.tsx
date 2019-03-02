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

interface CounterAction extends Action<CounterActions> {
}

interface CounterExternalProps {
  storeSelector: (store: AppState) => CounterState
}

interface CounterStateProps {
  readonly count: number
}

interface CounterDispatchProps {
  readonly increment: () => void
  readonly decrement: () => void
}

type CounterProps = CounterExternalProps & CounterStateProps & CounterDispatchProps

function mapStateToProps(state: AppState, ownProps: CounterExternalProps): CounterStateProps {
  return ownProps.storeSelector(state);
}

function mapDispatchToProps(dispatch: Dispatch<Action<CounterActions>>): CounterDispatchProps {
  return {
    increment: () => dispatch({type: CounterActions.INCREMENT}),
    decrement: () => dispatch({type: CounterActions.DECREMENT}),
  }
}

enum CounterActions {
  INCREMENT = '@@counter/INCREMENT',
  DECREMENT = '@@counter/DECREMENT',
  // DECREMENT2 = '@@counter/DECREMENT2',
}

export function counterReducer(state = initialState, action: CounterAction) {
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
      assertNever(action.type);
      return state;
  }
}

// noinspection JSUnusedLocalSymbols
export function assertNever(_: never) {
  console.error("Never touched");
}

class ReduxCounter extends React.Component<CounterProps> {

  render() {
    const {count, increment, decrement} = this.props;
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={decrement}>-</button>
          <span>count: {count}</span>
          <button onClick={increment}>+</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxCounter);
