// Паттерн декоратора
interface IUserService {
    users: number;
    getUsersInDataBase(): number;
}


// можем регулировать число пользователей
@setUsers(5)
@logg()
/*
    setUsers init
    logg init
    logg run
    setUsers run
*/
// @setUserDecoratorAdvancedusers(4)
// @nullUser2
// @nullUserAdvanced2
class UserService1111 implements IUserService {
    users: number = 1000
    getUsersInDataBase(): number {
        return this.users
    }
}

// так выглядит декоратор, его ограничение в том что он отрабатывает до
// того как класс инициализируется, а еще мы можем что то менять
// только в прототипе
function nullUser2(target: Function) {
    target.prototype.users = 0;
}

//Напишем функцию которая будет создавать нам декораторы с разными параметрами
function setUsers(users: number)  {
    console.log('setUsers init')
    return (target: Function) => {
        console.log('setUsers run')
        target.prototype.users = users
    }
}

function logg()  {
    console.log('logg init')
    return (target: Function) => {
        console.log('logg run')
    }
}

// декоратор который возвращает класс в котором мы уже можем что то менять
function nullUserAdvanced2<T extends { new(...args: any[]): {} }>(constructor: T) {
    // анонимный класс
    return class extends constructor {
        users = 9;
    }
}

// функция возвращающая декоратор nullUserAdvanced2 только с регулировкой users
function setUserDecoratorAdvancedusers(users: number) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        // анонимный класс
        return class extends constructor {
            users = users;
        }
    }
}

// console.log(new UserService11().getUsersInDataBase())
