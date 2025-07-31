import { Buffer } from 'buffer';

// @ts-expect-error - We're adding process.env to globalThis for compatibility with Node.js modules
globalThis.process = {
  env: {
    NODE_ENV: import.meta.env.MODE, // Map `MODE` to `process.env.NODE_ENV`.
  },
};

globalThis.Buffer = Buffer;