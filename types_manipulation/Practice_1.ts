/*
    Необходимо написать функцию группировки, 
    которая принимает массив объектов и его ключ, 
    производит группировку по указанному ключу 
    и возвращает сгруппированный объект
    Пример:
    [
        {group: 1, name: 'a'},
        {group: 1, name: 'b'},
        {group: 2, name: 'c'},
    ];

    При группировке по 'group' --->

    [
        '1': [ {group: 1, name: 'a'}, {group: 1, name: 'b'} ],
        '2': [ {group: 2, name: 'c'}]
    ]
*/

interface DataStudents {
    group: number;
    name: string;
}

const dataStudents: DataStudents[] = [
    {group: 1, name: 'a'},
    {group: 1, name: 'b'},
    {group: 2, name: 'c'},
];

interface IGroup<T> {
    [key: string]: T[]
}

type key = string | number | symbol

function group<T extends Record<key, any>>(array: T[], key: keyof T): IGroup<T> {
    return array.reduce<IGroup<T>>((map: IGroup<T>, item) => {
        const itemKey = item[key];
        let curEl = map[itemKey];
        if(Array.isArray(curEl)) {
            curEl.push(item)
        } else {
            curEl = [item]
        }
        map[itemKey] = curEl;
        return map;
    }, {})
}

const resultOfStudents = group<DataStudents>(dataStudents, 'group')