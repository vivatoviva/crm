import Mock from 'mockjs';

// 最近资源
const recentData = Mock.mock({
  code: 10001,
  data: {
    'rencentData|5-10': [{
      source_id: '1',
      create_time: '2016-10-5',
      source_name: 'genluo',
      source_planning: '就业',
      source_channel: '淘宝',
      status: '长线用户',
      schedule_day: '5',
      person: 'luogen',
      phone_num: '17784455445',
      source_phone: '17784455445', // 资源电话
      source_comeBack: '1', // 是否回国
      source_school: '重庆邮电大学',
      source_profession: '信息管理与信息系统',
      source_grade: '2016',
      source_qq: '1461304646',
      source_wei: '1461304646',
    }],
  },
});

export default {
  recentData,
}