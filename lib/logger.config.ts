import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, json } = winston.format;

const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  return msg;
});

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  format: combine(timestamp(), json()),
});

const consoleTransport = new winston.transports.Console({
  format: combine(
    colorize(),
    timestamp(),
    logFormat
  ),
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), logFormat),
  transports: [
    dailyRotateFileTransport,
    ...(process.env.NEXT_PUBLIC_APP_ENV !== 'production' ? [consoleTransport] : []),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
  ],
});

export const logApiRequest = (method: string, url: string, data?: any) => {
  logger.debug(`API ${method} ${url}`, { data });
};

export const logApiResponse = (method: string, url: string, status: number, duration: number) => {
  logger.info(`API ${method} ${url} responded with ${status} in ${duration}ms`);
};

export const logApiError = (method: string, url: string, error: any) => {
  logger.error(`API ${method} ${url} failed`, { error: error.message, stack: error.stack });
};

export const logPerformance = (operation: string, duration: number) => {
  logger.info(`Performance: ${operation} took ${duration}ms`);
};

export const logUserAction = (action: string, userId?: string, metadata?: any) => {
  logger.info(`User Action: ${action}`, { userId, ...metadata });
};