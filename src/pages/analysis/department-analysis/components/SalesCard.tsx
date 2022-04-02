import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import { Line } from '@ant-design/charts';

import type { DataItem } from '../data.d';
import styles from '../style.less';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];
export type TimeType = 'today' | 'week' | 'month' | 'year';

const rankingListData: { title: string; total: number }[] = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

const SalesCard = ({
  rangePickerValue,
  salesData,
  isActive,
  handleRangePickerChange,
  loading,
  selectDate,
}: {
  rangePickerValue: RangePickerValue;
  isActive: (key: TimeType) => string;
  salesData: DataItem[];
  loading: boolean;
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  selectDate: (key: TimeType) => void;
}) => {
  const data = [{
    x: '2022-3-1',
    y: 100,
    date: 'A科室'
  }, {
    x: '2022-3-2',
    y: 290,
    date: 'A科室'
  }, {
    x: '2022-3-3',
    y: 350,
    date: 'B科室'
  }, {
    x: '2022-3-4',
    y: 420,
    date: 'B科室',
  }, {
    x: '2022-3-5',
    y: 550,
    date: 'A科室'
  }]
  return (
  <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
    <div className={styles.salesCard}>
    <Row>
        <Col xl={16} lg={12} md={12} sm={24} xs={24}>
          <div className={styles.salesBar}>
            <Line
              height={300}
              forceFit
              data={data as any}
              xField="x"
              yField="y"
              seriesField="date"
              xAxis={{
                visible: true,
                title: {
                  visible: false,
                },
              }}
              yAxis={{
                visible: true,
                title: {
                  visible: false,
                },
              }}
              title={{
                visible: true,
                text: '访问量趋势',
                style: {
                  fontSize: 14,
                },
              }}
              meta={{
                y: {
                  alias: '访问量',
                },
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  </Card>
  )};

export default SalesCard;
