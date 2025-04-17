import { createLogger } from './logger-utils.js';
import { run } from './cli.js';
import { TestnetRemoteConfig } from './config.js';

const config = new TestnetRemoteConfig();
const logger = await createLogger(config.logDir);
await run(config, logger);
