/*
    Опциональность в typescript реализуется символом "?" 
    он обозначает что свойство не обязательно
*/

function multiple(first: number, second?: number): number {
    if(!second) {
        return first * first
    } else {
        return first * second
    }
}

//////=================================//////

interface UserPro {
    login: string,
    password?: {
        type: 'primary' | 'secondary'
    }
}

function testPass(user: UserPro) {
    const t = user.password?.type
}

function test(param?: string) {
    // ?? означают проверку на null и undefined
    const t = param ?? multiple(5)
}