import { HTTPOptions, serve } from "../../../deps.ts";
import { IHandler } from "../../handlers/IHandler.ts";
import { IServer } from "./IServer.ts";

class HTTPServer implements IServer {
  private options: HTTPOptions;

  public constructor(options: HTTPOptions) {
    this.options = options;
  }

  public async run(handler: IHandler) {
    const server = serve(this.options);
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

export { HTTPServer };
