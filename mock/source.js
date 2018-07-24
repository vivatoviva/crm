import Mock from 'mockjs';
const Random = Mock.Random;


const basic = {
  'source_id|1-100': 1,
  create_time: Random.date('yyyy-MM-dd'),
  source_name: Random.cname(),
  source_planning: '就业',
  'source_channel|1-5': 1, // 1： 淘宝， 2 网站 ， 3 校园大使， 4 市场， 5 老带新
  'status|1-5': 1,
  schedule_day: '5',
  person: function() {
    const num = Random.integer(1,10);
    if(num%2 ===0 ) {
      return Random.cname();
    }
    return ''
  },
  phone_num: '17784455445',
  source_phone: '17784455445', // 资源电话
  source_comeBack: '1', // 是否回国
  source_school: '重庆邮电大学',
  source_profession: '信息管理与信息系统',
  source_grade: '2016',
  source_qq: '1461304646',
  source_wei: '1461304646',
}
// 最近资源
const recentData = Mock.mock({
  code: 10001,
  data: {
    'rencentData|5-10': [basic],
  },
});

// 列表展示
const listData = Mock.mock({
  code: 1001,
  data: {
    'list|10': [basic],
    pagination: {
      current: 1,
      total: 100,
    },
  },
})

// 详情
const detailData = Mock.mock({
  code: '10001',
  data: {
    detail: basic,
    sign: {
      sign_name: Random.cname(),
      sign_phone: '17784455445',
      sign_type: '身份证',
      sign_type_num: Random.id(),
      sign_email: Random.email(),
      sign_address: Random.county(true),
    },
    contract: {
      contract_type: '纸质合同',
      contract_signal: Random.guid(),
      contract_name: '合同名称',
      contract_consultant: 'genluo',
      contract_amount: 100,
      contract_date: Random.date("yyyy-mm-dd"),
    },
  },
})

// 联系记录
const contactData = Mock.mock({
  code: '10001',
  data: {
    'list|30': [{
      'contract_type|1-5': 1,
      'status|1-5': 1,
      'contract_content': Random.title(),
      person: 'genluo',
      contract_price: '100',
      contract_time: '2016-9-10',
      create_time: '2016-2-5',
    }],
    pagination: {
      current: 1,
      // total: 30,
    },
  },
})

// 跟进记录
const followData = Mock.mock({
  code: '10001',
  data: {
    'list|10': [{
      source_id: 1,
      'status|1-5': 1,
      source_name: Random.cname(),
      source_num: '17784455445',
      person: 'genluo',
      'sechold_day|1-10': 1,
      'contract_content|1-3': [Random.title()],
    }],
    pagination: {
      current: 1,
      total: 200,
    },
  },
})

export default {
  recentData,
  listData,
  detailData,
  contactData,
  followData,
}