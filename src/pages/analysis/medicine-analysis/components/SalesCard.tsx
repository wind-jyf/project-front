import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import { Column, Line } from '@ant-design/charts';

import type { DataItem } from '../data.d';
import styles from '../style.less';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];
export type TimeType = 'today' | 'week' | 'month' | 'year';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

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
}) => (
  <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
    <div className={styles.salesCard}>
    <Row>
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        <div className={styles.salesBar}>
          <Line
            height={300}
            forceFit
            data={salesData as any}
            xField="x"
            yField="y"
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
      {/* <Tabs
        tabBarExtraContent={
          <div className={styles.salesExtraWrap}>
            <div className={styles.salesExtra}>
              <a className={isActive('today')} onClick={() => selectDate('today')}>
                今日
              </a>
              <a className={isActive('week')} onClick={() => selectDate('week')}>
                本周
              </a>
              <a className={isActive('month')} onClick={() => selectDate('month')}>
                本月
              </a>
              <a className={isActive('year')} onClick={() => selectDate('year')}>
                本年
              </a>
            </div>
            <RangePicker
              value={rangePickerValue}
              onChange={handleRangePickerChange}
              style={{ width: 256 }}
            />
          </div>
        }
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        <TabPane tab="就诊人数" key="sales">
          <Row>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Column
                  height={300}
                  forceFit
                  data={salesData as any}
                  xField="x"
                  yField="y"
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
                    text: '就诊趋势',
                    style: {
                      fontSize: 14,
                    },
                  }}
                  meta={{
                    y: {
                      alias: '就诊人数',
                    },
                  }}
                />
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="访问量" key="views">
          <Row>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Line
                  height={300}
                  forceFit
                  data={salesData as any}
                  xField="x"
                  yField="y"
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
        </TabPane>
      </Tabs> */}
    </div>
  </Card>
);

export default SalesCard;
