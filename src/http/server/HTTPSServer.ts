import { HTTPSOptions, serveTLS } from "../../../deps.ts";
import { IHandler } from "../../handlers/IHandler.ts";
import { IServer } from "./IServer.ts";

class HTTPSServer implements IServer {
  private options: HTTPSOptions;

  public constructor(options: HTTPSOptions) {
    this.options = options;
  }

  public async run(handler: IHandler) {
    const server = serveTLS(this.options);
    for await (const request of server) {
      handler
        .handle(request)
        .then(function (response) {
          request.respond(response);
        })
        .catch(function () {
          const response = {
            status: 500,
            body: new TextEncoder().encode("Internal server error."),
          };
          request.respond(response);
        });
    }
  }
}

export { HTTPSServer };
