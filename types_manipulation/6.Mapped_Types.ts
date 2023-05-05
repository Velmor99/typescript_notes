type Modifier = 'read' | 'update' | 'create'

type UserRoles = {
    customers: Modifier,
    projects?: Modifier,
    adminPanel?: Modifier
}

// это самая простая мапа из одного типа в другой
type ModifierToAccess<Type> = {
    // это означает что мы берем каждый ключ из дженерика и ему должен
    // соответствовать boolean
    // -? и +? делает свойства обязательными и необязательными
    // `canAccess${string & Property}` добавляет приставку к свойству
    // Exclude исключает свойство из нашего объекта по ключу
    +readonly[Property in keyof Type as Exclude<`canAccess${string & Property}`, 'canAccessadmininPanel'>]-?: boolean
}

type UserAccess2 = ModifierToAccess<UserRoles>

// это глупо потому что придестя вручную править в нескольких местах
type UserAccess1 = {
    customers: boolean,
    projects?: boolean,
    adminPanel?: boolean
}