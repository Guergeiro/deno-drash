import { Request, Response } from "../../deps.ts";
interface IHandler {
  handle(request: Request): Promise<Response>;
  setNext(handler: IHandler): IHandler;
}

export { IHandler };
