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
  InputNumber,
  Modal,
} from 'antd'
import { connect } from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Styles from './TableList.less';

const FormItem = Form.Item;
const { Option }  = Select;
const permissionMap = ['', '客服人员', '销售人员', '销售主管'];
const columns = ({ editFun, deleteFun }) => ([
    { title: '员工编号', dataIndex: 'userId', key: 'userId' },
    { title: '员工姓名', dataIndex: 'userName', key: 'userName', align: 'center' },
    { title: '权限', dataIndex: 'userPermission', key: 'userPermission', align: 'center', render: val => permissionMap[val] },
    { title: '联系电话', dataIndex: 'userPhone', key: 'userPhone' },
    { title: '资源数', dataIndex: 'userProject_num', key: 'userProject_num',align: 'center' },
    { title: '团队内排名', dataIndex: 'userRank', key: 'userRank', align: 'center' },
    {
      title: '操作',
      dataIndex: 'userId',
      key: 'user_Id',
      render: (value, recods) => (
        <>
          <a onClick={() => editFun(recods)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确定删除这个员工吗？" okText="确定" cancelText="取消" onConfirm={() => deleteFun(value)}>
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ])

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
  loading: loading.models.employee,
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
      pagination: {
        current: 1,
        total: 10,
        pageSize: 10,
      },
    })
  }

  handleSearch = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    const { pagination } = this.state;
    
    form.validateFields((err, fieldValues) => {
      const { userName, userId } = fieldValues;
      dispatch({
        type: 'employee/fetchList',
        payload: {
          ...fieldValues,
          ...pagination,
          userName,
          userId,
        },
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
    const { addVisible } = this.state;
    this.setState({
      addVisible: !addVisible,
    })
  }

  handleAddOk = () => {
    const { form, dispatch, employeeData: { pagination} } = this.props;
    const { employeeData: { userId } } = this.state;

    form.validateFields((err, values) => {
      if(err) return;
      const formValues = values;
      if(userId) {
        formValues.userId = userId;
      }
      dispatch({
        type: 'employee/operate',
        payload: {
          formValues,
          searchValues: {
            ...pagination,
            userId,
            userName: values.userName,
          },
        },
      })
      this.setState({
        addVisible: false,
        employeeData: {},
      })
    })
  }

  handleAddCancel = () => {
    this.setState({
      addVisible: false,
      employeeData: {},
    })
  }

  handleDelete = userId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'employee/delete',
      payload: userId,
    })
  }

  handleTableChange = pagination => {
    this.setState({
      pagination,
    });
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
        destroyOnClose="true"
      >
        <Form>
          <FormItem label="员工姓名" {...formItemLayout}>
            {
              getFieldDecorator('userName', {
                rules: [{ required: true, message: '员工姓名' }],
                initialValue: data.userName,
              })(<Input placeholder="请输入员工姓名" />)
            }
          </FormItem>
          <FormItem label="员工权限" {...formItemLayout}>
            {
              getFieldDecorator('userPermission', {
                rules: [{ required: true, message: '请选择员工权限' }],
                initialValue: data.userPermission ? data.userPermission.toString() : '1',
              })(
                <Select placeholder="请选择员工权限">
                  <Option value="1">客服人员</Option>
                  <Option value="2">销售人员</Option>
                  <Option value="3">销售主管</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem label="联系电话" {...formItemLayout}>
            {
              getFieldDecorator('userPhone', {
                rules: [{ required: true, message: '请输入员工联系电话' }],
                initialValue: data.userPhone,
              })(<Input placeholder="请输入员工联系电话" />)
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }

  renderFormSearch = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={Styles.tableListForm}>
        <Form
          layout="inline"
        >
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col span={8}>
              <FormItem label="员工姓名">
                {getFieldDecorator('userName')(
                  <Input placeholder="请输入用户名称" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="员工编号">
                {getFieldDecorator('userId')(
                  <InputNumber style={{width: '100%'}} min={1} />
                )}
              </FormItem>
            </Col>
            <Col span="8">
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
    )
  }

  render() {
    const { employeeData, loading } = this.props;
    return (
      <PageHeaderLayout title="您的权限等级为： 销售主管">
        <Card>
          {this.renderFormSearch()}
          {this.renderAddModal()}
          <Button type="primary" onClick={this.handleAdd}><Icon type="user-add" />新增</Button>
          <Table
            loading={loading}
            style={{marginTop: 40}}
            columns={columns({ editFun: this.handleEdit, deleteFun: this.handleDelete })}
            dataSource={employeeData.list}
            pagination={employeeData.pagination}
            onChange={this.handleTableChange}
          />
        </Card>
      </PageHeaderLayout>
    )
  }
}
