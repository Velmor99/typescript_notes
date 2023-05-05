let strOrNum: string | number = 5;

if(Math.random() > 0.5) {
    strOrNum = 5;
} else {
    strOrNum = 'str'
}

if(typeof strOrNum === 'string') {
    console.log(strOrNum)
} else {
    console.log(strOrNum)
}

// такая запись валидна, вместо того что бы вручную 
// задать тип мы просто присваиваем тип переменной
let str2OrNum: typeof strOrNum;

const objUser = {
    name: 'Bacya'
};

// в этой записи мы берем ключи из ТИПА objUser
// который, так как он не задан, равняется 
// {name: string}
type keyOfUser = keyof typeof objUser;


// так же можно получить ключи енама
enum Direction {
    Up,
    Down
}

type d = keyof typeof Direction