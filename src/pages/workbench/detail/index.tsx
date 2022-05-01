import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Badge, Card, Descriptions, Divider } from 'antd';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
import type { FC } from 'react';
import React from 'react';
import { useRequest } from 'umi';
import type { BasicGood, BasicProgress } from './data';
import { queryBasicProfile } from './service';
import styles from './style.less';

const progressColumns: ProColumns<BasicProgress>[] = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '当前进度',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text: React.ReactNode) => {
      if (text === 'success') {
        return <Badge status="success" text="成功" />;
      }
      return <Badge status="processing" text="进行中" />;
    },
  },

  {
    title: '操作员ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '耗时',
    dataIndex: 'cost',
    key: 'cost',
  },
];

const Basic: FC = () => {
  const { data, loading } = useRequest(() => {
    return queryBasicProfile();
  });

  const { basicGoods, basicProgress } = data || {
    basicGoods: [],
    basicProgress: [],
  };
  let goodsData: typeof basicGoods = [];
  if (basicGoods.length) {
    let num = 0;
    let amount = 0;
    basicGoods.forEach((item) => {
      num += Number(item.num);
      amount += Number(item.amount);
    });
    goodsData = basicGoods.concat({
      id: '总计',
      num,
      amount,
    });
  }

  const renderContent = (value: any, _: any, index: any) => {
    const obj: {
      children: any;
      props: { colSpan?: number };
    } = {
      children: value,
      props: {},
    };
    if (index === basicGoods.length) {
      obj.props.colSpan = 0;
    }
    return obj;
  };

  const goodsColumns: ProColumns<BasicGood>[] = [
    {
      title: '商品编号',
      dataIndex: 'id',
      key: 'id',
      render: (text: React.ReactNode, _: any, index: number) => {
        if (index < basicGoods.length) {
          return <span>{text}</span>;
        }
        return {
          children: <span style={{ fontWeight: 600 }}>总计</span>,
          props: {
            colSpan: 4,
          },
        };
      },
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render: renderContent,
    },
    {
      title: '商品条码',
      dataIndex: 'barcode',
      key: 'barcode',
      render: renderContent,
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      align: 'right' as 'left' | 'right' | 'center',
      render: renderContent,
    },
    {
      title: '数量（件）',
      dataIndex: 'num',
      key: 'num',
      align: 'right' as 'left' | 'right' | 'center',
      render: (text: React.ReactNode, _: any, index: number) => {
        if (index < basicGoods.length) {
          return text;
        }
        return <span style={{ fontWeight: 600 }}>{text}</span>;
      },
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as 'left' | 'right' | 'center',
      render: (text: React.ReactNode, _: any, index: number) => {
        if (index < basicGoods.length) {
          return text;
        }
        return <span style={{ fontWeight: 600 }}>{text}</span>;
      },
    },
  ];
  const breadCrumb: BreadcrumbProps = {
    routes: [{
      breadcrumbName: '医生工作台',
      path: 'workbench'
    }, {
      breadcrumbName: '病历详情',
      path: '/workbench/detail'
    }]
  }

  return (
    <PageContainer title="病历详情" breadcrumb={breadCrumb}>
      <Card bordered={false}>
        <Descriptions title="病人基本信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="姓名">1000000000</Descriptions.Item>
          <Descriptions.Item label="性别">已取货</Descriptions.Item>
          <Descriptions.Item label="年龄">1234123421</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="病历信息" style={{ marginBottom: 32 }} layout="vertical">
          <Descriptions.Item label="主诉">付小小</Descriptions.Item>
          <Descriptions.Item label="病人症状">18100000000</Descriptions.Item>
          <Descriptions.Item label="所属科室">菜鸟仓储</Descriptions.Item>
          <Descriptions.Item label="使用药品">浙江省杭州市西湖区万塘路18号</Descriptions.Item>
          <Descriptions.Item label="医嘱">无</Descriptions.Item>
        </Descriptions>
      </Card>
    </PageContainer>
  );
};

export default Basic;
