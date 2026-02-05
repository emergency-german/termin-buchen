// /next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keine output-Einstellung wie "export" — damit dynamische API-Routen (cookies, DB, Middleware)
  // funktionieren. Wenn du statisches HTML erzwingen würdest (output: "export"),
  // können API-Routen / cookies / force-dynamic NICHT verwendet werden.
}

module.exports = nextConfig
