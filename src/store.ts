import {createBrowserHistory, History} from 'history'
import {applyMiddleware, combineReducers, createStore, DeepPartial} from 'redux'
import {connectRouter, routerMiddleware, RouterState} from 'connected-react-router'
import {composeWithDevTools} from 'redux-devtools-extension';
import {CounterState, reducer as counterReducer} from "./components/ReduxCounter";

const contextPath = process.env.REACT_APP_CONTEXT_PATH || '/';

export const history = createBrowserHistory({
  basename: contextPath,
});

export interface AppState {
  router: RouterState,
  counter: CounterState
}

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  counter: counterReducer
});

export default function configureStore(preloadedState: DeepPartial<AppState>) {
  const storeEnhancer = composeWithDevTools(applyMiddleware(routerMiddleware(history)));
  const rootReducer = createRootReducer(history);
  return createStore(rootReducer, preloadedState, storeEnhancer)
}
