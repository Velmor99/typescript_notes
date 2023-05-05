/*
    Union - это возможность сказать что в той или инной переменной у нас находятся
    разные типы при разных обстоятельсвах
*/

// arr в данном случае юнион между string и number и это массив (string | number)[]
const arr = ['sdf', 1]

// в данном случае функция принимает union между string number и boolean
function logId(id: string | number | boolean) {
    // при проверке на тип, мы можем получить методы работы с данным типом
    if(typeof id === 'string') {
        console.log(id.toLowerCase())
    } else {
        console.log(id)
    }
}

logId(3)
logId('slkdf')
logId(true) 

function logObj(obj: {a: number} | {b: number}) {
    if('a' in obj) {
        obj.a
    } else {
        obj.b
    }
}

function logMultipleIds(a: string | number, b: string | boolean) {
    if(a === b) {
        a.toLowerCase()
    } else {
        
    }
}