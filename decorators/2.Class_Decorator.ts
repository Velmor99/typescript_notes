// Паттерн декоратора
interface IUserService {
    users: number;
    getUsersInDataBase(): number;
}

// @nullUser
@nullUserAdvanced
class UserService111 implements IUserService {
    users: number;
    getUsersInDataBase(): number {
        return this.users
    }
}

// так выглядит декоратор, его ограничение в том что он отрабатывает до
// того как класс инициализируется, а еще мы можем что то менять
// только в прототипе
function nullUser(target: Function) {
    target.prototype.users = 0;
}

// декоратор который возвращает класс в котором мы уже можем что то менять
function nullUserAdvanced<T extends { new(...args: any[]): {} }>(constructor: T) {
    // анонимный класс
    return class extends constructor {
        users = 9;
    }
}

console.log(new UserService11().getUsersInDataBase())
