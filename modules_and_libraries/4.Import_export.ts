export const m = 5;

export interface M {
    m: number;
}

export class M {
    constructor() {}
}

export type MyType = string | number;

export default function run() {
    console.log('run')
}

// interface и type нельзя экспортировать через default
// export default type MyType = string | number ---> невалидно

// import run from "./...."  Это только дефолтный экспорт
// import { A } from "./...."
// import * as all from "./...."  Это значит что мы берем все + дефолтный экспорт
// import run, { A } from "./...."
// import { Test as M } from "./..." Это мы берем что то и переименовывем его
// import { MyType as T } from "./..." Импорт типа
// import run, { A, MyType } from "./...."
// import { type MyType } from "./...." Это импорт типа в typescript
