import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import SourceTable from "components/SourceTable";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  DatePicker,
  Radio,
  Modal,
  message,
} from 'antd';
import DispatchModal from './DispatchModal';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
// 过滤不能删除的记录
// const initList = data => {
//   const formatData = [];
//   for(const item of data) {
//     formatData.push({
//       ...item,
//       disabled: !!item.person,
//     })
//   }
//   return formatData;
// }


function showDeleteConfirm() {
  confirm({
    title: 'Are you sure delete this task?',
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

@connect(({ loading, source }) => ({
  allData: source.allData,
  loading: loading.models.source,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    visible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    deleteVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'source/fetchList',
    })
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'source/fetchList',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'source/fetchList',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'source/fetchList',
        payload: values,
      });
    });
  };

  handleAdd = () => {
    const { dispatch, match } = this.props;
    dispatch(routerRedux.push(`${match.url}/add`));
  }

  handleDelete = () => {

    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    const deleteList = selectedRows.map(item => item.source_id);
    message.success('删除成功')
    dispatch({
      type: 'source/fetchList',
      payload: {
        deleteList,
      },
    });
  }

  handleRadio = e => {
    const { dispatch } = this.props;
    const { target: { value }} = e;
    dispatch({
      type: 'source/fetchList',
    })
  }

  handleModalOk = () => {
    this.setState({
      visible: false,
    })
  }

  handleModalCancel = () => {
    this.setState({
      visible: false,
    })
  }

  handleDispatch = () => {
    this.setState({
      visible: true,
    })
  }

  
 showDeleteConfirm = () => {
  const deleteFun = this.handleDelete;
  confirm({
    title: '你确定删除这些资源吗?',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk: deleteFun,
    onCancel() {
      console.log('Cancel');
    },
  });
}

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="资源名称">
              {getFieldDecorator('source_name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone_num')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="资源名称">
              {getFieldDecorator('source_name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone_num')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="未来规划">
              {getFieldDecorator('source_planning')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">全部</Option>
                  <Option value="1">求学</Option>
                  <Option value="2">就业</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="来访渠道">
              {getFieldDecorator('source_channel')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">全部</Option>
                  <Option value="1">淘宝</Option>
                  <Option value="2">网站</Option>
                  <Option value="3">校园大使</Option>
                  <Option value="4">市场</Option>
                  <Option value="1">老带新</Option>
                </Select>
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
            <FormItem label="对接人">
              {getFieldDecorator('person')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={16} sm={24}>
            <FormItem label="起止日期">
              {getFieldDecorator('date')(<RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      allData,
      loading,
    } = this.props;
    const formatData = { ...allData };
    const multipleSelection = true;
    const { selectedRows, visible, deleteVisible } = this.state;
    return (
      <PageHeaderLayout title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <Fragment>
                  <Button type="primary" onClick={this.handleDispatch}><Icon type="solution" /> 分派</Button>
                  <Button type="danger" onClick={this.showDeleteConfirm}><Icon type="delete" /> 删除</Button>
  
                </Fragment>
              )}
              <div style={{ float: 'right' }}>
                <RadioGroup defaultValue="all" onChange={this.handleRadio}>
                  <RadioButton value="all">全部</RadioButton>
                  <RadioButton value="progress">未分派</RadioButton>
                  <RadioButton value="waiting">已分派</RadioButton>
                  <RadioButton value="signing">已签约</RadioButton>
                  <RadioButton value="delete">被退回</RadioButton>
                </RadioGroup>                
              </div>
            </div>

            <SourceTable
              selectedRows={selectedRows}
              loading={loading}
              data={formatData}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              multipleSelection={multipleSelection}
            />
          </div>
        </Card>
        <DispatchModal visible={visible} handleOk={this.handleModalOk} handleCancel={this.handleModalCancel} />
      </PageHeaderLayout>
    );
  }
}
