import { Card, message } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
import { predictAnalysis } from '../service';

const BasicForm: FC<Record<string, any>> = () => {
  const { run } = useRequest(predictAnalysis, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    const data = await run(values);
    history.push(`/analysis/disease-analysis/result?disease_code=${data}`);
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
            name="patient_gender"
            options={[
              {
                value: 'femal',
                label: '女',
              },
              {
                value: 'man',
                label: '男',
              }
            ]}
          />
          <ProFormText
            width="md"
            label="年龄"
            name="patient_age"
            rules={[
              {
                required: true,
                message: '请输入年龄',
              },
            ]}
            placeholder="请输入年龄"
          />
          <ProFormText
            width="md"
            label="职业"
            name="patient_job"
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
            name="main_suit"
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
