/*
    Необходимо написать функцию toString, которая принимает любой тип 
    и возвращает его строковое представление. Если не может, то
    возвращает undefined
*/

function toString<T>(argument: T): string | undefined {
    if(Array.isArray(argument)) {
        return argument.toString()
    } 
    switch (typeof argument) {
        case 'string':
            return argument;
        case 'number':
        case 'boolean':
        case 'bigint':
        case 'function':
            return argument.toString();
        case 'object':
            return JSON.stringify(argument)
        default:
            return undefined;
    }
}

