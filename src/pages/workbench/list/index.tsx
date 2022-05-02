import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem, TableListPagination } from './data';
import { getWorkbenchList } from '../service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: '规则名称是唯一的 key',
    },
    {
      title: '姓名',
      dataIndex: 'patient_name',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '性别',
      dataIndex: 'patient_gender',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '年龄',
      dataIndex: 'patient_age',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record: any) => [
        <a
          href={`/workbench/detail?id=${record.id}`}
        >
          查看详情
        </a>,
      ],
    },
  ];

  return (
    <PageContainer title="医生工作台">
      <ProTable<TableListItem, TableListPagination>
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push('/workbench/add');
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={getWorkbenchList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
