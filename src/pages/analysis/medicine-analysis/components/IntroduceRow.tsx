import { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import { Col, Row } from 'antd';
import type { DataItem } from '../data.d';
import { medicineCategoryMap } from '../../../information/medicine/constants';
import styles from '../style.less';

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

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 24,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: DataItem[] }) => {
  const [priceData, setPriceData] = useState<any[]>([]);
  const [priceConfig, setPriceConfig] = useState(config);

  const handlPriceData = () => {
    visitData.forEach((item: any) => {
      const hasType = priceData.find(priceDataItem => priceDataItem.type === medicineCategoryMap[item.medicine_category]);
      if (hasType) {
      } else {
        let count = 0;
        const sum = visitData.reduce((pre: number, current: any) => {
          if (current.medicine_category === item.medicine_category) {
            count++;
            return pre += (current.medicine_price || 0);
          } else {
            return pre;
          }
        }, 0);
        priceData.push({
          type: medicineCategoryMap[item.medicine_category],
          value: sum / count,
        })
      }
    });
    setPriceConfig({
      ...config,
      data: priceData
    })
  }
  useEffect(() => {
    if (visitData) {
      handlPriceData();
    }
  }, [visitData]);
  return (
  <>
    <div className={styles.title}>
      <div></div>
      <span>费用-药品分析</span>
    </div>
    <Row gutter={24} className={styles.medicineRow}>
      <Col {...topColResponsiveProps} span={24}>
        <Pie {...priceConfig} className={styles.agePie} />
      </Col>
    </Row>
  </>
)};

export default IntroduceRow;
