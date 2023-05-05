/*
    Type alis помогает нам вынести тип объекта один раз и использовать
    его повсеместно где нам надо, не типизируя каждое поле по новой вручную
*/

type User = {
    name: string,
    age: number,
    skills: string[]
}

type Role = {
    name: string,
    id: number
}

type UserWithRole = {
    user: User,
    role: Role
}

let user1: User = {
    name: 'lkdjsf',
    age: 332,
    skills: ['1', '2']
}

