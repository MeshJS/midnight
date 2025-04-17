import { createLogger } from './logger-utils.js';
import { run } from './cli.js';
import { TestnetLocalConfig } from './config.js';

const config = new TestnetLocalConfig();
const logger = await createLogger(config.logDir);
await run(config, logger);
