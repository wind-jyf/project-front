export enum MedicineCategory {
    Western = 1, // 西药
    ChinesePatent = 2, // 中成药
    ChineseHerb = 3, // 中草药
}

export const medicineCategoryMap = {
    [MedicineCategory.Western]: '西药',
    [MedicineCategory.ChinesePatent]: '中成药',
    [MedicineCategory.ChineseHerb]: '中草药'
}

export const medicineCategoryOptions = [{
    value: MedicineCategory.Western,
    label: medicineCategoryMap[MedicineCategory.Western]
}, {
    value: MedicineCategory.ChinesePatent,
    label: medicineCategoryMap[MedicineCategory.ChinesePatent]
}, {
    value: MedicineCategory.ChineseHerb,
    label: medicineCategoryMap[MedicineCategory.ChineseHerb]
}]

export enum MedicineForm {
    Capsules = 1, // 胶囊
    Dissolved = 2, // 冲剂
    OralLiquid = 3, // 口服液
}

export const medicineFormMap = {
    [MedicineForm.Capsules]: '胶囊',
    [MedicineForm.Dissolved]: '冲剂',
    [MedicineForm.OralLiquid]: '口服液'
}

export const medicineFormOptions = [{
    value: MedicineForm.Capsules,
    label: medicineFormMap[MedicineForm.Capsules]
}, {
    value: MedicineForm.Dissolved,
    label: medicineFormMap[MedicineForm.Dissolved]
}, {
    value: MedicineForm.OralLiquid,
    label: medicineFormMap[MedicineForm.OralLiquid]
}]

