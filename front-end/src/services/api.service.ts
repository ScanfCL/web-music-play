import axios from 'axios';

export class ApiService {
  constructor(private readonly url: string) {}
  async get<T>(path: string, query?: object): Promise<T> {
    const response = await axios.get<T>(`${this.url}${path}`, {
      params: query,
    });
    return response.data;
  }

  async post<T>(path: string, body: object): Promise<T> {
    const response = await axios.post<T>(`${this.url}${path}`, body);
    return response.data;
  }

  async delete<T>(path: string): Promise<T> {
    const response = await axios.delete<T>(`${this.url}${path}`);
    return response.data;
  }
}
