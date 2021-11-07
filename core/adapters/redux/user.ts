import { User } from "../../domain/entities";
import { initialState, StateType } from "./state";
import { Reducer, Action } from "redux";

const UPDATE_USER = "user/update";
const SIGN_OUT = "user/signOut";

type StateSlice = StateType["user"];

export interface ActionType {
  type: string;
}

export interface UpdateUserActionType {
  type: string;
  user: User | null;
}
export interface SignOutActionType {
  type: string;
}

export const userSelector = (state: StateType): StateSlice => state.user;
export const updateUserAction = (user: User | null): UpdateUserActionType => ({
  type: UPDATE_USER,
  user,
});
export const signOutAction = (): ActionType => ({
  type: SIGN_OUT,
});

function isAction<A extends Action>(action: Action, type: any): action is A {
  return action.type === type;
}

type IAction = UpdateUserActionType | ActionType;

export const userReducer: Reducer<StateSlice, IAction> = (
  state: StateSlice = initialState.user,
  action: IAction
) => {
  if (isAction<UpdateUserActionType>(action, UPDATE_USER)) {
    return action.user;
  }
  if (isAction<SignOutActionType>(action, SIGN_OUT)) {
    return null;
  }

  return state;
};
