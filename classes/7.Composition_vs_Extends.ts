class Human {
    name: string;

    constructor(name: string) {
        this.name = name
    }
}

// так наследоваться не рекомендуется
class People extends Array<Human> {
    searchByName(name: string) {
        return this.filter(u => u.name === name)
    }

    override toString(): string {
        return this.map(u => u.name).join(', ')
    }
}

new People().slice()

// это композиция, в данном примере оно приоритетнее
class Humans {
    humans: Human[];

    push(u: Human) {
        this.humans.push(u)
    }
}

class Operation {
    date: Date;
}

// тут мы перешли от одной предметной области к другой
class BuisnessOperation extends Operation {
    userId: number;
    name: string;
}

// тут композиция без жесткой привязки, что бы не менять класс родителя
class BuisnessOperation2 {
    user: User;
    payment: Payment;

    constructor(user: User, payment: Payment) {
        this.payment = payment;
        this.user = user
    }
}
// наследование лучше всего в рамках одной доменной области
// например если у нас есть пользователь и от него наследуется пользователь со своими методами
//  