import {createBrowserHistory, History} from 'history'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
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

console.log(contextPath);


export default function configureStore(preloadedState: any) {
  return createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
      ),
    )
  )
}
