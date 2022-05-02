import { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import { Col, Row, Button } from 'antd';
import { history } from 'umi';
import type { DataItem } from '../data.d';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 8,
  sm: 8,
  md: 8,
  lg: 8,
  xl: 8,
  style: { marginBottom: 24 },
};

const data = [
  {
    type: '分类一',
    value: 27,
  },
  {
    type: '分类二',
    value: 25,
  },
  {
    type: '分类三',
    value: 18,
  },
  {
    type: '分类四',
    value: 15,
  },
  {
    type: '分类五',
    value: 10,
  },
  {
    type: '其他',
    value: 5,
  },
];
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
  const [youngAgeData, setYoungAgeData] = useState<any[]>([]);
  const [youngConfig, setYoungConfig] = useState(config);
  const [middleAgeData, setMiddleAgeData] = useState<any[]>([]);
  const [middleConfig, setMiddleConfig] = useState(config);
  const [oldAgeData, setOldAgeData] = useState<any[]>([]);
  const [oldConfig, setOldConfig] = useState(config);
  const handleYoungAgeData = () => {
    visitData.forEach((item: any) => {
      const hasType = youngAgeData.find(youngAgeDataDataItem => youngAgeDataDataItem.type === item.disease_name);
      if (hasType) {
        hasType.value += item.disease_ref_youth_total;
      } else {
        youngAgeData.push({
          type: item.disease_name,
          value: item.disease_ref_youth_total
        })
      }
    });
    setYoungConfig({
      ...config,
      data: youngAgeData
    })
  }
  const handleMiddleAgeData = () => {
    visitData.forEach((item: any) => {
      const hasType = middleAgeData.find(middleAgeDataDataItem => middleAgeDataDataItem.type === item.disease_name);
      if (hasType) {
        hasType.value += item.disease_ref_middle_total;
      } else {
        middleAgeData.push({
          type: item.disease_name,
          value: item.disease_ref_middle_total
        })
      }
    });
    setMiddleConfig({
      ...config,
      data: middleAgeData
    })
  }
  const handleOldAgeData = () => {
    visitData.forEach((item: any) => {
      const hasType = oldAgeData.find(oldAgeDataDataItem => oldAgeDataDataItem.type === item.disease_name);
      if (hasType) {
        hasType.value += item.disease_ref_old_total;
      } else {
        oldAgeData.push({
          type: item.disease_name,
          value: item.disease_ref_old_total
        })
      }
    });
    setOldConfig({
      ...config,
      data: oldAgeData
    })
  }
  useEffect(() => {
    if (visitData) {
      handleYoungAgeData();
      handleMiddleAgeData();
      handleOldAgeData();
    }
  }, [visitData])
  const handleGoAnalysis = () => {
    history.push('/analysis/disease-analysis/add');
  };
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div className={styles.title}>
          <div></div>
          <span>年龄-疾病分析</span>
        </div>
        <Button type='primary' shape='round' onClick={handleGoAnalysis}>点击预测</Button>
      </div>
    
      <Row gutter={24} className={styles.diseaseAnalysis}>
        <Col {...topColResponsiveProps} span={6}>
          30岁以下
          <Pie {...youngConfig} />
        </Col>
        <Col {...topColResponsiveProps} span={6}>
          30-50岁
          <Pie {...middleConfig} />
        </Col>
        <Col {...topColResponsiveProps} span={6}>
          50岁以上
          <Pie {...oldConfig} />
        </Col>
      </Row>
    </>)
};

export default IntroduceRow;
