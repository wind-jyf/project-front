import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Card, Result, Button, Descriptions, Divider, Alert, Statistic } from 'antd';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormDigit, ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-form';
import type { StepDataType } from './data';
import styles from './style.less';

const StepDescriptions: React.FC<{
  stepData: StepDataType;
  bordered?: boolean;
}> = ({ stepData, bordered }) => {
  const { payAccount, receiverAccount, receiverName, amount } = stepData;
  return (
    <Descriptions column={1} bordered={bordered}>
      <Descriptions.Item label="付款账户"> {payAccount}</Descriptions.Item>
      <Descriptions.Item label="收款账户"> {receiverAccount}</Descriptions.Item>
      <Descriptions.Item label="收款人姓名"> {receiverName}</Descriptions.Item>
      <Descriptions.Item label="转账金额">
        <Statistic
          value={amount}
          suffix={
            <span
              style={{
                fontSize: 14,
              }}
            >
              元
            </span>
          }
          precision={2}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

const StepResult: React.FC<{
  onFinish: () => Promise<void>;
}> = (props) => {
  return (
    <Result
      status="success"
      title="操作成功"
      extra={
        <>
          <Button type="primary" onClick={props.onFinish}>
            继续看诊
          </Button>
          <Button>查看病历</Button>
        </>
      }
      className={styles.result}
    >
    </Result>
  );
};

const StepForm: React.FC<Record<string, any>> = () => {
  const [stepData, setStepData] = useState<StepDataType>({
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
    receiverMode: 'alipay',
  });
  const [current, setCurrent] = useState(0);
  const formRef = useRef<FormInstance>();

  const breadCrumb: BreadcrumbProps = {
    routes: [{
      breadcrumbName: '医生工作台',
      path: 'workbench'
    }, {
      breadcrumbName: '新增病历',
      path: '/workbench/add'
    }]
  }

  return (
    <PageContainer title="新增病历" breadcrumb={breadCrumb}>
      <Card bordered={false}>
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm<StepDataType>
            formRef={formRef}
            title="填写个人基本信息"
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <ProFormText
              label="姓名"
              name="name"
              rules={[
                { required: true, message: '请填写姓名' },
              ]}
              placeholder="请填写姓名"
            />
            <ProFormText
              label="年龄"
              name="age"
              rules={[
                { required: true, message: '请填写年龄' },
              ]}
              placeholder="请填写年龄"
            />
            <ProFormSelect
              label="性别"
              name="gender"
              rules={[{ required: true, message: '请选择性别' }]}
              valueEnum={{
                femal: '女',
                man: '男',
              }}
            />
            <ProFormSelect
              label="性别"
              name="gender"
              rules={[{ required: true, message: '请选择性别' }]}
              valueEnum={{
                femal: '女',
                man: '男',
              }}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm title="填写病历信息">
            <div className={styles.result}>
              <ProFormText
                label="主诉"
                name="age"
                rules={[
                  { required: true, message: '请填写主诉' },
                ]}
                placeholder="请填写主诉"
              />
              <ProFormText
                label="病人症状"
                name="age"
                rules={[
                  { required: true, message: '请填写病人症状' },
                ]}
                placeholder="请填写病人症状"
              />
              <ProFormSelect
                label="病人所属科室"
                name="gender"
                rules={[{ required: true, message: '请选择科室' }]}
                valueEnum={{
                  femal: '女',
                  man: '男',
                }}
              />
              <ProFormSelect
                label="开具药品"
                name="gender"
                rules={[{ required: true, message: '请选择药品' }]}
                valueEnum={{
                  femal: '女',
                  man: '男',
                }}
              />
              <ProFormText
                label="医嘱"
                name="age"
                placeholder="请填写医嘱"
              />
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="完成">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                formRef.current?.resetFields();
              }}
            >
              <StepDescriptions stepData={stepData} />
            </StepResult>
          </StepsForm.StepForm>
        </StepsForm>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};

export default StepForm;
