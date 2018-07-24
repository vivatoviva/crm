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
  Divider,
  Popconfirm,
  Modal,
} from 'antd'
import { connect } from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Styles from './TableList.less';

const FormItem = Form.Item;
const { Option }  = Select;
const permissionMap = ['', '客服人员', '销售人员', '销售主管'];

const columns = ({ editFun, deleteFun }) => {
  return [
    { title: '员工编号', dataIndex: 'employee_id', key: 'employee_id' },
    { title: '员工姓名', dataIndex: 'employee_name', key: 'employee_name', align: 'center' },
    { title: '权限', dataIndex: 'employee_permission', key: 'employee_permission', align: 'center', render: val => permissionMap[val] },
    { title: '联系电话', dataIndex: 'employee_phone', key: 'employee_phone' },
    { title: '项目数', dataIndex: 'employee_project_num', key: 'employee_project_num',align: 'center' },
    { title: '团队内排名', dataIndex: 'employee_rank', key: 'employee_rank', align: 'center' },
    {
      title: '操作',
      key: 'operation',
      render: (value, recods) => (
        <>
          <a onClick={() => editFun(recods)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确定删除这个员工吗？" okText="确定" cancelText="取消">
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ]
}


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

@connect(({ employee, loading }) => ({
  loading: loading.effects['employee/fetchList'],
  employeeData: employee.data,
}))
@Form.create()
export default class TableList extends PureComponent {
  

  state = {
    addVisible: false,
    employeeData: {},
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'employee/fetchList',
    })
  }


  handleEdit = values => {
    this.setState({
      employeeData: values,
      addVisible: true,
    })
  }

  handleSearch = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, fieldValues) => {
      if(err) return;
      dispatch({
        type: 'employee/fetchList',
      })
    })
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;

    form.resetFields();
    dispatch({
      type: 'employee/fetchList',
    })
  }
  
  handleAdd = () => {
    this.setState({
      addVisible: !this.state.addVisible,
    })
  }

  handleAddOk = () => {
    this.setState({
      addVisible: false,
      employeeData: {},
    })
  }

  handleAddCancel = () => {
    this.setState({
      addVisible: false,
      employData: {},
    })
  }

  renderAddModal = () => {
    const { addVisible, employeeData: data } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form; 
    return (
      <Modal
        title="新增员工"
        visible={addVisible}
        onOk={this.handleAddOk}
        onCancel={this.handleAddCancel}
        destroyOnClose={true}
      >
        <Form>
          <FormItem label="员工姓名" {...formItemLayout}>
            {
              getFieldDecorator('employee_name', {
                initialValue: data.employee_name,
              })(
                <Input placeholder="员工姓名" />
              )
            }
          </FormItem>

          <FormItem label="员工权限" {...formItemLayout}>
            {
              getFieldDecorator('employee_permission', {
                initialValue: data.employee_permission,
              })(
                <Select>
                  <Option value="1">客服人员</Option>
                  <Option value="2">销售人员</Option>
                  <Option value="3">销售主管</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem label="联系电话" {...formItemLayout}>
            {
              getFieldDecorator('employee_phone', {
                initialValue: data.employee_phone,
              })(
                <Input placeholder="联系电话" />
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }

  render() {
    const { form, employeeData, loading } = this.props;
    const { getFieldDecorator } = form;
    return (
      <PageHeaderLayout title="您的权限等级为： 销售主管">
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
                    onClick={this.handleSearch}
                  >
                    查询
                  </Button>
                  <Button onClick={this.handleFormReset}>重置</Button>
                </Col>
              </Row>
            </Form>
          </div>
          <Button type="primary" onClick={this.handleAdd}><Icon type="user-add" />新增</Button>
          <this.renderAddModal />
          <Table
            loading={loading}
            style={{marginTop: 40}}
            columns={columns({ editFun: this.handleEdit })}
            dataSource={employeeData.list}
          />
        </Card>
      </PageHeaderLayout>
    )
  }
}
