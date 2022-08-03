import winston from 'winston';
import path from 'path';

const { transports, format } = winston;

const { NODE_ENV } = process.env;

const loggerTransports = [];

if (NODE_ENV === 'production')
  loggerTransports.push(
    new transports.File({
      filename: path.join(__dirname, 'storage/logs', 'production.log')
    })
  );

if (NODE_ENV === 'development')
  loggerTransports.push(
    new transports.File({
      filename: path.join(__dirname, 'storage/logs', 'development.log')
    })
  );

if (NODE_ENV === 'test')
  loggerTransports.push(
    new transports.File({
      filename: path.join(__dirname, 'storage/logs', 'test.log')
    })
  );

winston.configure({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),

  defaultMeta: { service: 'API_SERVICE' },
  transports: loggerTransports
});

// Log errors to console with the colorized simple format.
if (['development'].includes(NODE_ENV)) {
  winston.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
}
