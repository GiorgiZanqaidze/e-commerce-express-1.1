// src/utils/logger.ts
import { createLogger, format, transports, addColors, Logger as WinstonLogger } from 'winston';

// Define custom levels and colors
const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        verbose: 'cyan',
        debug: 'blue',
        silly: 'grey',
        timestamp: 'grey' // Color for timestamp
    }
};

// Add colors to the logger
addColors(customLevels.colors);

// Create the logger
const logger = createLogger({
    levels: customLevels.levels,
    format: format.combine(
        format.colorize(), // Enable colorization
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss', // Custom timestamp format
        }),
        format.printf(({ timestamp, level, message, method }) => {
            const coloredTimestamp = `\x1b[90m${timestamp}\x1b[0m`; // Grey color for timestamp
            const coloredMethod = method ? `\x1b[34m[${method}]\x1b[0m` : ''; // Blue color for method
            return `${coloredTimestamp} ${coloredMethod} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
    ],
});

export default logger;
