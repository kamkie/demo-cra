import {createBrowserHistory, History} from 'history'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {connectRouter, routerMiddleware, RouterState} from 'connected-react-router'
import {composeWithDevTools} from 'redux-devtools-extension';
import {counterReducer, CounterState} from "./components/ReduxCounter";

const contextPath = process.env.REACT_APP_CONTEXT_PATH || '/';

export const history = createBrowserHistory({
  basename: contextPath,
});

export interface AppState {
  router: RouterState,
  counter: CounterState
}

const createRootReducer = (history: History) => combineReducers<AppState, any>({
  router: connectRouter(history),
  counter: counterReducer
});

export default function configureStore() {
  const storeEnhancer = composeWithDevTools(applyMiddleware(routerMiddleware(history)));
  const rootReducer = createRootReducer(history);
  return createStore(rootReducer, {}, storeEnhancer)
}
