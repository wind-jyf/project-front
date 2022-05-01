export enum DepartmentCategory {
    outpatient = 1, // 门诊
    inpatient = 2, // 住院
    emergency = 3, // 急诊
    radiation = 4, // 放射科
}

export const departmentCategoryMap = {
    [DepartmentCategory.outpatient]: '门诊部',
    [DepartmentCategory.inpatient]: '住院部',
    [DepartmentCategory.emergency]: '急诊部',
    [DepartmentCategory.radiation]: '放射科'
}
export const departmenCategoryOptions = [{
    value: DepartmentCategory.outpatient,
    label: departmentCategoryMap[DepartmentCategory.outpatient]
}, {
    value: DepartmentCategory.inpatient,
    label: departmentCategoryMap[DepartmentCategory.inpatient]
}, {
    value: DepartmentCategory.emergency,
    label: departmentCategoryMap[DepartmentCategory.emergency]
}, {
    value: DepartmentCategory.radiation,
    label: departmentCategoryMap[DepartmentCategory.radiation]
}]