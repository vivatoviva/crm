import React, { PureComponent } from 'react'
import {
  Modal,
  Form,
  Button,
  Input,
  Row,
  Col,
  InputNumber,
} from "antd"


const FormItem = Form.Item;


function DispatchModal({ handleOk, handleCancel, visible, form }) {
  
  
  const getEmployeeName = id => {
    return 'genluo'
  }
  const handleInputChange = value => {
    const name = getEmployeeName(value);
    form.setFieldsValue({source_name: name});
    
  }
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={visible}
      title="分派资源"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>取消</Button>,
        <Button key="submit" type="primary" loading={false} onClick={handleOk}>
          提交
        </Button>,
      ]}
    >
      <Form layout="inline">
        <Row gutter={10}>
          <Col md={12} sm={24}>
            <FormItem label="员工编号">
              {getFieldDecorator('source_id')(
                <InputNumber min={1} onChange={handleInputChange} />
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>          
            <FormItem>
              {getFieldDecorator('source_name')(<Input disabled />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default Form.create({})(DispatchModal);