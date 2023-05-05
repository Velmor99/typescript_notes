/*
    Декоратор, который добавляет свойство 
    createdAt в класс, фиксируя дату создания
*/

interface IUserService8 {
    users: number;
    getUsersInDatabase(): number;
}

@AddDateToClass
class UserService8 implements IUserService8 {
    users: number;
    getUsersInDatabase(): number {
        return this.users
    }
}

// <T extends { new(...args: any[]): {}}> эта запись значит что мы ждем какой то объект
function AddDateToClass<T extends { new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {
        createdAt: Date = new Date()
    }
}

// Этот тип нужен что бы добавить его к типизации класса что бы он знал о новом свойстве createdAt
type CreatedAt = {
    createdAt: Date;
}

console.log((new UserService8() as IUserService8 & CreatedAt))