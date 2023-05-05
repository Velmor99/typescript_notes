/*
    Написать декоратор который будет отлавливать
    и логировать ошибки в методах, назовем его Catch
*/

interface IUserService {
  users: number;
  getUsersInDataBase(): number;
}

class UserService888 implements IUserService {
  users: number = 1000;

  // rethrow сделано объектом для понятности
  @Catch({rethrow: true})
  getUsersInDataBase(): number {
    throw new Error("Errorrrrrr");
  }
}

// <(...args: any[]) => any> это описание дефолтной функции
// мы с помощью декоратора смогли переопределить метод
// достучавшись до него через value как к стандартному свойству объекта
function Catch({rethrow}: {rethrow: boolean} = {rethrow: true}) {
  return (
    target: Object,
    _: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
    const method = descriptor.value;
    descriptor.value = (...args: any[]) => {
        try {
            // method?.apply(target, args) проверяем что это не undefined и вызываем прокидывая контекст
          const res = method?.apply(target, args)
          return res
        } catch (error) {
          if (error instanceof Error)
            console.log("this is my custom error" + error.message);
            if(rethrow) {
                throw error;
            }
        }
    };
  };
}

console.log(new UserService888().getUsersInDataBase());
