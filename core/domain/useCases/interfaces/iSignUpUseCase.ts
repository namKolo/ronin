import { Credential, User } from "../../entities";

export interface ISignUpUseCase {
  signUp: (
    firstName: string,
    lastName: string,
    credential: Credential
  ) => Promise<User>;
}
