// переходим в саму библиотеку и находим там файл index.js
// ./node_modules/really-relaxed-json/src/index.js
// находим там функцию toJson которую мы используем и типизируем ее
declare module 'really-relaxed-json' {
    export function toJson(rjsonString: string, compact?: boolean): string
}