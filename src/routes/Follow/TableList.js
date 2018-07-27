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
  Badge,
} from 'antd'
import { connect } from 'dva'
import { Link } from "dva/router"
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Styles from './TableList.less';

const FormItem = Form.Item;
const { Option }  = Select;
const { RangePicker } = DatePicker;
const status = ['全部', '长线用户', '深度用户', '潜在用户', '强烈意向', '联系不到']
const statusMap = ['', 'success', 'processing', 'warning', 'error', 'default' ];
const columns = [
  { title: '资源名称', width: 100, dataIndex: 'sourceName', key: 'sourceName', fixed: 'left' },
  { title: '资源状态',
    width: 150,
    dataIndex: 'status',
    key: 'status',
    fixed: 'left',
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },
  },
  { title: '联系电话', width: 180, dataIndex: 'sourceNum', key: 'sourceNum', fixed: 'left' },
  { title: '对接人', width: 100, dataIndex: 'person', key: 'person', fixed: 'left' },
  { title: '未跟进天数', width: 150, dataIndex: 'secholdDay', key: 'secholdDay', fixed: 'left', align: 'center' },
  { title: '最后一次联系',
    minWidth: 2000,
    dataIndex: 'contractContent',
    key: '4',
  },
  { title: '倒数第二次联系',
    minWidth: 150,
    dataIndex: 'contractContent',
    key: '5',
  },
  { title: '倒数第三次联系',
    minWidth: 150,
    dataIndex: 'contractContent',
    key: '6',
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: val => <Link to={`/resource/detail/${val}`}>详情</Link>,
  },
];



@connect(({ loading, source }) => ({
  followData: source.followData,
  loading: loading.effects['source/fetchFollowData'],
}))
@Form.create()
export default class TableList extends PureComponent {
  
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'source/fetchFollowData',
    })
  }

  handleSearch = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;

    form.validateFields((err, fieldsValue) => {
      if(err) return;
      dispatch({
        type: 'source/fetchFollowData',
        payload: fieldsValue,
      })
    })
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'source/fetchFollowData',
    })
  }

  renderSearchForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={Styles.tableListForm}>
        <Form layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="资源名称">
                {getFieldDecorator('sourceName')(
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
              <Button type="primary" style={{marginRight: 20}} onClick={this.handleSearch}>查询</Button>
              <Button onClick={this.handleFormReset}>重置</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }

  render() {
    const {  followData: { list, pagination }, loading } = this.props;

    return (
      <PageHeaderLayout title="资源跟进记录">
        <Card>
          {this.renderSearchForm()}
          <Table
            style={{marginTop: 40}}
            columns={columns}
            dataSource={list}
            scroll={{ x:1800 }}
            loading={loading}
            pagination={pagination}
          />
        </Card>
      </PageHeaderLayout>
    )
  }
}
