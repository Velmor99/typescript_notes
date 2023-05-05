class UserBuilder {
    name: string;

    // тут лучше всего поставить возвращаемый тип this 
    // так как при наследовании this будет ссылаться именно на тот класс 
    // который мы вызываем     
    setName(name: string): this {
        this.name = name
        return this;
    }

    // это typeguard для проверки инстанса класса
    isAdmin(): this is AdminBuilder {
        return this instanceof AdminBuilder;
    }
}

class AdminBuilder extends UserBuilder {
    // это поле здесь не случайно, оно нужно что бы UserBuilder и AdminBuilder отличались
    // иначе проверка typeguard не сработает
    roles: string[];
}

const res = new UserBuilder().setName('Vasya')
const res2 = new AdminBuilder().setName("Lewa")

let uuser: UserBuilder | AdminBuilder = new UserBuilder()

if(uuser.isAdmin()) {
    console.log(uuser)
} else {
    console.log(uuser)
}