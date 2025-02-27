export interface ResponseApi<T> {
  data: T;
  message: string;
  status: number;
}

