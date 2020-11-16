import { Request } from "../../../deps.ts";
import { Response } from "../../../deps.ts";
import { IResource } from "./IResource.ts";


class Resource implements IResource {
  public async CONNECT(request: Request) {
    const response: Response = {
      status: 404,
    };
    return response;
  }

  public async DELETE(request: Request) {
    const response: Response = {
      status: 404,
    };
    return response;
  }

  public async GET(request: Request) {
    const response: Response = {
      status: 404,
    };
    return response;
  }

  public async HEAD(request: Request) {
    const response: Response = {
      status: 404,
    };
    return response;
  }

  public async OPTIONS(request: Request) {
    const response: Response = {
      status: 404,
    };
    return response;
  }

  public async PATCH(request: Request) {
    const response: Response = {
      status: 404,
    };
    return response;
  }

  public async POST(request: Request) {
    const response: Response = {
      status: 404,
    };
    return response;
  }

  public async PUT(request: Request) {
    const response: Response = {
      status: 404,
    };
    return response;
  }

  public async TRACE(request: Request) {
    const response: Response = {
      status: 404,
    };
    return response;
  }
}

export { Resource };
