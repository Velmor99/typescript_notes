//импортируем библиотеку reflect-metadata
import 'reflect-metadata'

// ключ должен быть уникальным поэтому используем Symbol
const POSITIVE_METADATA_KEY = Symbol('POSITIVE_METADATA_KEY')

interface IUserService5 {
    getUsersInDataBase(): number;
  }
  
  class UserService122 implements IUserService5 {
    private _users: number;
  
    getUsersInDataBase(): number {
      return this._users
    }

    @Validate()
    setUsersInDatabase(@Positive5() num: number): void {
        this._users = num
      }
  }
  
  function Positive5() {
      return (
          target: Object, //UserService122
          propertyKey: string | symbol, //setUsersInDatabase
          parameterIndex: number // 0
      ) => {
        // getOwnMetadata принимает три параметра
        // первый это ключ метаданных их можно найти на https://rbuckton.github.io/reflect-metadata/
        // второй это target объект на который мы записываем
        // третий это propertyKey
        // метаданные реализуют перенос типов из typescript в рантайм где мы можем делать например dependency injection
        console.log(Reflect.getOwnMetadata('design:type', target, propertyKey)) //[Function: Function]
        console.log(Reflect.getOwnMetadata('design:paramtypes', target, propertyKey)) //[ [Function: Number], [Function: Number] ]
        console.log(Reflect.getOwnMetadata('design:returntype', target, propertyKey)) //undefined
        // тут мы добавляем свое свойство на этот target (UserService122), по этому ключу (setUsersInDatabase)
        // свойство с уникальным ключем который с существующими параметрами
        let existParams: number[] = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey) || [];
        existParams.push(parameterIndex)
        Reflect.defineMetadata(POSITIVE_METADATA_KEY, existParams, target, propertyKey)
      }
  }

  function Validate() {
    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ) => {
        let method = descriptor.value;
        // переопределяем метод
        descriptor.value = function (...args: any) {
            // получаем параметры которые были переданы в функцию setUsersInDatabase
            let positiveParams: number[] = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey);
            // проверяем что они есть
            if(positiveParams) {
                // проходимся циклом по массиву параметров
                for(let index of positiveParams) {
                    // проверяем что числа больше нуля то есть позитивные
                    if(args[index] < 0) {
                        throw new Error('число должно быть больше ноля')
                    }
                }
            }
            // не забываем вернуть функцию прокинув в нее контекст
            return method?.apply(this, args);
        }
    }

  }
  
  const userService122 = new UserService122()
  console.log(userService122.setUsersInDatabase(9))
  console.log(userService122.setUsersInDatabase(-1))

/*
  мораль такова что с помощью двух декораторов мы смогли создать удобный инструмент который валидирует 
  наши данные в рамках рантайма, и это позволяют делать метаданные, которые
  связывают наш typescript компайлтайм с javascript рантаймом
*/