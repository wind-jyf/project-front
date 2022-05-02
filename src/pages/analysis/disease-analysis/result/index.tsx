import { useEffect, useState } from 'react';
import { Button, Card, Result } from 'antd';
import { Fragment } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { history } from 'umi';
import { getDiseaseByDiseaseCode, getDepartMentList } from '../service';

import styles from './index.less';

export default (props: any) => {
  const { disease_code } = props.location.query;
  const [disease, setDisease] = useState<any>();
  const [departMentList, setDepartMentList] = useState<any[]>([]);
  const getDiseaseDetail = async () => {
    const res = await getDiseaseByDiseaseCode({
      disease_code
    })
    setDisease(res);
  }
  const getDepartMent = async () => {
    const { data } = await getDepartMentList({});
    setDepartMentList(data);
  }
  useEffect(() => {
    if (disease_code) {
      getDiseaseDetail();
      getDepartMent();
    }
  }, [disease_code])
  const extra = (
    <Fragment>
      <Button type="primary" onClick={() => {
        history.replace('/analysis/disease-analysis');
      }}>返回</Button>
    </Fragment>
  );
  const content = (
    <div
      className={styles.diseaseDetail}
    >
      <div><span style={{ marginRight: '10px' }}>预测疾病:</span> {disease?.disease_name || ''}</div>
      <div><span style={{ marginRight: '10px' }}>疾病描述:</span> {disease?.disease_description || ''}</div>
      <div><span style={{ marginRight: '10px' }}>疾病关联科室:</span>{departMentList.find(item => item.department_code === disease?.disease_ref_department)?.department_name || ''}</div>
    </div>
  );
  return (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="success"
        title="预测成功"
        subTitle="此结果预测是根据医生工作台处的数据来进行分析"
        extra={extra}
        style={{ marginBottom: 16 }}
      >
        {content}
      </Result>
    </Card>
  </GridContent>
)};
