import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, Avatar } from 'antd';
import SourceTable from "components/SourceTable";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Workplace.less';



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
      user_name: userName,
      user_permission: userPermission, // 1：客服人员，2：销售人员， 3： 销售主管
      user_sign_num: userSignNum,
      user_rank: userRank,
      new_source: newSource,
      person_num: personNum,
      user_avatar: userAvater,
    } = basicInfo;
    const position = ['', '客服人员', '销售人员', '销售主管'];


    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src={userAvater}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{userName}，祝你开心每一天！</div>
          <div>{position[userPermission]} </div>
        </div>
      </div>
    );
    

    const extraContent = (
      <div className={styles.extraContent}>
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
        <div className={styles.statItem}>
          <p>新资源</p>
          <p>{newSource}</p>
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
              extra={<Link to="/resource">全部资源</Link>}
              loading={rencentLoading}
            >
              <SourceTable data={{ list }} styles={{ padding: 0 }} multipleSelection={false} />
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
