import React, { CSSProperties } from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { AppState } from '../store';

const contextPath = process.env.REACT_APP_CONTEXT_PATH === '/' ? '' : process.env.REACT_APP_CONTEXT_PATH || '';

const initialState: CounterState = {
  count: 0,
  loading: false,
  data: {},
};

export interface CounterState {
  readonly count: number;
  readonly loading: boolean;
  readonly data: object;
}

interface CounterAction extends Action<CounterActions> {
  payload: object;
}

interface CounterProps {
  storeSelector: (store: AppState) => CounterState;
}

interface CounterDispatch {
  readonly increment: () => void;
  readonly decrement: () => void;
  readonly startLoad: () => void;
  readonly dataLoaded: (data: object) => void;
}

type CounterAllProps = CounterProps & CounterState & CounterDispatch;

function mapStateToProps(state: AppState, ownProps: CounterProps): CounterState {
  return ownProps.storeSelector(state);
}

enum CounterActions {
  INCREMENT = '@@counter/INCREMENT',
  DECREMENT = '@@counter/DECREMENT',
  // DECREMENT2 = '@@counter/DECREMENT2',
  LOAD = '@@counter/LOAD',
  LOADED = '@@counter/LOADED',
}

function mapDispatchToProps(dispatch: Dispatch<Action<CounterActions>>): CounterDispatch {
  return {
    increment: () => dispatch({ type: CounterActions.INCREMENT }),
    decrement: () => dispatch({ type: CounterActions.DECREMENT }),
    startLoad: () => dispatch({ type: CounterActions.LOAD }),
    dataLoaded: (data) => dispatch({ type: CounterActions.LOADED, payload: data }),
  };
}

export function counterReducer(state = initialState, action: CounterAction): CounterState {
  switch (action.type) {
    case CounterActions.LOAD:
      return {
        ...state,
        loading: true,
      };
    case CounterActions.LOADED:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case CounterActions.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case CounterActions.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      // noinspection JSUnusedLocalSymbols The following line guarantees that every action in the KnownAction union has been covered by a case above
      const exhaustiveCheck: never = action.type;
      return state;
  }
}

const style: CSSProperties = {
  textAlign: 'left',
  color: '#ffffff',
};

class ReduxCounter extends React.Component<CounterAllProps> {
  private loadData = () => {
    this.props.startLoad();
    fetch(`${contextPath}/actuator/info`)
      .then((response) => response.json())
      .then((info) => info.build)
      .then((body) => this.props.dataLoaded(body))
      .catch((error) => this.props.dataLoaded(error));
  };

  public render() {
    const { count, increment, decrement, loading, data } = this.props;
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
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxCounter);
