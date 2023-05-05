class Character {
    // метод должен быть инициализирован
    name: string;

    // в конструкторе мы инициализируем свойство this.name 
    // и присваиаем ему значение name
    constructor(name: string) {
        this.name = name
    }
}

const terrain = new Character("marine")
terrain.name

class Boss {
    gender: string;
}

const Beezelbub = new Boss()
Beezelbub.gender = "demon"