import { useState, useEffect } from 'react';
import { Card, message, Form } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
import { useRequest, history } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { addMedicine, updateMedicine, getMedicineById } from '../service';
import { medicineCategoryOptions, medicineFormOptions } from '../constants';

enum PageAction {
  Add = 'add',
  Update = 'update',
  Detail = 'detail'
}

const BasicForm: FC<Record<string, any>> = (props) => {
  const { action = PageAction.Add, id } = props.location.query;
  const [form] = Form.useForm();

  const detailAction = action === PageAction.Detail;
  const updateAction = action === PageAction.Update

  const getMedicineInfo = async () => {
    const res = await getMedicineById({id});
    form.setFieldsValue(res);
  }

  useEffect(() => {
    if (id) {
      getMedicineInfo();
    }
  }, [id]);
  const { run: add } = useRequest(addMedicine, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
      history.replace('/information/medicine/list');
    },
  });

  const { run: update } = useRequest(updateMedicine, {
    manual: true,
    onSuccess: () => {
      message.success('更新成功');
      history.replace('/information/medicine/list');
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    if (updateAction) {
      update(values);
    } else {
      add(values);
    }
    
  };

  const breadCrumb: BreadcrumbProps = {
    routes: [{
      breadcrumbName: '信息维护',
      path: 'information'
    }, {
      breadcrumbName: '药品管理',
      path: '/information/medicine/list'
    }, {
      breadcrumbName: '新增药品',
      path: '/information/medicine/add'
    }]
  }

  

  return (
    <PageContainer title="新增药品" breadcrumb={breadCrumb}>
      <Card bordered={false}>
        <ProForm
          form={form}
          hideRequiredMark
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="药品编号"
            name="medicine_code"
            rules={[
              {
                required: true,
                message: '请输入药品编号',
              },
            ]}
            placeholder="请输入药品编号"
            disabled={detailAction || updateAction}
          />
          <ProFormText
            width="md"
            label="药品名称"
            name="medicine_name"
            rules={[
              {
                required: true,
                message: '请输入药品名称',
              },
            ]}
            placeholder="请输入药品名称"
            disabled={detailAction}
          />
          <ProFormText
            width="md"
            label="生产厂家"
            name="medicine_manufacturer"
            rules={[
              {
                required: true,
                message: '请输入生产厂家',
              },
            ]}
            placeholder="请输入生产厂家"
            disabled={detailAction}
          />
          <ProFormSelect
            width="md"
            name="medicine_category"
            label="药品类型"
            rules={[
              {
                required: true,
                message: '请选择药品类型',
              },
            ]}
            options={medicineCategoryOptions}
            disabled={detailAction}
          />
          <ProFormText
            width="md"
            label="药品规格"
            name="medicine_specifications"
            rules={[
              {
                required: true,
                message: '请输入药品规格',
              },
            ]}
            placeholder="请输入药品规格"
            disabled={detailAction}
          />
          <ProFormText
            width="md"
            label="药品单价"
            name="medicine_price"
            rules={[
              {
                required: true,
                message: '请输入药品单价',
              },
            ]}
            placeholder="请输入药品单价"
            disabled={detailAction}
          />
          <ProFormSelect
            width="md"
            name="medicine_form"
            label="药品剂型"
            rules={[
              {
                required: true,
                message: '请选择药品剂型',
              },
            ]}
            options={medicineFormOptions}
            disabled={detailAction}
          />
          <ProFormText
            width="md"
            label="库存"
            name="medicine_rest_total"
            rules={[
              {
                required: true,
                message: '请输入库存',
              },
            ]}
            placeholder="请输入库存"
            disabled={detailAction}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default BasicForm;
