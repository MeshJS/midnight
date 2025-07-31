// Polyfill for Node.js Buffer
import { Buffer } from 'buffer';

// Ensure process.env is available globally
if (typeof globalThis.process === 'undefined') {
  // @ts-expect-error - Adding process to globalThis for Node.js compatibility
  globalThis.process = {
    env: {
      NODE_ENV: import.meta.env.MODE || 'production',
    },
    version: '', // Some libraries might check for process.version
    cwd: () => '/', // Default current working directory
  };
}

// Ensure Buffer is available globally
if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = Buffer;
}

// For environments that expect process.browser
// @ts-expect-error - Adding process.browser for compatibility
if (typeof process !== 'undefined' && !process.browser) {
  // @ts-expect-error - Adding process.browser
  process.browser = true;
}