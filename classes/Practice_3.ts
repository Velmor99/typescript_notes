/*
    Необходимо реализовать абстрактный класс logger с 2-мя методами
    абстрактным log(message): void
    printDate - выводит в log дату
    К нему необходимо сделать реальный класс, который бы имел метод: logWithDate,
    выводящий сначала дату, а потом заданное сообщение
*/

abstract class Logger2 {
    abstract log(message: string): void

    printDate(date: Date) {
        this.log(date.toString())
    }
}

class MyLogger extends Logger2 {
    log(message: string): void {
        console.log(message)
    }

    logWithDate(message: string): void {
        this.printDate(new Date())     
        this.log(message)
    }
}

const myLogger = new MyLogger()

myLogger.logWithDate("message")