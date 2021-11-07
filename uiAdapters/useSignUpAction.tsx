import { useDispatch } from "react-redux";
import { signUpAction } from "../core/adapters/redux/saga";
import { Credential } from "../core/domain/entities";

type SignUpPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface iSignUpAction {
  signUp: (p: SignUpPayload) => void;
}

function useSignUpAction(): iSignUpAction {
  const dispatch = useDispatch();
  const signUp = (p: SignUpPayload) => {
    dispatch(
      signUpAction(p.firstName, p.lastName, new Credential(p.email, p.password))
    );
  };

  return {
    signUp,
  };
}

export default useSignUpAction;
