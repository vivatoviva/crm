import React, { PureComponent } from 'react';
import { connect } from 'dva'
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Table,
  Button,
  Modal,
} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';


const confirm = Modal.confirm;
const { Option } = Select;
const { Description } = DescriptionList;
const FormItem = Form.Item;

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
    okText: '确定',
    cancelText: '取消',
    okType,
    onCancel,
  });
}

// 页面头部操作
const action = ({handleEdit, isEdit, handleReset }) => {
  return (
    <div>
      <Button type="primary" onClick={handleEdit}>{isEdit ? '保存' : '编辑'}</Button>
      {isEdit ? <Button onClick={handleReset}>重置</Button> :''}
      <Button onClick={showConfirm.bind(null, {title: '确定签约吗？'})}>签约</Button>
      <Button
        type="danger"
        onClick={showConfirm.bind(null, {
          title: '确定退回这个资源吗？',
          content: '这个资源将放回未分配中，所有有关此资源的联系信息将被清除！',
          okType: 'danger',
        })}
      >退回
      </Button>
    </div>
  );
}

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '操作',
  dataIndex: 'action',
  key: 'id',
  render: () => (
    <a href="">编辑</a>
  ),
}, {
  title: '创建时间',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '联系类型',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '联系内容',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '对接人',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '预计签约金额',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '预计签约时间',
  dataIndex: 'address',
  key: 'address',
}];


const status = ['全部', '长线用户', '深度用户', '潜在用户', '强烈意向', '联系不到']
const channel = ['', '淘宝', '网站', '校园大使', '市场', '老带薪']

  
// 合约列表
const RecordList = () => (
  <Table dataSource={dataSource} columns={columns} />
)

// 签约信息
const ContractData = ({ data = {}}) => (
  <DescriptionList size="large">
    <Description term="合同类型">
      {data.contract_type}
    </Description>
    <Description term="合同暗号">
      {data.contract_signal}
    </Description>
    <Description term="合同名称">
      {data.contract_name}
    </Description>
    <Description term="签约顾问">
      {data.contract_consultant}
    </Description>
    <Description term="合同金额">
      {`￥ ${data.contract_amount}`}
    </Description>
    <Description term="签约日期">
      {data.contract_date}
    </Description>
  </DescriptionList>
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
  loading: loading.models.rule,
  loadingData: loading.effects['source/getDetail'],
}))
@Form.create()
export default class NewSource extends PureComponent {

