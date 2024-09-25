import {
  createServer
} from "node:http";
import {
  parse
} from "node:url";
import {
  routes
} from "./routes/routes.js";

const PORT = process.env.PORT || 4000;

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  const parsedUrl = parse(req.url, true);
  const query = parsedUrl.query;
  //console.log(req)
  console.log(query['x-api-key']);
  console.log(req.headers);
  let apiKey;
  const path = parsedUrl.pathname;
  const method = req.method.toUpperCase();
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    apiKey = query['x-api-key'] || req.headers['x-api-key'];
    console.log(apiKey);
  }
  let handler = routes[path] && routes[path][method];

  if (!handler) {
    const routeKeys = Object.keys(routes).filter((key) => key.includes(":"));
    const matchedKey = routeKeys.find((key) => {
      // replacing each segment of the key that starts with a colon (:)
      const regex = new RegExp(`^${key.replace(/:[^/]+/g, "([^/]+)")}$`);
      return regex.test(path);
    });
    if (matchedKey) {
      const regex = new RegExp(`^${matchedKey.replace(/:[^/]+/g, "([^/]+)")}$`);
      const dynamicParams = regex.exec(path).slice(1);
      const dynamicHandler = routes[matchedKey][method];
      const paramKeys = matchedKey
      .match(/:[^/]+/g)
      .map((key) => key.substring(1));
      const params = dynamicParams.reduce(
        (acc, val, i) => ({
          ...acc, [paramKeys[i]]: val
        }),
        {}
      );
      // set params in req
      req.params = params;

      handler = dynamicHandler;
    }
  }

  // url and method not match
  if (!handler) {
    handler = routes.notFound;
  }

  // set query string in req
  /*req.query = {};

  for (const key in query) {
    req.query[key] = query[key];
  }
  console.log(req.query);*/
  handler(req, res, apiKey);
});

// global middleware
//server.on("request", loggerMiddleware);

server.listen(PORT, () => console.log(`server listening on port: ${PORT}`));