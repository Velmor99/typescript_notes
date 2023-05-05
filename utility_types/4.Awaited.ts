// Awaited позволяет нам вытянуть тип из промиса
type A = Awaited<Promise<string>>
type A2 = Awaited<Promise<Promise<string>>>

interface IMenu {
    name: string;
    url: string;
}

async function getMenu(): Promise<IMenu[]> {
    return [{name: 'analitics', url: "https://analitics"}]
}

// смогли получить тип IMenu[]
type R = Awaited<ReturnType<typeof getMenu>>

// в случае если х асинхронная функция то Awaited ее раскрутит
async function getArrayOf<T>(x: T): Promise<Awaited<T>[]> {
    return [await x]
}

// старая реализация
async function getArrayOf2<T>(x: T): Promise<T[]> {
    return [await x]
}