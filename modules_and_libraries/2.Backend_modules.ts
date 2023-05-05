// commonjs модульность обуславливается export 
// в package.json напишем поле "type": "module"
export namespace A {
    export const a = 5;

    export interface B {
        c: number
    }
}

export const L = 7;

console.log(A.a)

// В другом файле при импорте пишем расширение .js
// import { A, L } from "./module/...js"