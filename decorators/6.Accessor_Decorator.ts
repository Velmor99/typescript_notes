interface IUserService5 {
    getUsersInDataBase(): number;
  }
  
  class UserService990 implements IUserService5 {
    private _users: number;

    // Акцессоры позволяют декорировать get и set
    // ВАЖНО: декоратор может стоять только на set или только на get
    // на два сразу повесить нельзя, но отрабатывают они одинаково и на том и на том
    set users(num: number) {
        this._users = num
    }

    @LogSetter()
    get users() {
        return this._users
    }
  
    getUsersInDataBase(): number {
      throw new Error("Errorrrrrr");
    }
  }
  
  function LogSetter() {
      return (
          target: Object,
          _: string | symbol,
          descriptor: PropertyDescriptor
      ) => {
        const set = descriptor.set
        descriptor.set = (...args: any) => {
            console.log(args);
            set?.apply(target, args);
        }
      }
  }
  
  const userService990 = new UserService990()
  userService990.users = 1
  console.log(userService990.users)