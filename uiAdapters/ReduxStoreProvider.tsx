import React from "react";
import { Provider } from "react-redux";
import { IReduxStoreAdapater } from "../core/adapters/redux";

import { AppDIContainer } from "../di/container";

const store = AppDIContainer.get<IReduxStoreAdapater>();
const reduxStore = store.getStore();

const ReduxStoreProvider = ({ children }: { children: any }) => {
  return <Provider store={reduxStore}>{children}</Provider>;
};

export default ReduxStoreProvider;
