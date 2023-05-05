interface IUserService5 {
    getUsersInDataBase(): number;
  }
  
  class UserService12 implements IUserService5 {
    private _users: number;
  
    getUsersInDataBase(): number {
      return this._users
    }

    setUsersInDatabase(@Positive() num: number, @Positive() num2: number): void {
        this._users = num
      }
  }
  
  // в отличии от других декораторов, декоратор параметра принимает 
  // третьим параметром индекс того параметра который мы декорируем
  function Positive() {
      return (
          target: Object, //UserService12
          propertyKey: string | symbol, //setUsersInDatabase
          parameterIndex: number // 0
      ) => {
        console.log(target)
        console.log(propertyKey)
        console.log(parameterIndex)
      }
  }
  
  const userService12 = new UserService12()