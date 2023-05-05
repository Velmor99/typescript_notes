// 1. Пример очевидный, но тут стоит обратить внимание на сам конструктор Array<T>
const d: Array<number> = [1,2,3];

// 2. Тут мы говорим что промис у нас должен вернуть число Promise<number>
async function test3() {
    const a = new Promise<number>((resolve, reject) => {
        resolve(1)
    })
}

// 3. Сдесь мы с помощью Record говорим что у нас будет объект с ключем типа string и значением типа boolean
const check: Record<string, boolean> = {
    drive: true,
    kpp: false
}