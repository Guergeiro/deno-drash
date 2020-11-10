import { Request } from "../../deps.ts";
import { Response } from "../../deps.ts";

interface IResource {
  CONNECT(request: Request): Promise<Response>;
  DELETE(request: Request): Promise<Response>;
  GET(request: Request): Promise<Response>;
  HEAD(request: Request): Promise<Response>;
  OPTIONS(request: Request): Promise<Response>;
  PATCH(request: Request): Promise<Response>;
  POST(request: Request): Promise<Response>;
  PUT(request: Request): Promise<Response>;
  TRACE(request: Request): Promise<Response>;
}

export { IResource };
