/*
    Type guard позволяет проверять на union типы 
*/

interface Elf {
    health: number,
    role: string,
    damage: number,
}

interface Orc {
    health: number,
    type: string,
    damage: number
}

function logId3(id: string | number) {

    // if(typeof id === 'string') {
    //     console.log(id)
    // } else {
    //     console.log(id)
    // }

    if(isString(id)) {
        console.log(id) // тип string
    } else {
        console.log(id) // тип number
    }
}

// функция тайпгард, возвращает что x является строкой - x is string
// проверка union типа, функция должна возвращать именно такой тип, не boolean
function isString(x: string | number): x is string {
    return typeof x === 'string'
}

// проверка более сложных типов, логика все та же, проверяем на наличие поля
function isElf(elf: Elf | Orc): elf is Elf {
    return 'role' in elf
}

// тут все так же проверяем ключ, только уже на undefined
// тут мы кастуем тип elf к Elf и пытаемся вытянуть ключ role
function isElfAlternative(elf: Elf | Orc): elf is Elf {
    return (elf as Elf).role !== undefined;
}

function setRoleToElf(elf: Elf | Orc) {
    if(isElfAlternative(elf)) {
        elf.role = 'archer'
    } else {
        throw new Error('')
    }
}