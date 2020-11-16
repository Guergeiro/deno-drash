import { HTTPServer } from "../http/server/HTTPServer.ts";
import { HTTPSServer } from "../http/server/HTTPSServer.ts";

type options = {
  hostname: string | "0.0.0.0";
  port: number;
  certFile?: string;
  keyFile?: string;
};

function createServer(options: options) {
  if (!options.certFile) {
    return new HTTPServer(options);
  }
  if (!options.keyFile) {
    return new HTTPServer(options);
  }

  return new HTTPSServer({
    hostname: options.hostname,
    port: options.port,
    certFile: options.certFile,
    keyFile: options.keyFile,
  });
}

export { createServer };
