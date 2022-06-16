import download from 'downloadjs';
import { invoke, get } from 'lodash';
export interface CsvColumn<T = any> {
    title: string;
    dataIndex?: string;
    computed?: (val: any, record: T, index: number) => string | number;
}

// 防止中文乱码
const chineseBOMHeader = '\ufeff';

const generateDataFromColumns = (data: any[][], columns: CsvColumn[]) => {
    return data.map(contact => {
        return columns.map(({ computed, dataIndex }, index) => {
            if (computed) {
                return computed(
                    dataIndex ? get(contact, dataIndex, '') : '',
                    contact,
                    index,
                );
            }
            if (dataIndex) {
                return get(contact, dataIndex, '');
            }
        });
    });
};

export const exportAsCsv = (columns: CsvColumn[], rawData: any[], filename: string) => {
    const data = generateDataFromColumns(rawData, columns);
    const headerStr = columns.map(({ title }) => title).join();
    const csvDataStr = data.map(row => {
        if (row.length !== columns.length) {
            throw RangeError(`表头有列${columns.length}个，与数据列数目${row.length}不符`);
        }
        return row.map(cellData => invoke(cellData, 'toString') || '').join();
    }).join('\n');
    download(
        new Blob([`${chineseBOMHeader}${headerStr}\n${csvDataStr}`], { type: 'text/csv,charset=UTF-8' }),
        filename,
        'text/csv'
    );
};
