import { Credential, User } from "../entities";
import { ISignInUseCase } from "./interfaces/iSignInUseCase";

export interface ISignInService {
  signInWithCredential: (credential: Credential) => Promise<User>;
}

export class SignInInteractor implements ISignInUseCase {
  constructor(private signInService: ISignInService) {}

  async signIn(credential: Credential): Promise<User> {
    return this.signInService.signInWithCredential(credential);
  }
}
