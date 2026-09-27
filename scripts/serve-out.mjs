#!/usr/bin/env node
// Minimal static file server for the `out/` export directory. Used by
// scripts/verify.sh to smoke-test the GitHub Pages build locally
// (`next start` cannot be used with `output: "export"`).
//
// Usage: node scripts/serve-out.mjs [port] [dir] [basePath]
//   port      default 3100
//   dir       default out (relative to cwd)
//   basePath  default ""; stripped from the URL before resolving (the export
//             output is rooted at the site root, not at the base path)
//
// Behaviors emulated to match GitHub Pages (Apache):
//   /foo/       -> /foo/index.html
//   /foo        -> /foo/index.html if it exists
//   /foo        -> /foo.html (pagesExtensions output) if it exists
import http from "node:http";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import process from "node:process";

const PORT = Number(process.argv[2] ?? 3100);
const ROOT = path.resolve(process.argv[3] ?? "out");
const BASE = (process.argv[4] ?? "").replace(/\/$/, "");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
};

http
  .createServer(async (req, res) => {
    try {
      let urlPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
      if (BASE && (urlPath === BASE || urlPath.startsWith(BASE + "/"))) {
        urlPath = urlPath.slice(BASE.length) || "/";
      }
      const target = path.normalize(path.join(ROOT, urlPath));
      if (target !== ROOT && !target.startsWith(ROOT + path.sep)) {
        res.writeHead(403);
        res.end("forbidden");
        return;
      }
      // Deliberately NO `.html` fallback: GitHub Pages (nginx) does not do
      // `foo` -> `foo.html`, and we want regressions in the export layout to
      // surface here exactly as they would on Pages.
      let file = null;
      try {
        const st = await stat(target);
        file = st.isDirectory() ? path.join(target, "index.html") : target;
      } catch {
        file = null;
      }
      if (!file || !(await stat(file).catch(() => null))) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      res.writeHead(200, { "content-type": MIME[path.extname(file)] ?? "application/octet-stream" });
      createReadStream(file).pipe(res);
    } catch {
      res.writeHead(500);
      res.end("internal error");
    }
  })
  .listen(PORT, () => console.log(`serving ${ROOT} on :${PORT}`));
