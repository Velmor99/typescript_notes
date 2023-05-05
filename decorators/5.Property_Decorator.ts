interface IUserService {
  users: number;
  getUsersInDataBase(): number;
}

class UserService884 implements IUserService {
  // даже на этапе присвоения свойств у нас отрабатывают декораторы
  @Max(100)
  users: number = 1000;

  getUsersInDataBase(): number {
    throw new Error("Errorrrrrr");
  }
}

// для свойства декоратор пишется аналогичным способом что и для метода
// только теперь нет третьего аргумента в виде descriptor
function Max(max: number) {
    return (
        target: Object,
        propertyKey: string | symbol
    ) => {
        let value: number;
        const setter = function (newValue: number) {
            if(newValue > max) {
                console.log(`Нельзя установить значение больше ${max}`)
            } else {
                value = newValue
            }
        } 

        const getter = function () {
            return value
        }

        // это такой же дескриптор что мы виднли раннее, только теперь 
        // мы его переопределили дав ему свои getter и setter
        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter
        })
    }
}

const userService884 = new UserService884()
userService884.users = 1;
console.log(userService884.users)
userService884.users = 101;
console.log(userService884.users)
