import { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import { Col, Row, Button } from 'antd';
import { history } from 'umi';
import type { DataItem } from '../data';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 8,
  sm: 8,
  md: 8,
  lg: 8,
  xl: 12,
  style: { marginBottom: 24 },
};

const config: any = {
  appendPadding: 10,
  data: [],
  angleField: 'value',
  colorField: 'type',
  radius: 0.9,
  label: {
    type: 'inner',
    offset: '-30%',
    content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
    style: {
      fontSize: 14,
      textAlign: "center",
    },
    visible: true
  },
  interactions: [
    {
      type: 'element-active',
    },
  ],
  
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: DataItem[] }) => {
  const [femaleData, setFemaleData] = useState<any[]>([]);
  const [femaleConfig, setFemaleConfig] = useState(config);
  const [maleData, setMaleData] = useState<any[]>([]);
  const [maleConfig, setMaleConfig] = useState(config);

  const handlFemalData = () => {
    visitData.forEach((item: any) => {
      const hasType = femaleData.find(femaleDataItem => femaleDataItem.type === item.disease_name);
      if (hasType) {
        hasType.value += item.disease_ref_female_total;
      } else {
        femaleData.push({
          type: item.disease_name,
          value: item.disease_ref_female_total
        })
      }
    });
    setFemaleConfig({
      ...config,
      data: femaleData
    })
  }

  const handlMaleData = () => {
    visitData.forEach((item: any) => {
      const hasType = maleData.find(maleDataItem => maleDataItem.type === item.disease_name);
      if (hasType) {
        hasType.value += item.disease_ref_male_total;
      } else {
        maleData.push({
          type: item.disease_name,
          value: item.disease_ref_male_total
        })
      }
    });
    setMaleConfig({
      ...config,
      data: maleData
    })
  }

  useEffect(() => {
    if (visitData) {
      handlFemalData();
      handlMaleData();
    }
  }, [visitData]);
  const handleGoAnalysis = () => {
    history.push('/analysis/disease-analysis/add');
  };
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div className={styles.title}>
          <div></div>
          <span>性别-疾病分析</span>
        </div>
      </div>
    
      <Row gutter={24} className={styles.diseaseAnalysis}>
        <Col {...topColResponsiveProps} span={6}>
          男性
          <Pie {...maleConfig} />
        </Col>
        <Col {...topColResponsiveProps} span={6}>
          女性
          <Pie {...femaleConfig} />
        </Col>
      </Row>
    </>)
};

export default IntroduceRow;
