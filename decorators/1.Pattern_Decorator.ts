// Паттерн декоратора
interface IUserService {
    users: number;
    getUsersInDataBase(): number;
}

class UserService11 implements IUserService {
    users: number = 1000;
    getUsersInDataBase(): number {
        return this.users
    }
}

// Эта функция и есть некий декоратор, то есть это функция обертка
function nullUser1(obj: IUserService) {
    obj.users = 0;
    return obj;
}

function logUsers(obj: IUserService) {
    console.log('Users' + obj.users)
    return obj;
}

console.log(new UserService11().getUsersInDataBase())
console.log(nullUser1(new UserService11()).getUsersInDataBase())

// порядок выполнения такой 1.nullUsers 2.logUsers 
console.log(logUsers(nullUser1(new UserService11())).getUsersInDataBase())
