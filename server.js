import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)));
const CONTENT_TYPES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
]);

export function createAppServer() {
  return createServer(async (request, response) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" });
      response.end();
      return;
    }

    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    } catch {
      response.writeHead(400);
      response.end("Invalid request path");
      return;
    }

    const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
    const filePath = resolve(ROOT, relativePath);
    if (filePath !== ROOT && !filePath.startsWith(`${ROOT}${sep}`)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    let content;
    try {
      content = await readFile(filePath);
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "EISDIR") {
        response.writeHead(404);
        response.end("Not found");
        return;
      }
      console.error("Static file read failed:", error);
      response.writeHead(500);
      response.end("Unable to read requested file");
      return;
    }

    response.writeHead(200, {
      "Content-Type": CONTENT_TYPES.get(extname(filePath)) ?? "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : content);
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const server = createAppServer();
  server.listen(4173, "127.0.0.1", () => {
    console.log("Curso-PSWE-07 available at http://localhost:4173");
  });
}
