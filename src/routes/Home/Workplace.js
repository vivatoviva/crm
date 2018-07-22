import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Table } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Workplace.less';



const columns = [{
  title: '创建时间',
  dataIndex: 'create_time',
  key: 'name',
}, {
  title: '资源名称',
  dataIndex: 'source_name',
  key: 'age',
}, {
  title: '未来计划',
  dataIndex: 'source_planning',
  key: 'source_planning',
}, {
  title: '来访渠道',
  dataIndex: 'source_channel',
  key: 'source_channel'
}, {
  title: '资源状态',
  dataIndex: 'status',
  key: 'status'
}, {
  title: '未跟进天数',
  dataIndex: 'schedule_day',
  key: 'schedule_day'
}, {
  title: '对接人',
  dataIndex: 'person',
  key: 'person'
}, {
  title: '操作',
  dataIndex: 'source_id',
  key: 'id',
  render: (text, record) => (<Link to={`/resource/detail/${text}`}>详情</Link>)
}];


@connect(({ project, activities, chart, loading, source }) => ({
  project,
  activities,
  chart,
  recentData: source.recentData,
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
}))
export default class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
    dispatch({
      type: 'source/fetchRecent',
      payload: '1'
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });

  }

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      project: { notice },
      projectLoading,
      activitiesLoading,
      chart: { radarData },
      recentData: { list}
    } = this.props;
    
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>曲丽丽，祝你开心每一天！</div>
          <div>销售主管 </div>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>签约数</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排名</p>
          <p>
            8
            <span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>新资源</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="最近的资源"
              bordered={false}
              extra={<Link to="/">全部资源</Link>}
              loading={projectLoading}
            >
              <Table dataSource={list} columns={columns} styles={{ padding: 0 }} />
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
