import { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import { Col, Row } from 'antd';
import type { DataItem } from '../data';
import { departmentCategoryMap } from '../../../information/department/consts';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
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
      const hasType = femaleData.find(femaleDataItem => femaleDataItem.type === item.department_name);
      if (hasType) {
        hasType.value += item.department_ref_female_total;
      } else {
        femaleData.push({
          type: item.department_name,
          value: item.department_ref_female_total
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
      const hasType = maleData.find(maleDataItem => maleDataItem.type === item.department_name);
      if (hasType) {
        hasType.value += item.department_ref_male_total;
      } else {
        maleData.push({
          type: item.department_name,
          value: item.department_ref_male_total
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
  return (
  <>
    <div className={styles.title}>
      <div></div>
      <span>性别-科室分析</span>
    </div>
    <Row gutter={24} className={styles.ageAnlysis}>
      <Col {...topColResponsiveProps} span={12}>
        男性
        <Pie {...maleConfig} className={styles.agePie} />
      </Col>

      <Col {...topColResponsiveProps} span={12}>
        女性
        <Pie {...femaleConfig} className={styles.agePie} />
      </Col>
    </Row>
  </>
)};

export default IntroduceRow;
