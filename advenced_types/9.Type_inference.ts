interface User3 {
    name: string,
    email: string,
    login: string,
}

interface Admin46 {
    role: string,
    name: string,
}

const user44: User3 = {
    name: "Leslee",
    email: "leslee@gmail.com",
    login: 'leslee'
}

// так делать не стоит, так как мы сохранили свойства email и login,
// хотя в интерфейсе этих полей нет
const admin: Admin46 = {
    ...user44,
    role: "admin",
}

// вот как надо переводить один объект в другой
function userToAdmin(user: User3): Admin46 {
    // тут явное преобразование, которое сохраняет только необходимые свойства
    return {
        name: user44.name,
        role: 'admin'
    }
}

