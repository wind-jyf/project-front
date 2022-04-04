import { Pie } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';

import type { DataItem } from '../data.d';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
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

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: DataItem[] }) => (
  <>
    <div className={styles.title}>
      <div></div>
      <span>年龄-科室分析</span>
    </div>
    <Row gutter={24} className={styles.ageAnlysis}>
      <Col {...topColResponsiveProps} span={6}>
        <Pie {...config} className={styles.agePie} />
      </Col>

      <Col {...topColResponsiveProps} span={6}>
        <Pie {...config} className={styles.agePie} />
      </Col>
      <Col {...topColResponsiveProps} span={6}>
        <Pie {...config} className={styles.agePie} />
      </Col>
    </Row>
  </>
);

export default IntroduceRow;
