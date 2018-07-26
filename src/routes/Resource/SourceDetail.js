import React, { PureComponent } from 'react';
import { connect } from 'dva'
import moment from 'moment'
import {
  Card,
  Form,
  Input,
  Select,
  Table,
  Button,
  Modal,
  message,
  Divider,
  Popconfirm,
  Badge,
  AutoComplete,
} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ContractModal from './ContactModal';
import RecordModal from './RecordModal';
import Authorized from '../../utils/Authorized';
import { getAuthority, getUserInfo } from '../../utils/authority';

const { confirm } = Modal;
const { Option } = Select;
const { Description } = DescriptionList;

// 面包屑信息
const breadcrumbList = [{
  title: '首页',
  href: '/',
}, {
  title: '资源管理',
  href: '/resource',
}, {
  title: '详细信息',
}];


function showConfirm({ title, onOk, onCancel, content, okType = 'primary' }) {
  confirm({
    title,
    content,
    onOk,
    okText: '确定',
    cancelText: '取消',
    okType,
    onCancel,
  });
}

// 页面头部操作
const action = ({handleEdit, isEdit, handleReset, handleSign, sourceType, handleRetreat }) => {
  return (
    <div>
      <Button type="primary" onClick={handleEdit}>{isEdit ? '保存' : '编辑'}</Button>
      {isEdit ? <Button onClick={handleReset}>重置</Button> :''}
      <Authorized authority={['seller', 'supervisor']}>
        {/* {
          sourceType == '3' ? (
            <Button disabled={true}>已签约</Button>
          ): (
            <Button onClick={showConfirm.bind(null, {title: '确定签约吗？', onOk: handleSign })}>签约</Button>
          )
        } */}
        <Button
          type="danger"
          disabled={sourceType == '4' || sourceType == '3'}
          onClick={showConfirm.bind(null, {
            title: '确定退回这个资源吗？',
            content: '这个资源将放回未分配中，所有有关此资源的联系信息将被清除！',
            okType: 'danger',
            onOk: handleRetreat,
          })}
        >{sourceType == '4' ? '已退回' : sourceType == '3' ? '已签约' : '退回'}
        </Button>
      </Authorized>
    </div>
  );
}

const status = ['全部', '长线用户', '深度用户', '潜在用户', '强烈意向', '联系不到']
const statusMap = ['', 'success', 'processing', 'warning', 'error', 'default' ];
const channel = ['', '淘宝', '网站', '校园大使', '市场', '老带薪']
const contractMap = ['', '微信', '电话', 'QQ', '上门', '邮箱', '无'];


