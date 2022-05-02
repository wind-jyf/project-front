import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Card, Result, Button, Descriptions, Divider, Form, Statistic, Select } from 'antd';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormDigit, ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-form';
import type { StepDataType } from './data';
import { getDepartMentList, getDiseaseList, getMedicineList, addWorkbench } from '../service';
import styles from './style.less';

const { Option } = Select;

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
  const [step1Data, setStep1Data] = useState<any>();
  const [step2Data, setStep2Data] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [departMentOptions, setDepartMentOptions] = useState<any[]>([]);
  const [medicineOptions, setMedicineOptions] = useState<any[]>([]);
  const [diseaseOptions, setDiseaseOptions] = useState<any[]>([]);
  const formRef = useRef<FormInstance>();
  const searchDepartMentList = async () => {
    const { data = [] } = await getDepartMentList({});
    setDepartMentOptions(data.map((item: any) => {
      return {
        value: item.department_code,
        text: item.department_name
      }
    }))
  }

  const searchMedicineList = async () => {
    const { data = [] } = await getMedicineList({});
    setMedicineOptions(data.map((item: any) => {
      return {
        value: item.medicine_code,
        text: item.medicine_name
      }
    }))
  }

  const searchDiseaseList = async () => {
    const { data = [] } = await getDiseaseList({});
    setDiseaseOptions(data.map((item: any) => {
      return {
        value: item.disease_code,
        text: item.disease_name
      }
    }))
  }

  const breadCrumb: BreadcrumbProps = {
    routes: [{
      breadcrumbName: '医生工作台',
      path: 'workbench'
    }, {
      breadcrumbName: '新增病历',
      path: '/workbench/add'
    }]
  }

  const DepartMentOptions = departMentOptions.map(d => <Option key={d.value}>{d.text}</Option>);
  const MedicineOptions = medicineOptions.map(d => <Option key={d.value}>{d.text}</Option>);
  const DiseaseOptions = diseaseOptions.map(d => <Option key={d.value}>{d.text}</Option>);
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
            initialValues={step1Data}
            onFinish={async (values) => {
              console.log(values);
              setStep1Data(values);
              return true;
            }}
          >
            <ProFormText
              label="姓名"
              name="patient_name"
              rules={[
                { required: true, message: '请填写姓名' },
              ]}
              placeholder="请填写姓名"
            />
            <ProFormText
              label="年龄"
              name="patient_age"
              rules={[
                { required: true, message: '请填写年龄' },
              ]}
              placeholder="请填写年龄"
            />
            <ProFormSelect
              label="性别"
              name="patient_gender"
              rules={[{ required: true, message: '请选择性别' }]}
              valueEnum={{
                femal: '女',
                man: '男',
              }}
            />
            <ProFormText
              label="职业"
              name="patient_job"
              rules={[
                { required: true, message: '请填写职业' },
              ]}
              placeholder="请填写职业"
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm title="填写病历信息"
            formRef={formRef}
            initialValues={step2Data}
            onFinish={async (values) => {
              setStep2Data(values);
              await addWorkbench({
                ...step1Data,
                ...values
              })
              return true;
            }}
          >
            <div className={styles.result}>
              <ProFormText
                label="主诉"
                name="main_suit"
                rules={[
                  { required: true, message: '请填写主诉' },
                ]}
                placeholder="请填写主诉"
              />
              <ProFormText
                label="病人症状"
                name="main_symptom"
                rules={[
                  { required: true, message: '请填写病人症状' },
                ]}
                placeholder="请填写病人症状"
              />
              <Form.Item
                style={{ width: '330px' }}
                name="patient_ref_department"
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
                  {DepartMentOptions}
                </Select>
              </Form.Item>
              <Form.Item
                style={{ width: '330px' }}
                name="patient_ref_medicine"
                label="开具药品"
                rules={[
                  {
                    required: true,
                    message: '请选择药品',
                  },
                ]}
              >
                <Select
                  showSearch
                  onSearch={searchMedicineList}
                >
                  {MedicineOptions}
                </Select>
              </Form.Item>
              <Form.Item
                style={{ width: '330px' }}
                name="patient_ref_disease"
                label="诊断疾病"
                rules={[
                  {
                    required: true,
                    message: '请选择诊断疾病',
                  },
                ]}
              >
                <Select
                  showSearch
                  onSearch={searchDiseaseList}
                >
                  {DiseaseOptions}
                </Select>
              </Form.Item>
              <ProFormText
                label="医嘱"
                name="medical_advice"
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
              <StepDescriptions stepData={step1Data} />
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
