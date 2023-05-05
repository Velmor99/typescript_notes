interface Address {
    name: string
}

interface Permission {
    endDate: Date 
}

interface Street {
    name: string,
    roles: Address[]
    permission: Permission
}

const street: Street = {
    name: 'Wall',
    roles: [],
    permission: {
        endDate: new Date()
    }
}

const nameStreet = street['name']

// теперь разберем как это работае с точки зрения типов

type addressType = Street['roles']

// однако мы не можем сделать так потому что в случае выше мы работаем
// с типами, в ниже с объектами

const roleNames = 'roles';
type addressType2 = Street[roleNames] // невалидно
type addressType3 = Street[typeof roleNames] // валидно

// это как обращение по индексу в массиве типа array['name'][0]
type roleType = Street['roles'][number];
// мы можем проходиться по любому уровню
type dateType = Street['permission']['endDate'];

// as const делает нашу переменную readonly и присваивает ей тип такой же 
// как ее значение
const roles2 = ['admin', 'user', 'super-user'] as const;

// number в данном случае говорит что тип roleTypes
// будет не весь массив, а что то одно из трех его значений
type roleTypes = typeof roles2[number]

