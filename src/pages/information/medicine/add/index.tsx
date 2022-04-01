import { Card, message } from 'antd';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
import { useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';

const BasicForm: FC<Record<string, any>> = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    run(values);
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
          hideRequiredMark
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          layout="vertical"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="药品编号"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入药品编号',
              },
            ]}
            placeholder="请输入药品编号"
          />
          <ProFormText
            width="md"
            label="药品名称"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入药品名称',
              },
            ]}
            placeholder="请输入药品名称"
          />
          <ProFormText
            width="md"
            label="生产厂家"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入生产厂家',
              },
            ]}
            placeholder="请输入生产厂家"
          />
          <ProFormSelect
            width="md"
            name="country"
            label="药品类型"
            rules={[
              {
                required: true,
                message: '请选择药品类型',
              },
            ]}
            options={[
              {
                label: '中国',
                value: 'China',
              },
            ]}
          />
          <ProFormText
            width="md"
            label="药品规格"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入药品规格',
              },
            ]}
            placeholder="请输入药品规格"
          />
          <ProFormText
            width="md"
            label="药品单价"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入药品单价',
              },
            ]}
            placeholder="请输入药品单价"
          />
          <ProFormSelect
            width="md"
            name="country"
            label="药品剂型"
            rules={[
              {
                required: true,
                message: '请选择药品剂型',
              },
            ]}
            options={[
              {
                label: '中国',
                value: 'China',
              },
            ]}
          />
          <ProFormText
            width="md"
            label="库存"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入库存',
              },
            ]}
            placeholder="请输入库存"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default BasicForm;
