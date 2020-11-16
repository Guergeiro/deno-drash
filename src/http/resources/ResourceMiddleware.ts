import { Request } from "../../../deps.ts";
import { IResource } from "./IResource.ts";

class ResourceMiddleware implements IResource {
  private wrappe: IResource;

  public constructor(wrappe: IResource) {
    this.wrappe = wrappe;
  }

  public CONNECT(request: Request) {
    return this.wrappe.CONNECT(request);
  }

  public DELETE(request: Request) {
    return this.wrappe.DELETE(request);
  }

  public GET(request: Request) {
    return this.wrappe.GET(request);
  }

  public HEAD(request: Request) {
    return this.wrappe.HEAD(request);
  }

  public OPTIONS(request: Request) {
    return this.wrappe.OPTIONS(request);
  }

  public PATCH(request: Request) {
    return this.wrappe.PATCH(request);
  }

  public POST(request: Request) {
    return this.wrappe.POST(request);
  }

  public PUT(request: Request) {
    return this.wrappe.PUT(request);
  }

  public TRACE(request: Request) {
    return this.wrappe.TRACE(request);
  }
}

export { ResourceMiddleware };
