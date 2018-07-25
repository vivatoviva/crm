import React, { PureComponent } from 'react';
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import FooterToolbar from 'components/FooterToolbar';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  message,
  Modal,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
const FormItem = Form.Item;

// 面包屑信息
const breadcrumbList = [{
  title: '首页',
  href: '/',
}, {
  title: '资源管理',
  href: '/resource',
}, {
  title: '新增资源',
}];

function warning() {
  Modal.warning({
    title: '警告',
    content: '联系方式至少填写一个',
  });
}

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class NewSource extends PureComponent {
  
  isHaveContract = values => {
    const { contractPhone, contractQq, contractWx } = values;
    return contractPhone||contractQq||contractWx;
  }

  handleSubmit = () => {
    const { form, dispatch } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((error, values) => {
      if(!error) {
        // 检测是不是没有填写联系方式
        if(!this.isHaveContract(values)) return warning();
        message.success("添加成功");
        dispatch(routerRedux.push(`/resource/detail/44`));
      } else {
        message.error('错误');
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
        title="新增资源"
        breadcrumbList={breadcrumbList}
      >
        <Form
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
                      rules: [{ required: false, message: '请选择用户是否回国' }],
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
                      rules: [{ required: false, message: '请选择用户未来规划' }],
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
                      rules: [{ required: false, message: '请选择来访渠道' }],
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
                      rules: [{ required: false, message: '请填写就读院校' }],
                    })(
                      <Input placeholder="请填写就读院校" />
                    )}
                </FormItem>
              </Col> 
              <Col className="gutter-row" xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <FormItem label="就读专业">
                  {getFieldDecorator('source_profession', {
                      rules: [{ required: false, message: '请填写就读专业' }],
                    })(
                      <Input placeholder="请填写就读专业" />
                    )}
                </FormItem>
              </Col>
              <Col className="gutter-row" xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <FormItem label="就读年级">
                  {getFieldDecorator('source_grade', {
                      rules: [{ required: false, message: '请选择就读年级' }],
                    })(
                      <Select
                        placeholder="请选择就读年级"
                      >
                        <Option value="2020">2020</Option>
                        <Option value="2019">2019</Option>
                        <Option value="2018">2018</Option>
                        <Option value="2017">2017</Option>
                        <Option value="2016">2016</Option>
                        <Option value="2015">2015</Option>
                      </Select>
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" lg={6} md={12} sm={24}>
                <FormItem label="联系电话">
                  {getFieldDecorator('source_phone', {
                      rules: [{ required: false, message: '请输入用户电话' }],
                    })(
                      <Input placeholder="请输入用户电话" />
                    )}
                </FormItem>
              </Col>
              <Col className="gutter-row" xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <FormItem label="QQ">
                  {getFieldDecorator('source_qq', {
                      rules: [{ required: false, message: '请输入QQ号码' }],
                    })(
                      <Input placeholder="请输入QQ号码" />
                    )}
                </FormItem>
              </Col>
              <Col className="gutter-row" xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <FormItem label="微信">
                  {getFieldDecorator('source_wei', {
                      rules: [{ required: false, message: '请输入微信号码' }],
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
                      rules: [{ required: false, message: '请输入用户名称' }],
                    })(
                      <Input placeholder="请填写员工编号" />
                    )}
                </FormItem>
              </Col>
              <Col className="gutter-row" xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <FormItem label="员工姓名">
                  {getFieldDecorator('person_name', {
                      rules: [{ required: false, message: '请输入用户名称' }],
                    })(
                      <Input disabled="true" />
                    )}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
        <FooterToolbar style={{ width: 2000 }}>
          {/* {getErrorInfo()} */}
          <Button type="primary" onClick={this.handleSubmit}>
            保存
          </Button>
          <Button onClick={this.handleFormReset}>
            重置
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    )
  }
}