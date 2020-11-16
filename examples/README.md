# Examples

This is just some examples of how things are done. It is really work in progress
and a bunch of abstraction needs to be done.

## Simple Resource creation

```ts
/**
 * Snippet #1
 */
// Creating a simple resource
class Home extends Resource {
  // We have access to ALL HTTP Methods specified in HTTP/1.1
  // More info here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
  public async GET(request: Request) {
    const out = new TextEncoder().encode("This is home.\n");
    const response: Response = {
      status: 200,
      body: out,
    };
    return response;
  }
  public async POST(request: Request) {
    const out = new TextEncoder().encode("This is home POST.\n");
    const response: Response = {
      status: 200,
      body: out,
    };
    return response;
  }
}
const homeResource = new Home();
const resources: Map<string, IResource> = new Map();
resources.set("/home", homeResource);

const firstHandler = new ResourceHandler(resources);

// If certFile and keyFile is passed, and HTTPS server will be created
const server = createServer({ hostname: "0.0.0.0", port: 8080 });
server.run(firstHandler);
```

## Extending a Resource (Middleware)

Picking up from Snippet #1.

```ts
/**
 * Snippet #2
 */
// Creating a middleware that doesn't break the flow
class Home extends Resource {
  ...
}

class Logger extends ResourceMiddleware {
  public async GET(request: Request) {
    console.log("Will start handling a GET request");
    const response = await super.GET();
    console.log("I finished handling a GET request");
    return response;
  }
}

const homeResource = new Logger(new Home());
const resources: Map<string, IResource> = new Map();
resources.set("/home", homeResource);

const firstHandler = new ResourceHandler(resources);

// If certFile and keyFile is passed, and HTTPS server will be created
const server = createServer({ hostname: "0.0.0.0", port: 8080 });
server.run(firstHandler);
```

```ts
/**
 * Snippet #3
 */
// Creating a middleware that breaks the flow
class Home extends Resource {
  ...
}

class Html extends ResourceMiddleware {
  public async GET(request: Request) {
    if (request.headers.get("Accept") == "text/html") {
      const out = new TextEncoder().encode("I don't handle html\n");
      const response: Response = {
        status: 406,
        body: out
      }
      return response;
    }
    const response = await super.GET();
    return response;
  }
}

const homeResource = new Html(new Home());
const resources: Map<string, IResource> = new Map();
resources.set("/home", homeResource);

const firstHandler = new ResourceHandler(resources);

// If certFile and keyFile is passed, and HTTPS server will be created
const server = createServer({ hostname: "0.0.0.0", port: 8080 });
server.run(firstHandler);
```

What if I want to add the Html behaviour to all resources? Do I have to code to
all of them?

No. There are 2 ways of doing this. Either you create a new handler that filters
everything or you create a middleware specific to the ResourceHandler (this can
be added to any handler, not only ResourceHandler).

## Adding a new Handler

Picking up from Snippet #2

```ts
/**
 * Snippet #4
 */
// Creating a Handler
class Home extends Resource {
  ...
}

class Logger extends ResourceMiddleware {
  ...
}

const homeResource = new Logger(new Home());
const resources: Map<string, IResource> = new Map();
resources.set("/home", homeResource);

const resourcesHandler = new ResourceHandler(resources);

class HtmlHandler extends Handler {
  public async handle(request: Request) {
    if (request.headers.get("Accept") == "text/html") {
      const out = new TextEncoder().encode("I don't handle html\n");
      const response: Response = {
        status: 406,
        body: out
      }
      return response;
    }
    return super.handle(request);
  }
}

const firstHandler = new HtmlHandler();
firstHandler.setNext(resourcesHandler);

// If certFile and keyFile is passed, and HTTPS server will be created
const server = createServer({ hostname: "0.0.0.0", port: 8080 });
server.run(firstHandler);
```

## Adding a new HandlerMiddleware

Picking up from Snippet #1

```ts
/**
 * Snippet #5
 */
// Creating a Handler
class Home extends Resource {
  ...
}

const homeResource = new Home();
const resources: Map<string, IResource> = new Map();
resources.set("/home", homeResource);

class Html extends HandlerMiddleware {
  public async handle(request: Request) {
    console.log("I will start handling some request");
    const response = await super.handle(request);
    console.log("I finished handling some request");
    return response;
  }
}

const firstHandler = new Html(new ResourceHandler(resources));

// If certFile and keyFile is passed, and HTTPS server will be created
const server = createServer({ hostname: "0.0.0.0", port: 8080 });
server.run(firstHandler);
```
