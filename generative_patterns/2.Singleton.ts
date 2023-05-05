// В большинстве фреймворков singleton и вообще паттерны реализованы с помощью
// dependency injection то есть под капотом

/*
    Цель: создать два класса, два сервиса, которые в результате
    хотят обращаться к третьему сервису и там хранить какие то рантайм
    ключи мап и значений, у этого хранилища может быть какая то
    бизнес логика
*/

// singleton class
// Тут наш класс сам себя хранит и реализует свою логику, его нельзя создать в другом месте
class MyMap {
    // нам нужно где то хранить текущий инстанс этого класса что бы всегда отдавать его
    private static instance: MyMap;

    map: Map<number, string> = new Map();

    // конструктор в typescript может быть приватным что бы его нельзя было вызвать вне класса
    private constructor() { }

    clean() {
        this.map = new Map();
    }

    public static get(): MyMap {
        if(!MyMap.instance) {
            MyMap.instance = new MyMap();
        }
        return MyMap.instance
    }
}

class Service1 {
    // эта функция добавить новое ключ\значение к нашей мапе, но новый инстанс мапы создать не получится
    addMap(key: number, value: string) {
        const myMap = MyMap.get()
        myMap.map.set(key, value)
    }
}

class Service2 {
    getCase(key: number) {
        const myMap = MyMap.get()
        myMap.map.get(key);
    }
}