import { AxiosRequestConfig, AxiosResponse } from "axios";
import instance from "./axios";

const isPlainObject = (o: unknown): boolean => o?.constructor === Object;

type ErrorResponse = {
  error: string;
  status?: string | boolean;
  message?: string;
  statusCode?: number;
};

type SuccessResponse<T = unknown> = {
  status: string | boolean;
  message: string;
  data?: T;
};

export type BaseResponse<T = unknown> = ErrorResponse | SuccessResponse<T>;

class API {
  static post = async <D, T>(
    endpoint: string,
    data: D,
    config?: AxiosRequestConfig<D>
  ): Promise<BaseResponse<T>> => {
    const result = await instance.post<
      SuccessResponse<T> | ErrorResponse,
      AxiosResponse<SuccessResponse<T> | ErrorResponse>,
      D
    >(endpoint, data, config);
    if (!result || !isPlainObject(result))
      return {
        error: "Something went wrong",
      };
    return result.data;
  };

  static patch = async <D, T>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<BaseResponse<T>> => {
    const result = await instance.patch<
      SuccessResponse<T> | ErrorResponse,
      AxiosResponse<SuccessResponse<T> | ErrorResponse>,
      D
    >(endpoint, data, config);
    if (!result || !isPlainObject(result))
      return {
        error: "Something went wrong",
      };
    return result.data;
  };

  static put = async <D, T>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<BaseResponse<T>> => {
    const result = await instance.put<
      SuccessResponse<T> | ErrorResponse,
      AxiosResponse<SuccessResponse<T> | ErrorResponse>,
      D
    >(endpoint, data, config);
    if (!result || !isPlainObject(result))
      return {
        error: "Something went wrong",
      };
    return result.data;
  };

  static get = async <T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<BaseResponse<T>> => {
    const result = await instance.get<SuccessResponse<T> | ErrorResponse>(
      endpoint,
      config
    );
    if (!result || !isPlainObject(result))
      return {
        error: "Something went wrong",
      };
    return result.data;
  };

  static delete = async <T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<BaseResponse<T>> => {
    const result = await instance.delete<SuccessResponse<T> | ErrorResponse>(
      endpoint,
      config
    );
    if (!result || !isPlainObject(result))
      return {
        error: "Something went wrong",
      };
    return result.data;
  };
}

export default API;
