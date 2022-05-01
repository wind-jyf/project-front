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
import { useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
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
      breadcrumbName: '数据分析',
      path: 'workbench'
    }, {
      breadcrumbName: '病情分析',
      path: '/workbench/add'
    }, {
      breadcrumbName: '病情预测',
      path: '/workbench/add'
    }]
  }

  return (
    <PageContainer title="病情预测" breadcrumb={breadCrumb}>
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          layout="vertical"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
        >
          <ProFormSelect
            label="性别"
            width="md"
            name="性别"
            options={[
              {
                value: '1',
                label: '同事甲',
              },
              {
                value: '2',
                label: '同事乙',
              }
            ]}
          />
          <ProFormText
            width="md"
            label="年龄"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
            placeholder="请输入年龄"
          />
          <ProFormText
            width="md"
            label="职业"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入职业',
              },
            ]}
            placeholder="请输入职业"
          />
          <ProFormTextArea
            label="主诉症状"
            width="xl"
            name="goal"
            rules={[
              {
                required: true,
                message: '请输入主诉',
              },
            ]}
            placeholder="请输入主诉"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default BasicForm;
