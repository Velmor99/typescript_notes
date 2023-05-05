/*
Написать реализацию перегрузки
*/

class Manager {
    skills: string[];

    constructor() {};

    // addSkill(/*string или string[]*/)
    // Эта реализация "перегрузка" просто удобное дополнение 
    /// которое позволяет правильно добавлять выбор того что мы хотим
    addSkills(arg: string): void;
    addSkills(arg: string[]): void;
    addSkills(arg: string[] | string): void {
        if(Array.isArray(arg)) {
            this.skills = [...arg, ...this.skills]
        } else {
            this.skills.push(arg)
        }
    }
}

function run(distance: number): number;
function run(distance: string): string;
function run(distance: number | string): number | string {
    if(typeof distance === 'string') {
        return "hello"
    } else {
        return 1
    }
}

run(0)