/*
    Стратегия это поведенческий алгоритм в рамках которого мы выделяем
    схожее поведение в нашей системе, схожие алгоритмы и выделяем 
    их в отдельный класс, после чего можем использовать налету взаимозаменяя
    их друг другом. Основная идея - этот паттерн часто используется для 
    авторизации где мы имеем наборы схожих алгоритмов, где мы проверяем что 
    пользователь авторизован, но у нас могут быть разные права и методы,
    например у нас могут быть jwt, github, googleAuth и т д.

                                |-------------> JWTAuth Strategy
    User ---> Auth ---> Abstract Strategy
                                |-------------> GithubAuth Strategy

*/

class User90 {
    githubToken: string;
    jwtToken: string;
}

interface AuthStrategy {
    auth(user: User90): boolean
}

// общий класс авторизации, принимает в себя стратегию
// у которой есть метод auth()
class Auth {
    constructor(private strategy: AuthStrategy) {
        
    }

    setStrategy(strategy: AuthStrategy) {
        this.strategy = strategy
    }

    // если надо авторизовать пользователя то мы берем нашу текущую стратегию
    // и авторизуем
    public authUser(user: User90): boolean {
        return this.strategy.auth(user)
    }
}

// стратегия на случай JWTToken
class JWTStrategy implements AuthStrategy {
    auth(user: User90): boolean {
        if(user.jwtToken) {
            return true
        }
        return false
    }
}

// стратегия на случай githubToken
class GithubStrategy implements AuthStrategy {
    auth(user: User90): boolean {
        if(user.githubToken) {
            return true
        }
        return false
    }
}


const user90 = new User90()
user90.jwtToken = 'token';
// инициализируем общий класс Auth и даем ему стратегию под jwt
const auth1 = new Auth(new JWTStrategy())
console.log(auth1.authUser(user90))
// тут мы можем на лету поменять стратегию и авторизовать уже по гитхабу
auth1.setStrategy(new GithubStrategy())
console.log(auth1.authUser(user90))