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

function DispatchModal({ handleOk, handleCancel, visible, form, data }) {
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={visible}
      title="新建联系记录"
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
      footer={[
        <Button key="back" onClick={handleCancel}>取消</Button>,
        <Button key="submit" type="primary" loading={false} onClick={handleOk}>
          提交
        </Button>,
      ]}
    >
      <Form>
            <FormItem {...formItemLayout} label="资源状态">
              {getFieldDecorator('status', {
                initialValue: data.status ? data.status.toString() : '',
              })(
                <Select placeholder="请选择资源状态">
                  <Option value="1">长线用户</Option>
                  <Option value="2">深度用户</Option>
                  <Option value="3">潜在用户</Option>
                  <Option value="4">强烈意向</Option>
                  <Option value="5">联系不到</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="联系类型">
              {getFieldDecorator('contract_type', {
                initialValue: data.contract_type ? data.contract_type.toString() : null,
              })(
              <Select placeholder="请选择联系类型">
                <Option value="1">微信</Option>
                <Option value="2">电话</Option>
                <Option value="3">QQ</Option>
                <Option value="4">上门</Option>
                <Option value="5">邮箱</Option>
                <Option value="6">无</Option>
              </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="预计签约金额">
              {getFieldDecorator('contract_price', {
                initialValue: data.contract_price ? data.contract_price.toString() : null,
              })(<Input placeholder="预计签约金额" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="预计签约时间">
              {getFieldDecorator('create_time', {
                // initialValue: data.create_time ? data.create_time : null,
              })(
                <DatePicker />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="联系内容">
              {getFieldDecorator('contract_content', {
                initialValue: data.contract_content ? data.contract_content : null,
              })(
                <TextArea placeholder="请输入联系内容" autosize={{ minRows: 2, maxRows: 6 }} />
              )}
            </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create({})(DispatchModal);