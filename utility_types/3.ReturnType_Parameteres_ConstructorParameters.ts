class User21 {
    constructor(public id: number, public name: string) { }


}

function getData1(id: number): User21 {
    return new User21(id, 'Bacya');
}

// ReturnType по сути возвращает тип который возвращает переданная функция
type RT = ReturnType<typeof getData1>
type RT2 = ReturnType<() => void>
type RT3 = ReturnType<<T>() => T>
type RT4 = ReturnType<<T extends string>() => T>

// Parameters возвращает кортеж из типов которые передаются в функцию
type PT = Parameters<typeof getData1> //[0]

// ConstructorParameters возвращает кортеж из типов которые передаются в конструктор класса
type CP = ConstructorParameters<typeof User21>

// InstanceType позволяет вернуть тип инстанса класса
type IT = InstanceType<typeof User21>