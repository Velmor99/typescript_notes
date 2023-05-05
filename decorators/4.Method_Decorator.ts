interface IUserService {
  users: number;
  getUsersInDataBase(): number;
}

class UserService88 implements IUserService {
  users: number = 1000;

  @Log
  getUsersInDataBase(): number {
    throw new Error("Errorrrrrr");
  }
}

// <(...args: any[]) => any> это описание дефолтной функции
// мы с помощью декоратора смогли переопределить метод
// достучавшись до него через value как к стандартному свойству объекта
function Log(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
): TypedPropertyDescriptor<(...args: any[]) => any> | void {
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);

  descriptor.value = () => {
    console.log("no error");
  };
}

// factory подход

// function Log() {
//     return (
//       target: Object,
//       propertyKey: string | symbol,
//       descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
//     ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
//       console.log(target);
//       console.log(propertyKey);
//       console.log(descriptor);

//       descriptor.value = () => {
//         console.log("no error");
//       };
//     };
//   }

console.log(new UserService88().getUsersInDataBase());
