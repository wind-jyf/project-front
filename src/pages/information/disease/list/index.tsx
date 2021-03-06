import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Select, Form, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { getDepartMentList, addDisease, updateDisease, getDiseaseList } from '../service';
import type { TableListItem, TableListPagination } from './data';
/**
 * 添加节点
 *
 * @param fields
 */

const { Option } = Select;

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<any>();
  const [departMentOptions, setDepartMentOptions] = useState<any[]>([]);
  const [form] = Form.useForm();
  const searchDepartMentList = async () => {
    const { data = [] } = await getDepartMentList({});
    setDepartMentOptions(data.map((item: any) => {
      return {
        value: item.department_code,
        text: item.department_name
      }
    }))
  }
  useEffect(() => {
    searchDepartMentList();
  }, [])

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '疾病编码',
      dataIndex: 'disease_code',
      tip: '疾病编码是唯一的 key',
    },
    {
      title: '疾病名称',
      dataIndex: 'disease_name',
      valueType: 'textarea',
    },
    {
      title: '疾病所属科室',
      dataIndex: 'disease_ref_department',
      hideInForm: true,
      render: (value) => {
        return departMentOptions.find((item: any) => item.value === value)?.text;
      }
    },
    {
      title: '疾病描述',
      dataIndex: 'disease_description',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  const handleSubmit = async () => {
    try {
      form.validateFields();
      if (currentRow) {
        await updateDisease({
          id: currentRow.id,
          ...form.getFieldsValue() || {}
        });
        message.success('更新成功');

      } else {
        await addDisease(form.getFieldsValue());
        message.success('添加成功');
      }
      handleModalVisible(false);
      actionRef.current && actionRef.current.reload();
    } catch (e: any) {
      message.error(e.message);
    }
  }
  const options = departMentOptions.map(d => <Option key={d.value}>{d.text}</Option>);
  return (
    <PageContainer title="疾病管理">
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
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={getDiseaseList}
        columns={columns}
      />
      <Modal
        title="新建科室"
        width="400px"
        visible={createModalVisible}
        onCancel={() => {handleModalVisible(false); setCurrentRow(undefined)}}
        
        onOk={() => { handleSubmit() }} 
        destroyOnClose={true}     
      >
        <Form
          initialValues={currentRow || {}}
          form={form}
          preserve={false}
        >
        <ProFormText
          label="疾病编码"
          placeholder="请输入疾病编码"
          rules={[
            {
              required: true,
              message: '疾病编码为必填项',
            },
          ]}
          width="md"
          name="disease_code"
          disabled={!!currentRow}
        />
        <ProFormText
          label="疾病名称"
          placeholder="请输入疾病名称"
          rules={[
            {
              required: true,
              message: '疾病名称为必填项',
            },
          ]}
          width="md"
          name="disease_name"
        />
        <Form.Item
          style={{ width: '330px' }}
          name="disease_ref_department"
          label="疾病所属科室"
          rules={[
            {
              required: true,
              message: '请选择所属科室',
            },
          ]}
        >
          <Select
            showSearch
            onSearch={searchDepartMentList}
          >
            {options}
          </Select>
        </Form.Item>
        <ProFormTextArea 
          width="md" 
          name="disease_description"
          label="疾病描述" 
        />
         </Form>
      </Modal>
    </PageContainer>
  );
};

export default TableList;
