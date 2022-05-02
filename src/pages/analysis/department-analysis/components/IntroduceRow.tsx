import { Pie } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';
import { useEffect, useState } from 'react';

import type { DataItem } from '../data.d';
import { departmentCategoryMap } from '../../../information/department/consts';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
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
  const [youngAgeData, setYoungAgeData] = useState<any[]>([]);
  const [youngConfig, setYoungConfig] = useState(config);
  const [middleAgeData, setMiddleAgeData] = useState<any[]>([]);
  const [middleConfig, setMiddleConfig] = useState(config);
  const [oldAgeData, setOldAgeData] = useState<any[]>([]);
  const [oldConfig, setOldConfig] = useState(config);
  const handleYoungAgeData = () => {
    visitData.forEach((item: any) => {
      const hasType = youngAgeData.find(youngAgeDataDataItem => youngAgeDataDataItem.type === departmentCategoryMap[item.department_category]);
      if (hasType) {
        hasType.value += item.department_ref_youth_total;
      } else {
        youngAgeData.push({
          type: departmentCategoryMap[item.department_category],
          value: item.department_ref_youth_total
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
      const hasType = middleAgeData.find(middleAgeDataDataItem => middleAgeDataDataItem.type === departmentCategoryMap[item.department_category]);
      if (hasType) {
        hasType.value += item.department_ref_middle_total;
      } else {
        middleAgeData.push({
          type: departmentCategoryMap[item.department_category],
          value: item.department_ref_middle_total
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
      const hasType = oldAgeData.find(oldAgeDataDataItem => oldAgeDataDataItem.type === departmentCategoryMap[item.department_category]);
      if (hasType) {
        hasType.value += item.department_ref_old_total;
      } else {
        oldAgeData.push({
          type: departmentCategoryMap[item.department_category],
          value: item.department_ref_old_total
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
  return (
  <>
    <div className={styles.title}>
      <div></div>
      <span>年龄-科室分析</span>
    </div>
    <Row gutter={24} className={styles.ageAnlysis}>
      <Col {...topColResponsiveProps} span={6}>
        30岁以下
        <Pie {...youngConfig} className={styles.agePie} />
      </Col>

      <Col {...topColResponsiveProps} span={6}>
        30-50岁
        <Pie {...middleConfig} className={styles.agePie} />
      </Col>
      <Col {...topColResponsiveProps} span={6}>
        50岁以上
        <Pie {...oldConfig} className={styles.agePie} />
      </Col>
    </Row>
  </>
)};

export default IntroduceRow;
