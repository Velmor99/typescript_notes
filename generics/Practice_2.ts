/*
    Необходимо написать функцию сортировки любых
    объектов, которые имеют id по убыванию и по возрастанию
*/

const data64 = [
  { id: 1, name: "Vasya" },
  { id: 2, name: "Petya" },
  { id: 3, name: "Nadya" },
];

interface IDer {
  id: number;
}

function sortById<T extends IDer>(data: T[], type: "asc" | "desc" = 'asc'): T[] {
  return data.sort((a, b) => {
    switch (type) {
      case "asc":
        return a.id - b.id;
      case "desc":
        return b.id - a.id;
    }
  });
}

console.log(sortById(data64, 'desc'))
console.log(sortById(data64))
