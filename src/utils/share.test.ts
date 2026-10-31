import assert from "node:assert/strict";
import { encodeCode, decodeCode } from "./share.ts";

const code = { html: "<h1>Hola ñandú 🚀</h1>", css: "h1 { color: red }", javascript: "console.log(1 + 1)\n".repeat(5000) };
const encoded = await encodeCode(code);
assert.match(encoded, /^[A-Za-z0-9_-]+$/);
assert.deepEqual(await decodeCode(encoded), code);
await assert.rejects(decodeCode("not-valid"));
