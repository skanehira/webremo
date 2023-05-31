type Headers = {
  [key: string]: string;
};

class Client {
  endpoint: string;
  headers: Headers;

  constructor() {
    this.endpoint =
      import.meta.env.VITE_ENDPOINT ?? "https://api.nature.global";
    this.headers = {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN ?? "foo"}`,
    };
  }

  fetch(path: string, init?: RequestInit) {
    if (init?.headers) {
      Object.assign(init.headers, this.headers);
    }
    return fetch(`${this.endpoint}/${path}`, {
      headers: this.headers,
      ...init,
    });
  }

  get(path: string) {
    return fetch(`${this.endpoint}/${path}`, {
      headers: this.headers,
    });
  }
}

export const client = new Client();
