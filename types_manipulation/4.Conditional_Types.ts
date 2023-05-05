const g: number = Math.random() > 0.5 ? 1 : 0

// Conditional в интерфейсе, проверка на extends
interface HTTPResponse2<T extends 'success' | 'failed'> {
    code: number;
    data: T extends 'success' ? string : Error
}

const success: HTTPResponse2<'success'> = {
    code: 200,
    data: 'done'
}

const error: HTTPResponse2<'failed'> = {
    code: 500,
    data: new Error()
}

// case
class User44 {
    id: number;
    name: string;
}

class UserPersisted44 extends User44 {
    dbId: string;
}

function getUser44(id: number): User44;
function getUser44(dbId: string): UserPersisted44;
function getUser44(dbIdOfId: string | number): User44 | UserPersisted44 {
    if(typeof dbIdOfId === 'number') {
        return new User44()
    } else {
        return new UserPersisted44()
    }
}

// упростим перегрузку
type UserOrUserPersisted<T extends string | number> = T extends number ? User44 : UserPersisted44;

function getUser34<T extends string | number>(id: T): UserOrUserPersisted<T> {
    if(typeof id === 'number') {
        return new User44() as UserOrUserPersisted<T> // так можно побороть ошибку
    } else {
        return new UserPersisted44()
    }
}

const res11 = getUser34(1)
const res22 = getUser34('lsjdf')