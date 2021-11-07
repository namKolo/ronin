import { DIContainer } from "@wessberg/di";
import {
  iHttpClient,
  IRequestOption,
} from "core/infrastructure/interfaces/iHttpClient";
// import { HttpClient } from "core/infrastructure/HttpClient";
import ReduxStoreAdapater, {
  IReduxStoreAdapater,
} from "../core/adapters/redux";
import {
  SignInInteractor,
  ISignInService,
  SignUpInteractor,
  ISignUpService,
} from "../core/domain/useCases";
import { ISignInUseCase } from "../core/domain/useCases/interfaces/iSignInUseCase";
import { ISignUpUseCase } from "../core/domain/useCases/interfaces/iSignUpUseCase";
import { SignInService, SignUpService } from "../core/services";

class FakeHttpClient implements iHttpClient {
  fakeRequest(data: any) {
    return new Promise((res) => {
      setTimeout(() => res(data), 100);
    });
  }

  request(requestOption: IRequestOption): Promise<any> {
    const { url } = requestOption;
    let res;
    if (url === "signIn" || url === "signUp") {
      res = {
        _firstName: "Nam",
        _lastName: "Tran",
        email: "nam_tran@gmail.com",
      };
    }
    if (url === "verify") res = true;

    return this.fakeRequest(res);
  }
}

function inject() {
  const container = new DIContainer();
  container.registerSingleton<iHttpClient, FakeHttpClient>();

  container.registerSingleton<ISignUpService, SignUpService>();
  container.registerSingleton<ISignInService, SignInService>();

  container.registerSingleton<ISignUpUseCase, SignUpInteractor>();
  container.registerSingleton<ISignInUseCase, SignInInteractor>();
  container.registerSingleton<IReduxStoreAdapater, ReduxStoreAdapater>();

  return container;
}

export const AppDIContainer = inject();
