import React, { PureComponent } from "react";
import {
  Form,
  Select,
  Card,
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Table,
  Icon,
} from 'antd'
import { connect } from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Styles from './TableList.less';

const FormItem = Form.Item;
const { Option }  = Select;
const { RangePicker } = DatePicker;


const columns = [
  { title: '资源名称', width: 150, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '资源状态', width: 150, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '联系方式', windth: 100, dataIndex: 'address', key: 'source_num', fixed: 'left' },
  { title: '对接人', width: 100, dataIndex: 'address', key: 'person', fixed: 'left' },
  { title: '未跟进天数', width: 150, dataIndex: 'address', key: 'sechold_day', fixed: 'left' },
  { title: '最后一次联系', dataIndex: 'address', key: '4' },
  { title: '倒数第二次联系', dataIndex: 'address', key: '5' },
  { title: '倒数第三次联系', dataIndex: 'address', key: '6' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="javascript:;">详情</a>,
  },
];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 40,
  address: 'London Park',
}];


@connect(() => {

}) 
@Form.create()
export default class TableList extends PureComponent {
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <PageHeaderLayout title="资源跟进记录">
        <Card>
          <div className={Styles.tableListForm}>
          <Form
            layout="inline"
          >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <FormItem label="资源名称">
                  {getFieldDecorator('source_name')(
                    <Input placeholder="请输入用户名称" />
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="资源状态">
                  {getFieldDecorator('status')(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="0">全部</Option>
                      <Option value="1">长线用户</Option>
                      <Option value="2">深度用户</Option>
                      <Option value="3">潜在用户</Option>
                      <Option value="4">强烈意向</Option>
                      <Option value="5">联系不到</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="未跟进天数">
                  {getFieldDecorator('schedule_day')(
                    <Select placeholder="请选择未跟进天数">
                      <Option value="">全部</Option>
                      <Option value="0">0</Option>
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                      <Option value="5">5</Option>
                    </Select>
                  )}
                </FormItem>        
              </Col>
              <Col span="16">
                <FormItem label="起止日期">
                  {getFieldDecorator('date')(<RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <Button type="primary" style={{marginRight: 20}}>查询</Button>
                <Button>重置</Button>
              </Col>
            </Row>
          </Form>
          </div>
          <Table
            style={{marginTop: 40}}
            columns={columns}
            dataSource={data}
            scroll={{ x:650 }} 
          />
        </Card>
      </PageHeaderLayout>
    )
  }
}
