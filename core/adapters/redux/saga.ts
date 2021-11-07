import { all, call, put, takeLatest } from "redux-saga/effects";
import { Credential, User } from "../../domain/entities";
import { updateUserAction } from "./user";
import { ISignUpUseCase } from "../../domain/useCases/interfaces/iSignUpUseCase";
import { ISignInUseCase } from "../../domain/useCases/interfaces/iSignInUseCase";

export const SIGN_IN = "user/saga/sign_in";
export const SIGN_UP = "user/saga/sign_up";

interface SignInActionType {
  type: string;
  credential: Credential;
}

interface SignUpActionType {
  type: string;
  firstName: string;
  lastName: string;
  credential: Credential;
}

export const signInAction = (credential: Credential): SignInActionType => ({
  type: SIGN_IN,
  credential,
});

export const signUpAction = (
  firstName: string,
  lastName: string,
  credential: Credential
): SignUpActionType => {
  return {
    type: SIGN_UP,
    credential,
    firstName,
    lastName,
  };
};

export type iRootSaga = {
  getRootSaga: Function;
};

const RootSaga = (
  signUpUseCase: ISignUpUseCase,
  signInUseCase: ISignInUseCase
) => {
  const su = signUpUseCase;
  const si = signInUseCase;
  const signInSaga = (signInUseCase: ISignInUseCase) =>
    function* (action: SignInActionType) {
      const { credential } = action;
      if (!signInUseCase) return;
      try {
        const user: User = yield signInUseCase.signIn(credential);
        yield put(updateUserAction(user));
      } catch (error) {
        console.error(error);
        // DO SOMETHING ELSE
      }
    };

  const signUpSaga = (signUpUseCase: ISignUpUseCase) =>
    function* (action: SignUpActionType) {
      const { firstName, lastName, credential } = action;
      try {
        const user: User = yield signUpUseCase.signUp(
          firstName,
          lastName,
          credential
        );
        yield put(updateUserAction(user));
      } catch (error) {
        console.error(error);
      }
    };
  return {
    getRootSaga: function* () {
      yield all([
        takeLatest(SIGN_IN, signInSaga(si)),
        takeLatest(SIGN_UP, signUpSaga(su)),
      ]);
    },
  };
};

export default RootSaga;
