export interface IRequestOption {
  readonly method: string;
  readonly url: string;
  readonly headers?: any;
  readonly body?: any;
}

export interface iHttpClient {
  request(requestOption: IRequestOption): Promise<any>;
}
