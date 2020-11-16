import {IHandler} from "../../handlers/IHandler.ts";

interface IServer {
  run(handler: IHandler): Promise<void>;
}

export { IServer };
