import React from 'react';
import { Suspense, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import IntroduceRow from './components/IntroduceRow';
import SalesCard from './components/SalesCard';
import GenderRowPie from './components/genderRowPie';
import { useRequest } from 'umi';

import { getDepartMentAnalysis } from './service';
import PageLoading from './components/PageLoading';
import type { TimeType } from './components/SalesCard';
import { getTimeDistance } from './utils/utils';

import styles from './style.less';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

type SalesType = 'all' | 'online' | 'stores';

const HomePage: React.FC = () => {
  const [salesType, setSalesType] = useState<SalesType>('all');
  const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
    getTimeDistance('year'),
  );

  const { loading, data } = useRequest(getDepartMentAnalysis);

  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
  };

  const handleRangePickerChange = (value: RangePickerValue) => {
    setRangePickerValue(value);
  };

  const isActive = (type: TimeType) => {
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') &&
      rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  let salesPieData;
  if (salesType === 'all') {
    salesPieData = data?.salesTypeData;
  } else {
    salesPieData = salesType === 'online' ? data?.salesTypeDataOnline : data?.salesTypeDataOffline;
  }

  const visitsNumber = [{
    x: '2022-3-1',
    y: 100
  }, {
    x: '2022-3-2',
    y: 290
  }, {
    x: '2022-3-3',
    y: 350
  }, {
    x: '2022-3-4',
    y: 420
  }, {
    x: '2022-3-5',
    y: 550
  }]

  return (
    <GridContent>
      <>
        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={data?.salesData || visitsNumber}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            selectDate={selectDate}
          />
        </Suspense>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={data || []} />
        </Suspense>
        <Suspense fallback={<PageLoading />}>
          <GenderRowPie loading={loading} visitData={data || []} />
        </Suspense>
      </>
    </GridContent>
  );
};

export default HomePage;
