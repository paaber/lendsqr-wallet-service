import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IRes } from "@src/routes/types/express/misc";

type Data = { [key: string]: any };
type Status = "success" | "error";
interface IRetJson<T = undefined> {
  status: Status;
  message: string;
  data?: T extends Data ? T : Data;
}

export default class ApiResponse<K> {
  private data: IRetJson<K>;

  constructor(
    status: IRetJson["status"],
    message: IRetJson["message"],
    data?: IRetJson<K>["data"]
  ) {
    this.data = { status, message, data };
  }

  valueOf() {
    return this.data;
  }
}

export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export function sendInternalServerError(
  res: IRes,
  mes = "An unexpected error occurred."
) {
  return res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .json(new ApiResponse(ResponseStatus.ERROR, mes).valueOf());
}

export function sendBadRequest(res: IRes, message = "Bad request") {
  return res
    .status(HttpStatusCodes.BAD_REQUEST)
    .json(new ApiResponse(ResponseStatus.ERROR, message).valueOf());
}

export function sendForbidden(
  res: IRes,
  message = "You cannot access this resource"
) {
  return res
    .status(HttpStatusCodes.FORBIDDEN)
    .json(new ApiResponse(ResponseStatus.ERROR, message).valueOf());
}

export function sendUnauthorized(
  res: IRes,
  message = "Authorization failed. You cannot carry out this action"
) {
  return res
    .status(HttpStatusCodes.UNAUTHORIZED)
    .json(new ApiResponse(ResponseStatus.ERROR, message).valueOf());
}

export function sendNotFound(res: IRes, message = "Resource not found") {
  return res
    .status(HttpStatusCodes.NOT_FOUND)
    .json(new ApiResponse(ResponseStatus.ERROR, message).valueOf());
}

export function sendConflict(res: IRes, message = "Resource already exists") {
  return res
    .status(HttpStatusCodes.CONFLICT)
    .json(new ApiResponse(ResponseStatus.ERROR, message).valueOf());
}

interface JsonResponse {
  responseCtx: IRes;
  status: Status;
  statusCode: number;
  message: string;
  data?: Data;
}

export function sendJsonResponse({
  responseCtx,
  status,
  statusCode,
  message,
  data,
}: JsonResponse) {
  return responseCtx
    .status(statusCode)
    .json(new ApiResponse(status, message, data).valueOf());
}
