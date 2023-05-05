// напишем декоратор который подойдет для всего
function Uni(name: string): any {
    console.log(`Инициализация ${name}`)
    return function () {
        console.log(`Вызов ${name}`)
    }
}

@Uni('Класс')
class MyClass {
    @Uni('Свойство')
    props?: any;

    @Uni('Свойство static')
    static prop: any;

    @Uni('Метод static')
    static method2(@Uni("Параметр метода static") _: any) { }

    @Uni('Метод')
    method(@Uni("Параметр метода") _: any) { }

    constructor(@Uni('Параметр конструктора')_: any) { }
}

// Порядок вызовов
// как мы можем видеть сначала идут не статические декораторы,
// от перестановки методов ничего не изменится
// предпоследний инициализируется класс, потом инициализируется и вызывается 
// конструктор и потом вызывается класс в самом конце
// порядок влияет только на уровни инициализации, если например два метода
// то они вызовуться сверху вниз
/*
    Инициализация Свойство
    Вызов Свойство

    Инициализация Метод
    Инициализация Параметр метода
    Вызов Параметр метода
    Вызов Метод

    Инициализация Свойство static
    Вызов Свойство static

    Инициализация Метод static
    Инициализация Параметр метода static
    Вызов Параметр метода static
    Вызов Метод static

    Инициализация Класс

    Инициализация Параметр конструктора
    Вызов Параметр конструктора

    Вызов Класс
*/