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
import Authorized from '../../utils/Authorized';
import { getAuthority, getUserInfo } from '../../utils/authority';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { confirm } = Modal;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

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
    radioType: 'noDispatch',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'source/fetchList',
    })
  }

  getDefaultValue = () => {
    switch(getAuthority()) {
      case 'seller': {
        this.setState({
          radioType: 'alreadyDispatch',
        })
        return 'alreadyDispatch';
      }
      default : {
        return 'noDispatch';
      }
    }
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
    this.setState({
      radioType: value,
    })
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
              {getFieldDecorator('sourceName')(<Input placeholder="请输入" />)}
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
              {getFieldDecorator('sourceName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone_num')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="未来规划">
              {getFieldDecorator('sourcePlanning')(
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
              {getFieldDecorator('sourceChannel')(
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
          {
            getAuthority() !== 'seller' ? (
              <Col md={8} sm={24}>
                <FormItem label="对接人">
                  {getFieldDecorator('person')(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
            ) : ''
          }
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

  renderRadio = () => (
    <div style={{ float: 'right' }}>
      <RadioGroup defaultValue={this.getDefaultValue()} onChange={this.handleRadio}>
        <Authorized authority={[ 'customer', 'supervisor']}>
          <RadioButton value="noDispatch">未分派</RadioButton>
        </Authorized>
        <Authorized authority={[ 'seller', 'supervisor']}>
          <RadioButton value="alreadyDispatch">已分派</RadioButton>
          <RadioButton value="alreadySign">已签约</RadioButton>
        </Authorized>
        <Authorized authority={['customer', 'supervisor']}>
          <RadioButton value="delete">被退回</RadioButton>
        </Authorized>
      </RadioGroup>                
    </div>
  )

  render() {
    const {
      allData,
      loading,
    } = this.props;
    const formatData = { ...allData };
    const multipleSelection = true;
    const { selectedRows, visible, radioType } = this.state;
    return (
      <PageHeaderLayout title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator} style={{overflow: 'hidden'}}>
              <Authorized authority={['customer', 'supervisor']}>
                <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>
                  新建
                </Button>
              </Authorized>
              {selectedRows.length > 0 && (
                <Fragment>
                  {
                    radioType === 'noDispatch' ? <Button type="primary" onClick={this.handleDispatch}><Icon type="solution" /> 分派</Button> : ''
                  }
                  <Button type="danger" onClick={this.showDeleteConfirm}><Icon type="delete" /> 删除</Button>
                </Fragment>
              )}
              {this.renderRadio()}
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
