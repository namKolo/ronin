import { iHttpClient, IRequestOption } from "./interfaces/iHttpClient";

export class HttpClient implements iHttpClient {
  request(requestOption: IRequestOption): Promise<any> {
    const option: RequestInit = { method: requestOption.method };

    if (requestOption?.headers)
      option.headers = new Headers(requestOption.headers);
    if (requestOption?.body) option.body = JSON.stringify(requestOption.body);

    return fetch(requestOption.url, option)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  }
}
