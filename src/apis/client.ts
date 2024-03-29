class Client {
  endpoint: string;

  constructor() {
    this.endpoint = import.meta.env.VITE_ENDPOINT ?? "http://localhost:3000";
  }

  fetch(path: string, init?: RequestInit) {
    return fetch(`${this.endpoint}/api/1/${path}`, init);
  }
}

export const client = new Client();
