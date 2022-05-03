import { Form, Button, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { ProFormText } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout';
import { exportAsCsv } from '@/utils/csv';
import { computeBatchExportColumnData } from '../constants';
import { computeDiseaseAnalysis, getDiseaseList, getWorkBenchList } from '../service';
import './index.less'

const TableList: React.FC = () => {
  const [percentResult, setPercentResult] = useState();
  const [diseaseList, setDiseaseList] = useState<any[]>([]);
  const [workBenchList, setWorkBenchList] = useState<any[]>([]);
  const [form] = Form.useForm();

  const getDisease = async () => {
    const { data } = await getDiseaseList({});
    setDiseaseList(data);
  }

  const getWorkBench = async () => {
    const { data } = await getWorkBenchList({});
    setWorkBenchList(data);
  }

  useEffect(() => {
    getDisease();
    getWorkBench();
  }, []);

  const handleAnalysis = async () => {
    try {
      const percentText = form.getFieldValue('percent_text');
      const { result } = await computeDiseaseAnalysis({
        percent_text: percentText
      })
      setPercentResult(result);
    } catch (e: any) {
      message.error(e.message);
    }
  }

  const handleDownload = async () => {
    const columns = computeBatchExportColumnData(diseaseList);
    exportAsCsv(columns, workBenchList, '数据集');
  }

  return (
    <PageContainer title="算法准确度分析">
      <div className='download'>
        <Form form={form}>
          <ProFormText
            width="md"
            label="训练集: 测试集"
            name="percent_text"
            placeholder="输入比例, 例如7:3"
          />
        </Form>
        <Button type='primary' shape='round' onClick={handleAnalysis}>点击分析</Button>
        <p className='percent'>正确率: {percentResult || '--'}{percentResult === void 0 ? '' : '%'}</p>
        <div className='data-base'>数据集 <Button type='primary' ghost onClick={handleDownload}>点击下载</Button></div>
      </div>
    </PageContainer>
  );
};

export default TableList;
