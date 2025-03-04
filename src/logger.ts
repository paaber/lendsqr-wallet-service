import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';
import { EnvVars } from './constants';

const ROOT = process.cwd();
const nowDate = new Date();
const date = `${nowDate.getFullYear()}-${nowDate.getMonth()}-${nowDate.getDate()}`;
let transport, exceptionHandler, rejectionHandler;

if (!fs.existsSync(path.join(ROOT, 'logs/'))) {
  fs.mkdirSync(path.join(ROOT, 'logs/'));
}

const formats = format.combine(
  format.timestamp(),
  format.printf(
    (info) =>
      `[${info.level.toUpperCase()}]: ${info.timestamp} - ${info.message} ${info.label || ''}`
  ),
  format.colorize({
    colors: { info: 'blue', error: 'red', warn: 'yellow' },
    all: true,
  })
);

if (EnvVars.NodeEnv !== 'development') {
  transport = new transports.File({ filename: `${ROOT}/logs/app-${date}.log` });
  exceptionHandler = new transports.File({
    filename: `${ROOT}/logs/exceptions.log`,
  });
  rejectionHandler = new transports.File({
    filename: `${ROOT}/logs/rejections.log`,
  });
} else {
  transport = new transports.Console();
  exceptionHandler = new transports.Console();
  rejectionHandler = new transports.Console();
}

const logger = createLogger({
  format: formats,
  transports: [transport],
  exceptionHandlers: [exceptionHandler],
  rejectionHandlers: [rejectionHandler],
});

export default logger;
