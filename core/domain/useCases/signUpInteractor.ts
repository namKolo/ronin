import { Credential, User, Email } from "../entities";
import { ISignUpUseCase } from "./interfaces/iSignUpUseCase";

export interface ISignUpService {
  signUpUser: (user: User, credential: Credential) => Promise<User>;
  verifyExistingEmail: (email: Email) => Promise<boolean>;
}

export class SignUpInteractor implements ISignUpUseCase {
  constructor(private signUpService: ISignUpService) {}

  async signUp(
    firstName: string,
    lastName: string,
    credential: Credential
  ): Promise<User> {
    const emailInUse = await this.signUpService.verifyExistingEmail(
      credential._email
    );
    if (emailInUse) {
      throw new Error(
        "There's an User with this email, if you forgot your pass..."
      );
    }

    const user = new User(firstName, lastName, credential.email);
    return this.signUpService.signUpUser(user, credential);
  }
}
