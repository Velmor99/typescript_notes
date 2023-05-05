function logMiddleware<T>(data: T): T {
    console.log(data);
    return data;
}

// function logMiddleware(data: number | string | boolean | T): number | string | boolean | T {
//     console.log(data);
//     return data;
// }

// Этот кейс решает проблему когда мы не знаем изначально какой тип данных будет передан 
// в функцию в качевстве аргумента, но с дженериком мы можем динамически,
// во время ВЫЗОВА функции передать какой тип данных в данный момент мы используем
let res1 = logMiddleware<string>("num")

interface IObject {
    id: number,
    name: string
}

let res4 = logMiddleware<IObject>({id: 1, name: 'krane'})

function getSplitedHalf<T>(data: Array<T>): Array<T> {
    const l = data.length / 2
    return data.splice(0, l)
}

// Дженерики необходимы для создания универсальных функций с точки зрения типов