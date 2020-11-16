import { Request, Response } from "../../../deps.ts";
import { IResource } from "../../http/resources/IResource.ts";
import { Handler } from "../../handlers/Handler.ts";

class ResourceHandler extends Handler {
  private resources: Map<string, IResource>;

  public constructor(resources: Map<string, IResource>) {
    super();
    this.resources = resources;
  }

  public async handle(request: Request) {
    const resource = this.resources.get(request["url"]);

    if (resource == null) {
      const out = new TextEncoder().encode("Not found.\n");
      const response: Response = {
        status: 404,
        body: out,
      };
      return response;
    }

    const methodToExecute = request["method"].toUpperCase();
    // @ts-ignore For some reason, we cannot envoke method with string name...
    // ```typescript
    // resource["GET"](request); // Works
    //
    // const method = "GET";
    // resource[method](request); //Doesn't work
    // ```
    const response = await resource[methodToExecute](request);
    return response;
  }
}

export { ResourceHandler };
