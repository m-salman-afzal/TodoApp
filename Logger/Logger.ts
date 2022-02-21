import winston from 'winston';

const myFormat = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} ${label} ${level}: ${message}`;
  }
);

const logger = winston.createLogger({
  level: 'debug',
  // format: winston.format.json(),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.label({ label: 'DEV' }),
    myFormat
  ),

  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'silly' }),
    // new winston.transports.File({
    //   filename: 'combined.log',
    // }),
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'rejections.log' }),
  ],
  exitOnError: false,
});

export { logger };
