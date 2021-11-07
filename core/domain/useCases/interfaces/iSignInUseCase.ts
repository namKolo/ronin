import { Credential, User } from "../../entities";

export interface ISignInUseCase {
  signIn: (credential: Credential) => Promise<User>;
}
