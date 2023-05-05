// ts - типизация у пакета есть
// dt - типизация есть, но ее надо ставить отдельным @types пакетом
// none - типизация не поддерживается

// работа с библиотекой без типизации
// 1. @ts-ignore - это если не принципиально нужны типы или нет
// 2. Типизируем нашу функцию из либы в файле Types.d.ts
// Второй вариант предпочтительнее
import {toJson} from 'really-relaxed-json'
const rjson = '[ one two three {foo:bar} ]'
const json = toJson(rjson)
console.log(json)