import { ISignUpService, ISignInService } from "../domain/useCases";
import { Credential, Email, User } from "../domain/entities";
import { iHttpClient } from "core/infrastructure/interfaces/iHttpClient";

// TODO: This is just an illustrative example, this could've be a HTTP request, Database query, etc...
export class SignInService implements ISignInService {
  constructor(private httpClient: iHttpClient) {}

  async signInWithCredential(credential: Credential): Promise<User> {
    const userRes: User = await this.httpClient.request({
      url: "signIn",
      method: "POST",
      body: credential,
    });

    return new User(userRes._firstName, userRes._lastName, userRes.email);
  }
}

export class SignUpService implements ISignUpService {
  constructor(private httpClient: iHttpClient) {}

  async signUpUser(user: User, credential: Credential): Promise<User> {
    const userRes: User = await this.httpClient.request({
      url: "signUp",
      method: "POST",
      body: { user, credential },
    });

    return new User(userRes._firstName, userRes._lastName, userRes.email);
  }

  async verifyExistingEmail(email: Email): Promise<boolean> {
    const existed: boolean = await this.httpClient.request({
      url: "verify",
      method: "POST",
      body: { email },
    });
    console.log(existed);

    return Promise.resolve(existed);
  }
}