const columns = (editFun, deleteFun) => {
  const columns =  [{
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: val => moment(val).format('YYYY-MM-DD'),
  }, {
    title: '联系类型',
    dataIndex: 'recordType',
    key: 'recordType',
    align: 'center',
    render: val => contractMap[val],
  }, {
    title: '资源状态',
    dataIndex: 'status',
    key: 'status',
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },
  
  }, {
    title: '联系内容',
    dataIndex: 'recordContent',
    key: 'recordContent',
  }, {
    title: '对接人',
    dataIndex: 'person',
    key: 'person',
  }, {
    title: '预计签约金额',
    dataIndex: 'recordPrice',
    key: 'recordPrice',
    align: 'center',
    render: val => {
      return `￥ ${val}`
    },
  }, {
    title: '预计签约时间',
    dataIndex: 'recordTime',
    key: 'recordTime',
    render: val => moment(val).format('YYYY-MM-DD'),
  }]

  
  if(getAuthority() !== 'customer' ) {
    columns.push({
      title: '操作',
      dataIndex: 'recordId',
      key: 'id',
      align: 'center',
      render: (val, record) => (
        <>
          <a onClick={() => editFun(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确定删除本条联系记录吗？" okText="是" cancelText="否" onConfirm={() => deleteFun(val)}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    })
  }


  return columns;
};



  
// 联系列表
const RecordList = ({ datasource: data = [], editFun, loading, deleteFun }) => (
  <Table dataSource={data} columns={columns(editFun, deleteFun)} loading={loading} />
)

// 签约信息
const ContractData = ({ data = [] }) => (
  <>
    {
      data.map(item => (
        <>
          <DescriptionList size="large">
            <Description term="合同类型">
              {item.contractType}
            </Description>
            <Description term="合同名称">
              {item.contractName}
            </Description>
            <Description term="合同暗号">
              {item.contractSignal}
            </Description>
            <Description term="签约顾问">
              {item.contractConsultant}
            </Description>
            <Description term="合同金额">
              {`￥ ${item.contractAmount}`}
            </Description>
            <Description term="签约日期">
              {moment(item.contractDate).format('YYYY-MM-DD')}
            </Description>
            <Divider />
          </DescriptionList>
        </>
      ))
    }
  </>
)


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



@connect(({ source, loading }) => ({
  detail: source.detail.detail,
  sign: source.detail.sign,
  contract: source.detail.contract,
  contactData: source.contract.list,
  loading: loading.models.rule,
  loadingData: loading.effects['source/getDetail'],
  loadingEdit: loading.effects['source/editDetail'],
  loadingRecord: loading.effects['source/editRecord', 'source/deleteRecord', 'source/addRecord'],
}))
@Form.create()
export default class NewSource extends PureComponent {

  state = {
    isEdit: false,
    recordModal: false,
    recordFormData: {},
    contractModal: false,
    dataSource: [],
  }

  

  componentDidMount() {
    const { dispatch, match } = this.props;

    dispatch({
      type: 'source/getDetail',
      payload: {
        source_id: match.params.id,
      },
    })
    dispatch({
      type: 'source/fetchContract',
    })
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  }

  confirmOk = () => {

    this.setState({
      isEdit: !this.state.isEdit,
    })
    const { form, dispatch } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((error, values) => {
      if(!error) {
        dispatch({
          type: 'source/editDetail',
          payload: values,
        })
        message.success('保存成功')
      } else {
        message.error('保存失败')
      }
    })

  }

  handleEdit = () => {
    const onOk = this.confirmOk;
    if(this.state.isEdit) {
      // 保存按钮
      showConfirm({
        title: '确定保存吗？', 
        onOk,
        onCancel() {
        },
      })
    } else {
      // 编辑按钮
      this.setState({
        isEdit: !this.state.isEdit,
      })
    }
  }

  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
  }

  handleEditContract = (values) => {-
    this.setState({
      recordModal: true,
      recordFormData: values,
    })
  }

  handleAddContract = () => {
    this.setState({
      recordModal: !this.state.recordModal,
    })
  }

  handlerecordModalOk = values => {
    const { dispatch } = this.props;
    const { recordFormData } = this.state;
    values = { ...recordFormData, ...values };

    console.log('数据', values);
    this.setState({
      recordModal: false,
      recordFormData: {},
    })
    if(values.recordId) {
      dispatch({
        type: 'source/editRecord',
        payload: values,
      })
    } else {
      dispatch({
        type: 'source/addRecord',
        payload: values,
      })
    }
  }

  handlerecordModalCancel = () => {
    this.setState({
      recordModal: false,
      recordFormData: {},
    })
  }

  handleContractModal = () => {
    this.setState({
      contractModal: true,
    })
  }

  handleContractModalOk = values => {
    const { dispatch } = this.props;
    this.setState({
      contractModal: false,
    })
    dispatch({
      type: 'source/addContract',
      payload: values,
    })
  }

  handleCOntractModalCancel = () => {
    this.setState({
      contractModal: false
    })
  }

  handleChange = (value) => {
    this.setState({
      dataSource: !value || value.indexOf('@') >= 0 ? [] : [
        `${value}@gmail.com`,
        `${value}@163.com`,
        `${value}@qq.com`,
      ],
    });
  }

  // 签约
  handleSign = () => {
    const { detail, dispatch } = this.props;
    dispatch({
      type: 'source/signSource',
      payload: detail.ourceId,
    })
  }

  handleRetreat = () => {
    const { detail, dispatch } = this.props;
    dispatch({
      type: 'source/retreatSource',
      payload: detail.ourceId,
    })
  }

  handleRecordModal = () => {
    this.setState({
      recordModal: true,
    })
  }

  handleDeleteRecord = recordId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'source/deleteRecord',
      payload: recordId,
    });
  }

  renderBasic = ({ data = {} }) => {
    const { form } = this.props;
    const { isEdit } = this.state;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <DescriptionList size="large" >
          <Description term="资源名称">
            {isEdit ? getFieldDecorator('sourceName', {
                rules: [{ required: true, message: '请选择用户是否回国' }],
                initialValue: data.sourceName,
                
            })(<Input placeholder="请输入用户名称" />) : data.sourceName}
          </Description>
          <Description term="是否回国">
            {isEdit ? getFieldDecorator('sourceComeBack', {
              rules: [{ required: true, message: '请选择用户是否回国' }],
              initialValue: data.sourceComeBack,
            })(
              <Select
                placeholder="请选择用户是否回国"
              >
                <Option value="1">是</Option>
                <Option value="2">否</Option>
              </Select>
            ) : Number(data.sourceComeBack) === 1 ? '是' : '否'}
          </Description>
          <Description term="未来规划">
            {isEdit ? getFieldDecorator('sourcePlanning', {
              rules: [{ required: true, message: '请选择用户未来规划' }],
              initialValue: data.sourcePlanning,
            })(
              <Select
                placeholder="请选择用户未来规划"
              >
                <Option value="1">求学</Option>
                <Option value="2">就业</Option>
              </Select>
            ) : data.sourcePlanning}
          </Description>
          <Description term="来访渠道">
            {isEdit ? getFieldDecorator('sourceChannel',{
              rules: [{ required: true, message: '请选择来访渠道' }],
              initialValue: data.sourceChannel.toString(),
            })(
              <Select
                placeholder="请选择用户来访渠道"
              >
                <Option value="1">淘宝</Option>
                <Option value="2">网站</Option>
                <Option value="3">校园大使</Option>
                <Option value="4">市场</Option>
                <Option value="5">老带新</Option>
              </Select>
            ):channel[data.sourceChannel]}
          </Description>
          <Description term="就读院校">
            {isEdit ? getFieldDecorator('sourceSchool', {
              rules: [{ required: true, message: '请填写就读院校' }],
              initialValue: data.sourceSchool,
            })(
              <Input placeholder="请填写就读院校" />
            ):data.sourceSchool}
          </Description>
          <Description term="就读专业">
            {isEdit ?  getFieldDecorator('sourceProfession', {
              rules: [{ required: true, message: '请填写就读专业' }],
              initialValue: data.sourceProfession,
            })(
              <Input placeholder="请填写就读专业" />
            ) : data.sourceProfession}
          </Description>
          <Description term="就读年级">
            {isEdit ? getFieldDecorator('sourceGrade', {
              rules: [{ required: true, message: '请选择就读年级' }],
              initialValue: data.sourceGrade,
            })(
              <Select
                placeholder="请选择就读年级"
              >
                <Option value="2016">2016</Option>
                <Option value="2017">2017</Option>
              </Select>
            ) :data.sourceGrade}
          </Description>
          <Description term="联系电话">
            {isEdit ? getFieldDecorator('sourcePhone',{
              rules: [{ required: true, message: '请输入用户电话' }],
              initialValue: data.sourcePhone,
            })(
              <Input placeholder="请输入用户电话" />
            ) : data.sourcePhone}
          </Description>
          <Description term="QQ">
            {isEdit ? getFieldDecorator('sourceQq', {
              rules: [{ required: true, message: '请输入QQ号码' }],
              initialValue: data.sourceQq,
            })(
              <Input placeholder="请输入QQ号码" />
            ) : <a href={`tencent://message/?Menu=yes&uin=${data.sourceQq}`} target="_blank">
                  {data.sourceQq}
                </a>
            }
          </Description>
          <Description term="微信">
            {isEdit ? getFieldDecorator('sourceWx', {
              rules: [{ required: true, message: '请输入微信号码' }],
              initialValue: data.sourceWx,
            })(
              <Input placeholder="请输入微信号码" />
            ) : data.sourceWx}
          </Description>
        </DescriptionList>
      </Form>
    )
  }

  renderSign = ({ data = {}}) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    let { isEdit, dataSource } = this.state;
    // 权限拦截
    if(getAuthority() === 'customer') isEdit = false;
    
    return (
      <Form>
        <DescriptionList size="large">
          <Description term="签约人名称">
            {isEdit ? getFieldDecorator('signName', {
              rules: [{ required: true, message: '请输入微信号码' }],
              initialValue: data.signName,
            })(
              <Input placeholder="签约人名称" />  
            ):data.signName}
          </Description>
          <Description term="签约人手机">
            {isEdit ?getFieldDecorator('signPhone', {
              rules: [{ required: true, message: '请输入签约人手机号码？' }],
              initialValue: data.signPhone,              
            })(
              <Input placeholder="签约人手机" />
            ) : data.signPhone}
          </Description>
          <Description term="证件类型">
            {isEdit ? getFieldDecorator('signType', {
               rules: [{ required: true, message: '请输入签约人手机号码？' }],
               initialValue: data.signType.toString(),               
            })(
              <Select>
                <Option value="1">身份证</Option>
                <Option value="2">其他证件</Option>
              </Select>
            ) :data.signType}
          </Description>
          <Description term="签约人证件号码">
            {isEdit ? getFieldDecorator('signTypeNum', {
              rules: [{ required: true, message: '请输入签约人证件号码' }],
              initialValue: data.signType,     
            })(
              <Input placeholder="请输入签约人证件号码？" />
            ): data.signTypeNum}
          </Description>
          <Description term="签约人邮箱">
            {isEdit ? getFieldDecorator('signEmail', {
                rules: [{ required: true, message: '请输入签约人邮箱' }],
                initialValue: data.signEmail,
              })(
                <AutoComplete
                  dataSource={dataSource}
                  onChange={this.handleChange}
                  placeholder="请输入签约人邮箱"
                />
              ): <a href={`mailto:${data.signEmail}`}>{data.signEmail}</a>}
          </Description>
          <Description term="签约人地址">
            {isEdit ? getFieldDecorator('signAddress', {
                rules: [{ required: true, message: '请输入签约人地址' }],
                initialValue: data.signAddress,     
              })(
                <Input placeholder="请输入签约人地址" />
              ): data.signAddress}

          </Description>
        </DescriptionList>
      </Form>
  )}

  render() {
    const { form, detail, sign, contract, loadingData, contactData, loadingEdit, loadingRecord } = this.props;
    const { isEdit, recordFormData } = this.state;
    const { recordModal, contractModal } = this.state;
    console.log(contract);
    return (
      <PageHeaderLayout
        title="详细信息"
        breadcrumbList={breadcrumbList}
        action={action({
          handleEdit: this.handleEdit,
          isEdit,
          handleReset: this.handleReset,
          handleSign: this.handleSign,
          sourceType: detail.type,
          handleRetreat: this.handleRetreat,
        })}
        loading={loadingData}
      >
        <Card title="基本信息" loading={loadingData || loadingEdit}>
          <this.renderBasic data={detail} />
        </Card>
        <Card
          title="签约信息"
          style={{marginTop: 20}}
          loading={loadingData || loadingEdit}
          // extra={<a onClick={showConfirm.bind(null, {title: '确定签约吗？'})}>签约</a>}
        >
          <this.renderSign data={sign} />
        </Card>
        <Card
          title="合同信息"
          style={{marginTop: 20}}
          loading={loadingData}
          extra={(
            <Authorized authority={['seller', 'supervisor']}>
              <a onClick={this.handleContractModal}>新建合同信息</a>
            </Authorized>
          )}
        >
          <ContractData data={contract} />
        </Card>
        <Card
          title="联系记录"
          style={{marginTop: 20}}
          loading={loadingData}
          extra={(
            <Authorized authority={['seller', 'supervisor']}>
              <a onClick={this.handleRecordModal}>新增联系记录</a>
            </Authorized>
          )}
        >
          <RecordList loading={loadingRecord} datasource={contactData} editFun={this.handleEditContract} deleteFun={this.handleDeleteRecord} />
          <ContractModal  visible={contractModal} handleOk={this.handleContractModalOk} handleCancel={this.handleCOntractModalCancel} />
          <RecordModal data={recordFormData} visible={recordModal} handleOk={this.handlerecordModalOk} handleCancel={this.handlerecordModalCancel} />
        </Card>
      </PageHeaderLayout>
    )
  }
}
