import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { counterSaga } from './components/ReduxSagaCounter';

import { counterReducer, CounterState } from './components/ReduxSagaCounter';

const contextPath = process.env.REACT_APP_CONTEXT_PATH || '/';

export const history = createBrowserHistory({
  basename: contextPath,
});

export interface AppState {
  router: RouterState;
  counter: CounterState;
}

const rootReducer = combineReducers<AppState>({
  router: connectRouter(history),
  counter: counterReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history)];

sagaMiddleware.run(counterSaga);

const storeEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
export const store = createStore(rootReducer, {}, storeEnhancer);
