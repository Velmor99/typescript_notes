// Это все необходимо что бы покрыть кейсы когда мы ожидаем несколько параметров но передаем другое количество или ничего

class Fruit {
    name: string;
    age: number;

    // пример перезагрузки (overload), последний конструктор должен покрывать все кейсы описанные выше
    constructor();
    constructor(name: string);
    constructor(age: number);
    constructor(name: string, age: number);

    // конструктор имплементации, он должен по своей структуре удовлетворять все то что написано сверху
    constructor(ageOrName?: string | number, age?: number) {
        if(typeof ageOrName === 'string') {
            this.name = ageOrName
        } else if(typeof ageOrName === 'number') {
            this.age = ageOrName
        }
        if(typeof age === "number") {
            this.age = age
        }
    }
}

const banana = new Fruit("marine")
const banana2 = new Fruit();
const banana3 = new Fruit(44)
const banana4 = new Fruit("apple", 44)