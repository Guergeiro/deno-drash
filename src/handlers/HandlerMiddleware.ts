import { Request } from "../../deps.ts";
import { IHandler } from "./IHandler.ts";

class HandlerMiddleware implements IHandler {
  private wrappe: IHandler;

  public constructor(wrappe: IHandler) {
    this.wrappe = wrappe;
  }

  public handle(request: Request) {
    return this.wrappe.handle(request);
  }

  public setNext(handler: IHandler) {
    return this.wrappe.setNext(handler);
  }
}

export { HandlerMiddleware };
