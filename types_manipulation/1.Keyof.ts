interface IUser2 {
    name: string;
    age: number;
}

// оператор keyof показывает все ключи в объекте
type KeysOfUser = keyof IUser2;

const key: KeysOfUser = 'age'

// первый дженерик это сам объект а второй это дженерик который наследует ключи первого дженерика
function getValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

const userrr: IUser2 = {
    name: "Bacya",
    age: 30
}

const userName = getValue(userrr, 'age')