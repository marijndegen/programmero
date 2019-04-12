/* eslint-disable no-console */

/**
 * Creates a new secret for JWT to set in your .env file.
 * Execute with node.
 * @Source https://github.com/dwyl/learn-json-web-tokens#how-to-generate-secret-key
 */

console.log(require("crypto").randomBytes(32).toString("hex"));