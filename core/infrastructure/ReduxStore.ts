import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
  ReducersMapObject,
  Store,
} from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import { iStateManager } from "./interfaces/iStateManager";

type StoreData<State> = {
  rootReducer: ReducersMapObject<State>;
  rootSaga?: any;
};

class ReduxStore<ApplicationState>
  implements iStateManager<ApplicationState, Store<ApplicationState>>
{
  private store: Store<ApplicationState>;

  constructor(storeData: StoreData<ApplicationState>) {
    const { rootReducer, rootSaga } = storeData;
    let middlewares: Array<Middleware> = [];
    let sagaMiddleware;

    if (rootSaga) {
      sagaMiddleware = createSagaMiddleware();
      middlewares.push(sagaMiddleware);
    }

    middlewares.push(logger);

    const store = createStore(
      combineReducers(rootReducer),
      applyMiddleware(...middlewares)
    );

    if (sagaMiddleware) {
      sagaMiddleware?.run(rootSaga);
    }

    this.store = store;
  }

  getStore() {
    return this.store;
  }

  getState() {
    return this.store.getState();
  }

  dispatch(action: any) {
    this.store.dispatch(action);
  }

  subscribe(cb: () => void) {
    return this.store.subscribe(cb);
  }
}

export default ReduxStore;
