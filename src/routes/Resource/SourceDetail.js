import React, { PureComponent, Fragment } from 'react';
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
} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

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

// 页面头部操作
const action = (
  <div>
    <Button type="primary">编辑</Button>
    <Button>签约</Button>
    <Button type="danger">退回</Button>
  </div>
);

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
  )
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
// 基本信息
const Basic = () => {
  return (
    <DescriptionList size="large" >
      <Description term="资源名称">
        genluo
      </Description>
      <Description term="是否回国">
        是
      </Description>
      <Description term="未来规划">
        就业
      </Description>
      <Description term="来访渠道">
        淘宝
      </Description>
      <Description term="就读院校">
        重庆邮电大学
      </Description>
      <Description term="就读专业">
        信息管理与信息系统
      </Description>
      <Description term="就读年级">
        2016
      </Description>
      <Description term="联系电话">
        17784455445
      </Description>
      <Description term="QQ">
        1461304646
      </Description>
      <Description term="微信">
        a1346165464
      </Description>
    </DescriptionList>
  )
}
// 合约列表
const RecordList = () => (
  <Table dataSource={dataSource} columns={columns} />
)
// 签约信息
const SignData = () => (
  <DescriptionList size="large" >
    <Description term="签约人名称">
      genluo
    </Description>
    <Description term="签约人手机">
      1461304646
    </Description>
    <Description term="证件类型">
      身份证
    </Description>
    <Description term="签约人证件号码">
      61052419970501XXXX
    </Description>
    <Description term="签约人邮箱">
      17051298278@163.com
    </Description>
    <Description term="签约人地址">
      陕西省渭南市合阳县城关镇东街村一组XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    </Description>
  </DescriptionList>
)
// 签约信息
const ContractData = () => (
  <DescriptionList size="large" >
    <Description term="合同类型">
      genluo
    </Description>
    <Description term="合同暗号">
      1461304646
    </Description>
    <Description term="合同名称">
      身份证
    </Description>
    <Description term="签约顾问">
      61052419970501XXXX
    </Description>
    <Description term="合同金额">
      17051298278@163.com
    </Description>
    <Description term="签约日期">
      2016-5-1
    </Description>
  </DescriptionList>
)
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class NewSource extends PureComponent {
  
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



  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <PageHeaderLayout
        title="详细信息"
        breadcrumbList={breadcrumbList}
        action={action}
      >
        <Card title="基本信息">
          <Basic />
        </Card>
        <Card
          title="联系记录"
          style={{marginTop: 20}}
          extra={<a href="#">新增联系记录</a>}
        >
          <RecordList />
        </Card>  
        <Card
          title="签约信息"
          style={{marginTop: 20}}
        >
          <SignData />
        </Card>
        <Card
          title="合同信息"
          style={{marginTop: 20}}
        >
          <ContractData />
        </Card>
      </PageHeaderLayout>
    )
  }
}

{/* <Form
layout="vertical"
hideRequiredMark
>
<Card title="基本信息">
  <Row gutter={16}>
    <Col className="gutter-row" lg={6} md={12} sm={24}>
      <FormItem label="资源名称">
        {getFieldDecorator('source_name', {
            rules: [{ required: true, message: '请输入用户名称' }],
          })(
            <Input placeholder="请输入用户名称" />
          )}
      </FormItem>
    </Col>
    <Col className="gutter-row" xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
      <FormItem label="是否回国">
        {getFieldDecorator('source_comeBack', {
            rules: [{ required: true, message: '请选择用户是否回国' }],
          })(
            <Select
              placeholder="请选择用户是否回国"
            >
              <Option value="yes">是</Option>
              <Option value="no">否</Option>
            </Select>,
          )}
      </FormItem>
    </Col>
    <Col className="gutter-row" xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
      <FormItem label="未来规划">
        {getFieldDecorator('source_planning', {
            rules: [{ required: true, message: '请选择用户未来规划' }],
          })(
            <Select
              placeholder="请选择用户未来规划"
            >
              <Option value="1">求学</Option>
              <Option value="2">就业</Option>
            </Select>
          )}
      </FormItem>
    </Col>
    <Col className="gutter-row" lg={6} md={12} sm={24}>
      <FormItem label="来访渠道">
        {getFieldDecorator('source_channel', {
            rules: [{ required: true, message: '请选择来访渠道' }],
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
          )}
      </FormItem>
    </Col>
  </Row>
</Card>

<Card
  title="院校联系信息"
  style={{marginTop: 20}}
>
  <Row gutter={16}>       
    <Col className="gutter-row" lg={6} md={12} sm={24}>
      <FormItem label="就读院校">
        {getFieldDecorator('source_school', {
            rules: [{ required: true, message: '请填写就读院校' }],
          })(
            <Input placeholder="请填写就读院校" />
          )}
      </FormItem>
    </Col> 
    <Col className="gutter-row" xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
      <FormItem label="就读专业">
        {getFieldDecorator('source_profession', {
            rules: [{ required: true, message: '请填写就读专业' }],
          })(
            <Input placeholder="请填写就读专业" />
          )}
      </FormItem>
    </Col>
    <Col className="gutter-row" xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
      <FormItem label="就读年级">
        {getFieldDecorator('source_grade', {
            rules: [{ required: true, message: '请选择就读年级' }],
          })(
            <Select
              placeholder="请选择就读年级"
            >
              <Option value="2016">2016</Option>
              <Option value="2017">2017</Option>
            </Select>
          )}
      </FormItem>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col className="gutter-row" lg={6} md={12} sm={24}>
      <FormItem label="联系电话">
        {getFieldDecorator('source_phone', {
            rules: [{ required: true, message: '请输入用户电话' }],
          })(
            <Input placeholder="请输入用户电话" />
          )}
      </FormItem>
    </Col>
    <Col className="gutter-row" xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
      <FormItem label="QQ">
        {getFieldDecorator('source_qq', {
            rules: [{ required: true, message: '请输入QQ号码' }],
          })(
            <Input placeholder="请输入QQ号码" />
          )}
      </FormItem>
    </Col>
    <Col className="gutter-row" xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
      <FormItem label="微信">
        {getFieldDecorator('source_wei', {
            rules: [{ required: true, message: '请输入微信号码' }],
          })(
            <Input placeholder="请输入微信号码" />
          )}
      </FormItem>
    </Col>
  </Row>
</Card>
<Card
  title="对接人信息"
  style={{marginTop: 20}}
>
  <Row gutter={16}>
    <Col className="gutter-row" lg={6} md={12} sm={24}>
      <FormItem label="对接员工编号">
        {getFieldDecorator('person_id', {
            rules: [{ required: true, message: '请输入用户名称' }],
          })(
            <Input placeholder="请填写员工编号" />
          )}
      </FormItem>
    </Col>
    <Col className="gutter-row" xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
      <FormItem label="员工姓名">
        {getFieldDecorator('person_name', {
            rules: [{ required: true, message: '请输入用户名称' }],
          })(
            <Input placeholder="员工名称" disabled="true" />
          )}
      </FormItem>
    </Col>
  </Row>
</Card>
</Form> */}