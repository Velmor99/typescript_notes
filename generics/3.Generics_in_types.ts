// Типизация функции
const split: <T>(data: Array<T>) => Array<T> = getSplitedHalf;

// Типизация объекта с помощью интерфейса
interface ILogLine<T> {
    timeStamp: Date,
    data: T
}

// типизация объекта с помощью type
type LogLineType<T> = {
    timeStamp: Date,
    data: T
}

// использование дженерика 
const logLine: ILogLine<{a: number}> = {
    timeStamp: new Date(),
    data: {
        a: 1
    }
}