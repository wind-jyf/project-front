export enum Gender {
    female = 'femal',
    male = 'man'
}

export const genderMap = {
    [Gender.female]: '女',
    [Gender.male]: '男'
}

export const genderOptions = [{
    value: Gender.female,
    label: genderMap[Gender.female]
}, {
    value: Gender.male,
    label: genderMap[Gender.male]
}]