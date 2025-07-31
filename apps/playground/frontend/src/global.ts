import { Buffer } from 'buffer';

// @ts-expect-error 
globalThis.process = {
  env: {
    NODE_ENV: import.meta.env.MODE, // Map `MODE` to `process.env.NODE_ENV`.
  },
};

globalThis.Buffer = Buffer;