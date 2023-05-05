// namespace это фактически обертка позволяющая инкапсулировать в себя какую то логику
namespace A {
    export const a = 5;

    export interface B {
        c: number
    }
}

console.log(A.a)
// на фронте не все сборщики корректно обрабатывают namespace

// для использования референсов, сборки в один файл надо поменять tsconfig:
/*
    "module": "AMD",   
    "outDir": "./build",  // disable
    "outFile": "./app.js",  
    "resolveJsonModule": true, // disable
*/

// в другом файле пишем:
/*
    /// <reference path="./module/modules_and_libraries/1.Namespace_and_references.ts">
    console.log(A.a)
*/