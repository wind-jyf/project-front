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
  data,
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
            <Pie {...config} />
        </Col>
        <Col {...topColResponsiveProps} span={6}>
            <Pie {...config} />
        </Col>
      </Row>
    </>)
};

export default IntroduceRow;
