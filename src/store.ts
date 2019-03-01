import {createBrowserHistory, History} from 'history'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {composeWithDevTools} from 'redux-devtools-extension';

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history)
});

export const history = createBrowserHistory();

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
