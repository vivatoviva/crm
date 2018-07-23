import Mock from 'mockjs';
const Random = Mock.Random;

// 最近资源
const recentData = Mock.mock({
  code: 10001,
  data: {
    'rencentData|5-10': [{
      source_id: '1',
      create_time: Random.date('yyyy-MM-dd'),
      source_name: 'genluo',
      source_planning: '就业',
      source_channel: '淘宝',
      'status|1-5': 1,
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