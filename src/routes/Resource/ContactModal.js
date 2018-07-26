import React from 'react'
import moment from 'moment';
import {
  Modal,
  Form,
  Button,
  Input,
  Row,
  Col,
  InputNumber,
  Select,
  DatePicker,
} from "antd"

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};


function DispatchModal({ handleOk, handleCancel, visible, form }) {
  const { getFieldDecorator } = form;
  const onOk = () => {
    form.validateFields((err, values) => {
      if(err) return;
      values.contractDate = values.contractDate.unix() * 1000;
      console.log('价值', values);
      handleOk(values);
    })
  }

  return (
    <Modal
      visible={visible}
      title="新增合同信息"
      onOk={onOk}
      onCancel={handleCancel}
      destroyOnClose={true}
      footer={[
        <Button key="back" onClick={handleCancel}>取消</Button>,
        <Button key="submit" type="primary" loading={false} onClick={onOk}>
          提交
        </Button>,
      ]}
    >
      <Form>
        <FormItem {...formItemLayout} label="合同类型">
          {getFieldDecorator('contractType', {
            rules: [{ required: true, message: '请填写合同类型' }],
          })(
            <Input placeholder="请填写合同类型" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="合同暗号">
          {getFieldDecorator('contractSignal', {
            rules: [{ required: true, message: '请填写合同暗号' }],
          })(
            <Input placeholder="请填写合同暗号" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="合同名称">
          {getFieldDecorator('contractName', {
            rules: [{ required: true, message: '请填写合同名称' }],
          })(<Input placeholder="预计签约金额" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="签约顾问">
          {getFieldDecorator('contractConsultant', {
            rules: [{ required: true, message: '请填写签约顾问' }],
          })(
            <Input placeholder="请输入签约顾问" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="合约金额">
          {getFieldDecorator('contractAmount', {
            rules: [{ required: true, message: '请填写合约金额' }],
          })(
            <Input placeholder="请输入签约金额" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="签约日期">
          {getFieldDecorator('contractDate', {
            rules: [{ required: true, message: '请选择签约日期' }],
          })(
            <DatePicker />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create({})(DispatchModal);