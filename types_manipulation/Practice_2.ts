/*
    Необходимо сделать тип для результата валидации
    формы, основываясь на типе формы
 */

interface IForm {
    name: string;
    password: string;
}

// написал мап для formValidation
type FormValidation<Type> = {
    [Property in keyof Type]-?: {isValid: true} | {isValid: false, errorMessage: string}
}

const form: IForm = {
    name: "Vasya",
    password: '123',
}

const formValidation: FormValidation<IForm> = {
    name: {isValid: true},
    password: {isValid: false, errorMessage: 'должен быть длиннее 5 символов'}
}