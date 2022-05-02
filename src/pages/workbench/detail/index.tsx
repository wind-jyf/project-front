import { PageContainer } from '@ant-design/pro-layout';

import { Card, Descriptions, Divider, message } from 'antd';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
import { FC, useEffect, useState } from 'react';
import { getWorkbenchById, getDepartMentList, getMedicineList, getDiseaseList } from '../service';

const Basic: FC = (props: any) => {
 
  const { id } = props.location.query;
  const [workBenchDetailInfo, setWorkBenchDetailInfo] = useState<any>();
  const [departMentList, setDepartMentList] = useState<any>([]);
  const [medicineList, setMedicineList] = useState<any>([]);
  const [diseaseList, setDiseaseList] = useState<any>([]);

  const getWorkBenchDetail = async () => {
    try {
      const res = await getWorkbenchById({ id });
      setWorkBenchDetailInfo(res);
    } catch (e: any) {
      message.error(e.message);
    }
  }

  const getDepartMent = async () => {
    const { data } = await getDepartMentList({});
    setDepartMentList(data);
  }

  const getMedicine = async () => {
    const { data } = await getMedicineList({});
    setMedicineList(data);
  }

  const getDisease = async () => {
    const { data } = await getDiseaseList({});
    setDiseaseList(data);
  }

  useEffect(() => {
    if (id) {
      getWorkBenchDetail();
      getDepartMent();
      getMedicine();
      getDisease();
    }
  }, [id]);
  const breadCrumb: BreadcrumbProps = {
    routes: [{
      breadcrumbName: '医生工作台',
      path: 'workbench'
    }, {
      breadcrumbName: '病历详情',
      path: '/workbench/detail'
    }]
  }

  return (
    <PageContainer title="病历详情" breadcrumb={breadCrumb}>
      <Card bordered={false}>
        <Descriptions title="病人基本信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="姓名">{workBenchDetailInfo?.patient_name}</Descriptions.Item>
          <Descriptions.Item label="性别">{workBenchDetailInfo?.patient_gender}</Descriptions.Item>
          <Descriptions.Item label="年龄">{workBenchDetailInfo?.patient_age}</Descriptions.Item>
          <Descriptions.Item label="职业">{workBenchDetailInfo?.patient_job}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="病历信息" style={{ marginBottom: 32 }} layout="vertical">
          <Descriptions.Item label="主诉">{workBenchDetailInfo?.main_suit}</Descriptions.Item>
          <Descriptions.Item label="病人症状">{workBenchDetailInfo?.main_symptom}</Descriptions.Item>
          <Descriptions.Item label="所属科室">{departMentList.find((item: any) => item.department_code === workBenchDetailInfo?.patient_ref_department)?.department_name}</Descriptions.Item>
          <Descriptions.Item label="使用药品">{medicineList.find((item: any) => item.medicine_code === workBenchDetailInfo?.patient_ref_medicine)?.medicine_name}</Descriptions.Item>
          <Descriptions.Item label="确诊疾病">{diseaseList.find((item: any) => item.disease_code === workBenchDetailInfo?.patient_ref_disease)?.disease_name}</Descriptions.Item>
          <Descriptions.Item label="医嘱">{workBenchDetailInfo?.medical_advice}</Descriptions.Item>
        </Descriptions>
      </Card>
    </PageContainer>
  );
};

export default Basic;
