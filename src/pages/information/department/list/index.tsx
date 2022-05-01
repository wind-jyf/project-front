import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Form } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from './service';
import { addDepartMent, getDepartMentList, updateDepartMent } from '../service';
import type { TableListItem, TableListPagination } from './data';
import { departmenCategoryOptions, departmentCategoryMap } from '../consts';
import { useForm } from 'antd/es/form/Form';
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addDepartMent({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */


const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState();
  
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<any>();
  const [form] = Form.useForm();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '科室编码',
      dataIndex: 'department_code',
    },
    {
      title: '科室名称',
      dataIndex: 'department_name',
      valueType: 'textarea',
    },
    {
      title: '科室分类',
      dataIndex: 'department_category',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => departmentCategoryMap[val],
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
            setFormValues(currentRow);
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
        await updateDepartMent({
          id: currentRow.id,
          ...form.getFieldsValue() || {}
        });
        message.success('更新成功');

      } else {
        await addDepartMent(form.getFieldsValue());
        message.success('添加成功');
      }
      handleModalVisible(false);
      actionRef.current && actionRef.current.reload();
    } catch (e: any) {
      message.error(e.message);
    }
  }

  return (
    <PageContainer title="科室管理">
      <ProTable<TableListItem, TableListPagination>
        actionRef={actionRef}
        rowKey="id"
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
        request={getDepartMentList}
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
            label="科室编码"
            placeholder="请输入科室编码"
            rules={[
              {
                required: true,
                message: '科室编码为必填项',
              },
            ]}
            width="md"
            name="department_code"
            disabled={!!currentRow}
          />
          <ProFormText
            label="科室名称"
            placeholder="请输入科室名称"
            rules={[
              {
                required: true,
                message: '科室名称为必填项',
              },
            ]}
            width="md"
            name="department_name"
          />
          <ProFormSelect
            width="md"
            name="department_category"
            label="科室类别"
            rules={[
              {
                required: true,
                message: '请选择科室类别',
              },
            ]}
            options={departmenCategoryOptions}
          />
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default TableList;
