// 显示资源列表。有两种不同的显示风格
import React, { PureComponent } from "react";
import moment from 'moment';
import { Link } from 'dva/router';
import {
  Table,
  Badge,
} from 'antd';
import StandardTable from '../StandardTable';



const status = ['全部', '长线用户', '深度用户', '潜在用户', '强烈意向', '联系不到']
const statusMap = ['', 'success', 'processing', 'warning', 'error', 'default' ];
const channel = ['', '淘宝', '网站', '校园大使', '市场', '老带薪']
// 表格单元
const columns = [{
  title: '创建时间',
  dataIndex: 'createTime',
  key: 'createTime',
  render: val => moment(val).format('YYYY-MM-DD'),
}, {
  title: '资源名称',
  align: 'center',
  dataIndex: 'sourceName',
  key: 'source',
}, {
  title: '未来计划',
  dataIndex: 'sourcePlanning',
  align: 'center',
  key: 'sourcePlanning',
}, {
  title: '来访渠道',
  dataIndex: 'sourceChannel',
  key: 'sourceChannel',
  render: val => channel[val],
}, {
  title: '资源状态',
  dataIndex: 'status',
  key: 'status',
  filters: [{
    text: status[1],
    value: 1,
  }, {
    text: status[2],
    value: 2,
  }, {
    text: status[3],
    value: 3,
  }, {
    text: status[4],
    value: 4,
  }, {
    text: status[5],
    value: 5,
  }],
  onFilter: (value, record) => record.status.toString() === value.toString(),
  render(val) {
    return <Badge status={statusMap[val]} text={status[val]} />;
  },
}, {
  title: '未跟进天数',
  dataIndex: 'scheduleDay',
  key: 'scheduleDay',
  align: 'center',
}, {
  title: '对接人',
  dataIndex: 'person',
  key: 'person',
  render: text => text || "暂无",
}, {
  title: '操作',
  dataIndex: 'sourceId',
  key: 'sourceId',
  render: text => (<Link to={`/resource/detail/${text}`}>详情</Link>),
}];



export default class SourceTable extends PureComponent {

  renderTable = () => {
    const {
      data: { list },
      loading,
    } = this.props;
    return <Table loading={loading} dataSource={list} columns={columns} styles={{ padding: 0 }} pagination={false} />;
  }

  renderStandardTable = () => {
    return <StandardTable {...this.props} columns={columns} />
  }
  
  render() {
    const { multipleSelection } = this.props;
    return multipleSelection ? this.renderStandardTable() : this.renderTable();
  }
}