export interface SharedCode {
  html: string;
  css: string;
  javascript: string;
}

async function pipe(data: Uint8Array<ArrayBuffer>, stream: GenericTransformStream) {
  const output = new Blob([data]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(output).arrayBuffer());
}

export async function encodeCode(code: SharedCode) {
  const json = new TextEncoder().encode(JSON.stringify(code));
  const bytes = await pipe(json, new CompressionStream("deflate-raw"));
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function decodeCode(encoded: string): Promise<SharedCode> {
  const binary = atob(encoded.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const json = await pipe(bytes, new DecompressionStream("deflate-raw"));
  const { html = "", css = "", javascript = "" } = JSON.parse(new TextDecoder().decode(json));
  return { html: String(html), css: String(css), javascript: String(javascript) };
}
