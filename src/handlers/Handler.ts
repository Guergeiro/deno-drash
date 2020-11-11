import { Request } from "../../deps.ts";
import { IHandler } from "./IHandler.ts";

abstract class Handler implements IHandler {
  private nextHandler?: IHandler;

  public setNext(handler: IHandler) {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: Request) {
    if (this.nextHandler == null) {
      throw new Error();
    }
    return this.nextHandler.handle(request);
  }
}

export { Handler };
