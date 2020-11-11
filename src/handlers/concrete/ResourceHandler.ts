import { Request } from "../../../deps.ts";
import { IResource } from "../../resources/IResource.ts";
import { Handler } from "../Handler.ts";

class ResourceHandler extends Handler {
  private resources: { [path: string]: IResource };

  public constructor(resources: { [path: string]: IResource }) {
    super();
    this.resources = resources;
  }

  public handle(request: Request) {
    const resource = this.resources[request["url"]];

    if (resource == null) {
      return super.handle(request);
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
