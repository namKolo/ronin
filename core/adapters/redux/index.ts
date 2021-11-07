import { Action, Store } from "redux";
import { userReducer } from "./user";
import RootSaga from "./saga";
import ReduxStore from "../../infrastructure/ReduxStore";
import { StateType } from "./state";
import { ISignUpUseCase } from "../../domain/useCases/interfaces/iSignUpUseCase";
import { ISignInUseCase } from "../../domain/useCases/interfaces/iSignInUseCase";

const rootReducer = {
  user: userReducer,
};

export interface IReduxStoreAdapater {
  getStore: () => Store<StateType, Action>;
}

class ReduxStoreAdapater {
  private store: ReduxStore<StateType>;

  constructor(signUpUseCase: ISignUpUseCase, signInUseCase: ISignInUseCase) {
    const rootSaga = RootSaga(signUpUseCase, signInUseCase);
    const store = new ReduxStore<StateType>({
      rootReducer,
      rootSaga: rootSaga.getRootSaga,
    });
    this.store = store;
  }

  getStore() {
    return this.store.getStore();
  }
}

export default ReduxStoreAdapater;
