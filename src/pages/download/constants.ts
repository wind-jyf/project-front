import { CsvColumn } from '@/utils/csv';
export const computeBatchExportColumnData = (diseaseList: any[]): CsvColumn[] => [
    {
        title: '性别',
        dataIndex: 'patient_gender',
    },
    {
        title: '年龄',
        dataIndex: 'patient_age',
        computed: (_) => `${_}岁`
    },
    {
        title: '职业',
        dataIndex: 'patient_job',
    },
    {
        title: '主诉',
        dataIndex: 'main_suit',
    },
    {
        title: '症状',
        dataIndex: 'main_symptom',
    },
    {
        title: '医嘱',
        dataIndex: 'medical_advice',
    },
    {
        title: '确诊疾病',
        dataIndex: 'patient_ref_disease',
        computed: (_) => diseaseList.find(item => item.disease_code === _).disease_name
    },
];