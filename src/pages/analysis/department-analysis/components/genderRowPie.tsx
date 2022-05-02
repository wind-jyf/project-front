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
  const [femaleData, setFemaleData] = useState<any[]>([]);
  const [femaleConfig, setFemaleConfig] = useState(config);
  const [maleData, setMaleData] = useState<any[]>([]);
  const [maleConfig, setMaleConfig] = useState(config);

  const handlFemalData = () => {
    visitData.forEach((item: any) => {
      const hasType = femaleData.find(femaleDataItem => femaleDataItem.type === departmentCategoryMap[item.department_category]);
      if (hasType) {
        hasType.value += item.department_ref_female_total;
      } else {
        femaleData.push({
          type: departmentCategoryMap[item.department_category],
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
      const hasType = maleData.find(maleDataItem => maleDataItem.type === departmentCategoryMap[item.department_category]);
      if (hasType) {
        hasType.value += item.department_ref_male_total;
      } else {
        maleData.push({
          type: departmentCategoryMap[item.department_category],
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