  state = {
    isEdit: true,
  }

  

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'source/getDetail',
      payload: {
        source_id: match.params.id,
      },
    })
  }


  handleSubmit = () => {
    const { form } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((error, values) => {
      if(!error) {
        console.log('表单数据', values)
      } else {
        console.log('错误')
      }
    })
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  }

  handleEdit = () => {
    // 保存按钮
    
    if(this.state.isEdit) {
      showConfirm({
        title: '确定保存吗？', 
        onOk() {

        },
        onCancel() {

        },
      })
    }

    this.setState({
      isEdit: !this.state.isEdit,
    })
  }

  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
  }

  renderBasic = ({ data = {} }) => {
    const { form } = this.props;
    const { isEdit } = this.state;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <DescriptionList size="large" >
          <Description term="资源名称">
            {isEdit ? getFieldDecorator('source_name', {
                rules: [{ required: true, message: '请选择用户是否回国' }],
                initialValue: data.source_name,
                
            })(<Input placeholder="请输入用户名称" />) : data.source_name}
          </Description>
          <Description term="是否回国">
            {isEdit ? getFieldDecorator('source_comeBack', {
              rules: [{ required: true, message: '请选择用户是否回国' }],
              initialValue: data.source_comeBack,
            })(
              <Select
                placeholder="请选择用户是否回国"
              >
                <Option value="1">是</Option>
                <Option value="2">否</Option>
              </Select>
            ) : Number(data.source_comeBack) === 1 ? '是' : '否'}
          </Description>
          <Description term="未来规划">
            {isEdit ? getFieldDecorator('source_planning', {
              rules: [{ required: true, message: '请选择用户未来规划' }],
              initialValue: data.source_planning,
            })(
              <Select
                placeholder="请选择用户未来规划"
              >
                <Option value="1">求学</Option>
                <Option value="2">就业</Option>
              </Select>
            ) : data.source_planning}
          </Description>
          <Description term="来访渠道">
            {isEdit ? getFieldDecorator('source_channel',{
              rules: [{ required: true, message: '请选择来访渠道' }],
              initialValue: data.source_channel,
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
            ):channel[data.source_channel]}
          </Description>
          <Description term="就读院校">
            {isEdit ? getFieldDecorator('source_school', {
              rules: [{ required: true, message: '请填写就读院校' }],
              initialValue: data.source_school,
            })(
              <Input placeholder="请填写就读院校" />
            ):data.source_school}
          </Description>
          <Description term="就读专业">
            {isEdit ?  getFieldDecorator('source_profession', {
              rules: [{ required: true, message: '请填写就读专业' }],
              initialValue: data.source_profession,
            })(
              <Input placeholder="请填写就读专业" />
            ) : data.source_profession}
          </Description>
          <Description term="就读年级">
            {isEdit ? getFieldDecorator('source_grade', {
              rules: [{ required: true, message: '请选择就读年级' }],
              initialValue: data.source_grade,
            })(
              <Select
                placeholder="请选择就读年级"
              >
                <Option value="2016">2016</Option>
                <Option value="2017">2017</Option>
              </Select>
            ) :data.source_grade}
          </Description>
          <Description term="联系电话">
            {isEdit ? getFieldDecorator('source_phone',{
              rules: [{ required: true, message: '请输入用户电话' }],
              initialValue: data.source_phone,
            })(
              <Input placeholder="请输入用户电话" />
            ) : data.source_phone}
          </Description>
          <Description term="QQ">
            {isEdit ? getFieldDecorator('source_qq', {
              rules: [{ required: true, message: '请输入QQ号码' }],
              initialValue: data.source_qq,
            })(
              <Input placeholder="请输入QQ号码" />
            ) : <a href={`tencent://message/?Menu=yes&uin=${data.source_qq}`} target="_blank">
                  {data.source_qq}
                </a>
            }
          </Description>
          <Description term="微信">
            {isEdit ? getFieldDecorator('source_wei', {
              rules: [{ required: true, message: '请输入微信号码' }],
              initialValue: data.source_wei,
            })(
              <Input placeholder="请输入微信号码" />
            ) : data.source_wei}
          </Description>
        </DescriptionList>
      </Form>
    )
  }

  renderSign = ({ data = {}}) => {
    const { getFieldDecorator } = this.props.form;
    const { isEdit } = this.state;

    return (
      <Form>
        <DescriptionList size="large">
          <Description term="签约人名称">
            {isEdit ? getFieldDecorator('sign_name', {
              rules: [{ required: true, message: '请输入微信号码' }],
              initialValue: data.sign_name,
            })(
              <Input placeholder="签约人名称" />  
            ):data.sign_name}
          </Description>
          <Description term="签约人手机">
            {isEdit ?getFieldDecorator('sign_phone', {
              rules: [{ required: true, message: '请输入签约人手机号码？' }],
              initialValue: data.sign_phone,              
            })(
              <Input placeholder="签约人手机" />
            ) : data.sign_phone}
          </Description>
          <Description term="证件类型">
            {isEdit ? getFieldDecorator('sign_type', {
               rules: [{ required: true, message: '请输入签约人手机号码？' }],
               initialValue: data.sign_type,               
            })(
              <Select>
                <Option value="1">身份证</Option>
                <Option value="2">其他证件</Option>
              </Select>
            ) :data.sign_type}
          </Description>
          <Description term="签约人证件号码">
            {isEdit ? getFieldDecorator('sign_type_num', {
              rules: [{ required: true, message: '请输入签约人证件号码' }],
              initialValue: data.sign_type,     
            })(
              <Input placeholder="请输入签约人证件号码？" />
            ): data.sign_type_num}
          </Description>
          <Description term="签约人邮箱">
            {isEdit ? getFieldDecorator('sign_email', {
                rules: [{ required: true, message: '请输入签约人邮箱' }],
                initialValue: data.sign_email,     
              })(
                <Input placeholder="请输入签约人邮箱" />
              ): <a href={`mailto:${data.sign_email}`}>{data.sign_email}</a>}
          </Description>
          <Description term="签约人地址">
            {isEdit ? getFieldDecorator('sign_address', {
                rules: [{ required: true, message: '请输入签约人地址' }],
                initialValue: data.sign_address,     
              })(
                <Input placeholder="请输入签约人地址" />
              ): data.sign_address}

          </Description>
        </DescriptionList>
      </Form>
  )}

  render() {
    const { form, detail, sign, contract, loadingData } = this.props;
    const { isEdit } = this.state;
    const { getFieldDecorator } = form;

    return (
      <PageHeaderLayout
        title="详细信息"
        breadcrumbList={breadcrumbList}
        action={action({ handleEdit: this.handleEdit, isEdit, handleReset: this.handleReset })}
        loading={loadingData}
      >
        <Card title="基本信息" loading={loadingData}>
          <this.renderBasic data={detail} />
        </Card>
        <Card
          title="联系记录"
          style={{marginTop: 20}}
          loading={loadingData}
          extra={<a href="#">新增联系记录</a>}
        >
          <RecordList />
        </Card>  
        <Card
          title="签约信息"
          style={{marginTop: 20}}
          loading={loadingData}
          // extra={<a onClick={showConfirm.bind(null, {title: '确定签约吗？'})}>签约</a>}
        >
          <this.renderSign data={sign} />
        </Card>
        <Card
          title="合同信息"
          style={{marginTop: 20}}
          loading={loadingData}
        >
          <ContractData data={contract} />
        </Card>
      </PageHeaderLayout>
    )
  }
}
