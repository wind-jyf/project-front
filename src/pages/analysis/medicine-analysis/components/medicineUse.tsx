import { useState, useEffect } from 'react';
import { Pie, Column } from '@ant-design/charts';
import { Col, Row } from 'antd';
import type { DataItem } from '../data';
import { medicineCategoryMap } from '../../../information/medicine/constants';
import styles from '../style.less';

const config: any = {
  height: 300,
  forceFit: true,
  data: [],
  xField: "x",
  yField: "y",
  xAxis: {
    visible: true,
    title: {
      visible: false,
    },
  },
  yAxis: {
    visible: true,
    title: {
      visible: false,
    },
  },
  title: {
    visible: true,
    text: '使用量',
    style: {
      fontSize: 14,
    },
  },
  meta: {
    y: {
      alias: '使用量',
    },
  },
};

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 24,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: DataItem[] }) => {
  const [useData, setUseData] = useState<any[]>([]);
  const [useConfig, setUseConfig] = useState(config);
  const handlUseData = () => {
    visitData.forEach((item: any) => {
      const hasType = useData?.find(useDataItem => useDataItem.type === medicineCategoryMap[item.medicine_category]);
      if (hasType) {
        hasType.y += item.medicine_used_total;
      } else {
        useData.push({
          x: medicineCategoryMap[item.medicine_category],
          y: item.medicine_used_total
        })
      }
    });
    setUseConfig({
      ...config,
      data: useData
    })
  }
  useEffect(() => {
    if (visitData) {
      handlUseData();
    }
  }, [visitData]);

  return (
  <>
    <div className={styles.title}>
      <div></div>
      <span>使用量-药品分析</span>
    </div>
    <Row gutter={24} className={styles.medicineRow}>
      <Col {...topColResponsiveProps} span={24}>
        <Column
          {...useConfig}
          />
      </Col>
    </Row>
  </>
)};

export default IntroduceRow;
