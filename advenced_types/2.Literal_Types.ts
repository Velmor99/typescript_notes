/*
    Литеральные типы позволяют делать узкие строковые типы
*/

// например тут method имеет тип post или get, это конкретные строки, а не обобщенный тип string
function fetchWithAuth(url: string, method: 'post' | 'get'): 1 | -1 {
    // так же это работает и с числами
    return 1
}

fetchWithAuth('s', 'get')

// тут тип будет имеено строка потому что объявляем через let
let method = 'post'

// мы получим ошибку если не скажем конкретно method as 'post'
// as - это каст типов, в данном случае мы кастуем method к типу 'post'
// с as нужно быть осторожнее потому что если тип не будет соответствовать 'post'
// то типизация не сломается
fetchWithAuth('s', method as 'post')