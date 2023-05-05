function runTransaction(transaction: {
    fromTo: [string, string]
}) {
    console.log()
}

const transaction: GetFirstArg<typeof runTransaction> = {
    fromTo: ['1', '2']
}

runTransaction(transaction);

// мы сделали некоторый тип дженерика, мы с помощью infer 
// вытащили тип первого аргументы который мы передадим в функцию
// в кратце: мы берем любую функцию, вытаскиваем из нее первый аргумент с помощью infer и его передаем
type GetFirstArg<T> = T extends (first: infer First, ...args: any[]) => any ? First : never