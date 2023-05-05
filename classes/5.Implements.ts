interface ILogger {
    log(...args: any[]): void;
    error(...args: any[]): void;
}

class Logger implements ILogger {
    log(...args: any[]): void {
        console.log(...args)
    }
    async error(...args: any[]): Promise<void> {
        // Кинуть во внешнюю систему
        console.log(...args)
    }

}

/////////////////////////////////////////////////

interface IPayble {
    pay(paymentId: number): void;
    price?: number
}

interface IDeletable {
    delete(): void
}

// Реализация имплементации от интерфейса

class Client implements IPayble, IDeletable {
    delete(): void {
        throw new Error("Method not implemented.");
    }
    pay(paymentId: number | string): void {
        throw new Error("Method not implemented.");
    }
    price?: number | undefined;
    
}