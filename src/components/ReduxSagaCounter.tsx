import React, { CSSProperties } from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { takeLatest, put, call } from 'redux-saga/effects';

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

interface SagaCounterAction extends Action<SagaCounterActions> {
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

enum SagaCounterActions {
  INCREMENT = '@@sagaCounter/INCREMENT',
  DECREMENT = '@@sagaCounter/DECREMENT',
  // DECREMENT2 = '@@sagaCounter/DECREMENT2',
  LOAD = '@@sagaCounter/LOAD',
  LOADED = '@@sagaCounter/LOADED',
}

function mapDispatchToProps(dispatch: Dispatch<Action<SagaCounterActions>>): CounterDispatch {
  return {
    increment: () => dispatch({ type: SagaCounterActions.INCREMENT }),
    decrement: () => dispatch({ type: SagaCounterActions.DECREMENT }),
    startLoad: () => dispatch({ type: SagaCounterActions.LOAD }),
    dataLoaded: data => dispatch({ type: SagaCounterActions.LOADED, payload: data }),
  };
}

export function counterReducer(state = initialState, action: SagaCounterAction): CounterState {
  switch (action.type) {
    case SagaCounterActions.LOAD:
      return {
        ...state,
        loading: true,
      };
    case SagaCounterActions.LOADED:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case SagaCounterActions.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case SagaCounterActions.DECREMENT:
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

export function* fetchCommits() {
  let responseBody: Array<object>;
  try {
    const response = yield call(fetch, 'https://api.service.com/endpoint');
    responseBody = response.json();
  }
  console.log('load launched')
  yield put(SagaCounterActions.LOADED(responseBody));
}

export function* counterSaga() {
  yield takeLatest('@@sagaCounter/LOAD', fetchCommits);
}


const style: CSSProperties = {
  textAlign: 'left',
  color: '#ffffff',
};

class ReduxCounter extends React.Component<CounterAllProps> {
  private loadData = () => {
    this.props.startLoad();
    fetch(`${contextPath}/actuator/info`)
      .then(response => response.json())
      .then(info => info.build)
      .then(body => this.props.dataLoaded(body))
      .catch(error => this.props.dataLoaded(error));
  };

  public render() {
    const { count, increment, decrement, startLoad, loading, data } = this.props;
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={decrement}>-</button>
          <span>commit: {count}</span>
          <button onClick={increment}>+</button>
          <button onClick={startLoad}>fetch</button>
          <p>{loading && <span>loading data</span>}</p>
          <pre style={style}>{JSON.stringify(data, null, 4)}</pre>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxCounter);
