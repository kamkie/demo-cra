import React, {CSSProperties} from 'react';
import {connect} from "react-redux";
import {Action, Dispatch} from "redux";
import {AppState} from "../store";

const contextPath = process.env.REACT_APP_CONTEXT_PATH === '/' ? '' : process.env.REACT_APP_CONTEXT_PATH || '';

const initialState: CounterState = {
  count: 0,
  loading: false,
  data: {}
};

export interface CounterState {
  readonly count: number
  readonly loading: boolean
  readonly data: object
}

interface CounterAction extends Action<CounterActions> {
  payload: object
}

interface CounterProps {
  storeSelector: (store: AppState) => CounterState
}

interface CounterDispatch {
  readonly increment: () => void
  readonly decrement: () => void
  readonly fetch: () => void
  readonly dataLoaded: (data: object) => void
}

type CounterAllProps = CounterProps & CounterState & CounterDispatch

function mapStateToProps(state: AppState, ownProps: CounterProps): CounterState {
  return ownProps.storeSelector(state);
}

function mapDispatchToProps(dispatch: Dispatch<Action<CounterActions>>): CounterDispatch {
  return {
    increment: () => dispatch({type: CounterActions.INCREMENT}),
    decrement: () => dispatch({type: CounterActions.DECREMENT}),
    fetch: () => dispatch({type: CounterActions.LOAD}),
    dataLoaded: data => dispatch({type: CounterActions.LOADED, payload: data}),
  }
}

enum CounterActions {
  INCREMENT = '@@counter/INCREMENT',
  DECREMENT = '@@counter/DECREMENT',
  // DECREMENT2 = '@@counter/DECREMENT2',
  LOAD = '@@counter/LOAD',
  LOADED = '@@counter/LOADED',
}

export function counterReducer(state = initialState, action: CounterAction): CounterState {
  switch (action.type) {
    case CounterActions.LOAD:
      return {
        ...state,
        loading: true
      };
    case CounterActions.LOADED:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case CounterActions.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case CounterActions.DECREMENT:
      return {
        ...state,
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

const style: CSSProperties = {
  textAlign: 'left',
  color: '#ffffff',
};

class ReduxCounter extends React.Component<CounterAllProps> {

  loadData = () => {
    this.props.fetch();
    fetch(`${contextPath}/actuator/info`)
      .then(response => response.json())
      .then(info => info.build)
      .then(body => this.props.dataLoaded(body))
      .catch(error => this.props.dataLoaded(error))
  };

  render() {
    const {count, increment, decrement, loading, data} = this.props;
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={decrement}>-</button>
          <span>count: {count}</span>
          <button onClick={increment}>+</button>
          <button onClick={this.loadData}>fetch</button>
          <p>{loading && <span>loading data</span>}</p>
          <pre style={style}>{JSON.stringify(data, null, 4)}</pre>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxCounter);
