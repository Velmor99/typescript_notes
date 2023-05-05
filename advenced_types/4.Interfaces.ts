
interface IUser {
    name: string,
    age: number,
    skills: string[],

    // так типизируется функция
    log: (id: number) => string
}

interface IRole {
    roleId: number,
}

// interfaces в отличии от types могут наследоваться
// в данном случае IUserWithRole возьмет все поля из IUser
// и из IRole
interface IUserWithRole extends IUser, IRole {
    createdAt: Date
}

const user2: IUserWithRole = {
    name: "sldjf",
    age: 4,
    skills: ['sdf'],
    createdAt: new Date(),
    log(id) {
        return ''
    },

    roleId: 0
}

// индексные свойства
interface UserDict {
    // так мы говорим что в нажем объекте ключи будут числами,
    // а свойства строками, и таких полей может быть неограниченное количество
    [index: number]: string
}

interface UserDict2 {
    // тут точно так же как в UserDict, только ключи теперь строки
    // такая запись используется уже не часто потому как у нас есть тип Record
    [index: string]: string
}

// точно такой же тип как [index: number]: string
type ud = Record<number, string>

const dictionary: ud = {
    1: 'Dasha',
    2: 'Sasha',
    3: 'Klein'
}

const phoneDict: UserDict2 = {
    'S': 'Sasha',
    'D': 'Dasha',
    3: 'Leni'
}