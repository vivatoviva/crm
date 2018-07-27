import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, Avatar, Alert } from 'antd';
import SourceTable from "components/SourceTable";
import { Bar, TimelineChart } from "components/Charts";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Workplace.less';
import Authorized from '../../utils/Authorized';
import { getAuthority, getUserInfo } from '../../utils/authority';

const salesData = [{
  x: '淘宝',
  y: 700,
}, {
  x: '网站',
  y: 160,  
}, {
  x: '市场',
  y: 400,  
}, {
  x: '校园大使',
  y: 71,  
}, {
  x: '老带新',
  y: 300,  
}];

const offlineChartData = [{
  "x": 1532423292087,
  "y1": 84,
  "y2": 91
}, {
  "x": 1532425092087,
  "y1": 99,
  "y2": 88
}, {
  "x": 1532426892087,
  "y1": 47,
  "y2": 108
}, {
  "x": 1532428692087,
  "y1": 14,
  "y2": 83
}, {
  "x": 1532430492087,
  "y1": 12,
  "y2": 73
}, {
  "x": 1532432292087,
  "y1": 53,
  "y2": 23
}, {
  "x": 1532434092087,
  "y1": 43,
  "y2": 107
}, {
  "x": 1532435892087,
  "y1": 56,
  "y2": 76
}, {
  "x": 1532437692087,
  "y1": 44,
  "y2": 55
}, {
  "x": 1532439492087,
  "y1": 109,
  "y2": 84
}, {
  "x": 1532441292087,
  "y1": 106,
  "y2": 38
}, {
  "x": 1532443092087,
  "y1": 91,
  "y2": 37
}, {
  "x": 1532444892087,
  "y1": 79,
  "y2": 102
}, {
  "x": 1532446692087,
  "y1": 76,
  "y2": 73
}, {
  "x": 1532448492087,
  "y1": 12,
  "y2": 19
}, {
  "x": 1532450292087,
  "y1": 70,
  "y2": 92
}, {
  "x": 1532452092087,
  "y1": 55,
  "y2": 46
}, {
  "x": 1532453892087,
  "y1": 28,
  "y2": 50
}, {
  "x": 1532455692087,
  "y1": 60,
  "y2": 67
}, {
  "x": 1532457492087,
  "y1": 39,
  "y2": 39
}]


@connect(({ loading, source, userInfo }) => ({
  recentData: source.recentData,
  userInfo,
  rencentLoading: loading.effects['source/fetchRecent'],
}))
export default class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'source/fetchRecent',
      payload: '1',
    })
    dispatch({
      type: 'userInfo/fetchUserInfo',
      payload: {
        userId: 1,
      },
    })
  }


  render() {
    const {
      recentData: { list },
      userInfo: { basicInfo },
      rencentLoading,
    } = this.props;
    
    const {
      // user_id: userId,
      userName,
      userPermission, // 1：客服人员，2：销售人员， 3： 销售主管
      userSignNum,
      userRank,
      newSource,
      personNum,
      userAvatar,
    } = basicInfo;
    const position = ['', '客服人员', '销售人员', '销售主管'];


    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src={userAvatar}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{userName}，祝你开心每一天！</div>
          <div>{(function(){
              switch(getAuthority()) {
                case 'customer': return '客服人员';
                case 'seller': return '销售人员';
                case 'supervisor': return '销售主管';
              }
            })()} </div>
        </div>
      </div>
    );
    

    const extraContent = (
      <div className={styles.extraContent}>
        <Authorized authority={['seller']}>
          <div className={styles.statItem}>
            <p>签约数</p>
            <p>{userSignNum}</p>
          </div>
          <div className={styles.statItem}>
            <p>团队内排名</p>
            <p>
              {userRank}
              <span> / {personNum}</span>
            </p>
          </div>
        </Authorized>
        <div className={styles.statItem}>
          <p>新增资源</p>
          <p>{newSource}</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Authorized authority={['seller']}>
              <Card
                className={styles.projectList}
                style={{ marginBottom: 24 }}
                title="最近的资源"
                bordered={false}
                extra={<Link to={{pathname: 'resource', search: '', state: {} }}>全部资源</Link>}
                loading={rencentLoading}
              >
                <SourceTable data={{ list }} styles={{ padding: 0 }} multipleSelection={false} />
              </Card>
            </Authorized>
            <Card style={{ marginBottom: 24, width: '400' }} loading={rencentLoading}>
              <Row gutter={24}>
                <Col span={24}>
                  <Bar height={300} title="来访渠道" data={salesData} />
                </Col>
              </Row>
            </Card>

            <Card
              style={{ marginBottom: 24, width: '100%' }}
              loading={rencentLoading}
            >
              <Row gutter={24}>
                <Col span={24}>
                  <TimelineChart
                    height={400}
                    data={offlineChartData}
                    titleMap={{ y1: '团队总签约量', y2: '签约转化率' }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>

    );
  }
}
