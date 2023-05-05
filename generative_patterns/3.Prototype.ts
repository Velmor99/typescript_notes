/*
    Прототипы в js во многом реализуют логику паттерна прототипов
    Цель: у нас есть класс истории пользователя где мы можем посмотреть его данные
    и потом нам надо создать такой же класс но с измененным свойством

    UserHistory ---> clone() ---> UserHistory
*/

// нам нужна функция clone которая в виде дженерика принимает класс и возвращает его же
interface Prototype<T> {
    clone(): T
}

// мы добавляем дополнительное свойство в виде возможности клонирования
class UserHistory implements Prototype<UserHistory> {
    createdAt: Date;

    constructor(public email: string, public name: string) {
        this.createdAt = new Date()
    }

    // тут мы создаем новый инстанс UserHistory и заполняем его данными из текущего класса
    // мы должны заполнить все методы которые имеет данный класс как в случае с createdAt
    clone(): UserHistory {
        let target = new UserHistory(this.email, this.name)
        target.createdAt = this.createdAt
        return target;
    }
}

let user34 = new UserHistory('a@a.com', "aa")
console.log(user34)
// В случае клона мы получаем совершенно новый объект с теми же данными с которым
// мы можем делать все что угодно, не затрагивая изначальный обект
let user35 = user34.clone()
console.log(user35)