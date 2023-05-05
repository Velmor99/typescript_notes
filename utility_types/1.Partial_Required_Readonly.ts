// Все эти типы основаны на технологии мап в тайпскрипте
// [K in typeof P]: K[P]

interface User45 {
    name: string;
    age?: number;
    email: string;
}

// Partial делает все свойства интерфейса необязательными
type partial = Partial<User45>
const pt: partial = {};

// Required наоборот делает все свойства обязательными
type required = Required<User45>

// Readonly делает все свойтва только для чтения
type readonly = Readonly<User45>
type requiredAndReadonly = Required<Readonly<User45>>