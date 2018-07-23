import React, { PureComponent } from "react";
import {
  Form,
  Select,
  Card,
  Row,
  Col,
  Input,
  Button,
  Table,
  Icon,
} from 'antd'
import { connect } from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Styles from './TableList.less';

const FormItem = Form.Item;
const { Option }  = Select;

const columns = [
  { title: '员工编号', dataIndex: 'name', key: 'name' },
  { title: '员工姓名', dataIndex: 'age', key: 'age' },
  { title: '权限', dataIndex: 'address', key: 'source_num' },
  { title: '联系电话', dataIndex: 'address', key: 'person' },
  { title: '项目数', dataIndex: 'address', key: 'sechold_day' },
  { title: '团队排名', dataIndex: 'address', key: '4' },
  {
    title: '操作',
    key: 'operation',
    render: () => <a href="#">删除</a>,
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
      <PageHeaderLayout title="您的权限等级为： 销售人员">
        <Card>
          <div className={Styles.tableListForm}>
            <Form
              layout="inline"
            >
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="员工姓名">
                    {getFieldDecorator('source_name')(
                      <Input placeholder="请输入用户名称" />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="员工编号">
                    {getFieldDecorator('status')(
                      <Select placeholder="请选择" style={{ width: '100%' }}>
                        <Option value="0">全部</Option>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md="8" sm="24">
                  <Button
                    type="primary"
                    style={{marginRight: 20}}
                  >
                    查询
                  </Button>
                  <Button>重置</Button>
                </Col>
              </Row>
            </Form>
          </div>
          <Button type="primary"><Icon type="user-add" />新增</Button>
          <Table
            style={{marginTop: 40}}
            columns={columns}
            dataSource={data}
          />
        </Card>
      </PageHeaderLayout>
    )
  }
}
