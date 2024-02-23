export type DefaultHttpResponse<T> = {
  statusCode: number;
  data: T,
  message?: string
}