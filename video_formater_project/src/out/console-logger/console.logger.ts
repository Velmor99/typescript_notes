// Паттерн Singleton

import { IStreamLogger } from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {
    private static instance: ConsoleLogger;

    public static getInstance() {
        if(!ConsoleLogger.instance) {
            this.instance = new ConsoleLogger()
        }
        return ConsoleLogger.instance
    }

    private constructor() { }

    public log(...args: any[]): void {
        console.log(args)
    }
    public error(...args: any[]): void {
        console.log(args)
    }
    public end(): void {
        console.log('Done!')
    }
    
}