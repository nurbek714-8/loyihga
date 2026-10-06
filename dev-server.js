const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const pagePath = path.join(__dirname, "index.html");
const port = Number(process.env.PORT) || 3000;

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  if (pathname !== "/" && pathname !== "/index.html") {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  fs.readFile(pagePath, (error, content) => {
    if (error) {
      console.error(`Sahifani o‘qib bo‘lmadi: ${error.message}`);
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Sahifani ochib bo‘lmadi.");
      return;
    }

    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(request.method === "HEAD" ? undefined : content);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`IT LIVE tayyor: http://localhost:${port}`);
});
