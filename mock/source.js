import Mock from 'mockjs';

const { Random } = Mock;


const basic = {
  'source_id|1-100': 1,
  createTime: 1280977330000,
  sourceName: Random.cname(),
  sourcePlanning: '就业',
  'sourceChannel|1-5': 1, // 1： 淘宝， 2 网站 ， 3 校园大使， 4 市场， 5 老带新
  'status|1-5': 1,
  scheduleDay: '5',
  person() {
    const num = Random.integer(1,10);
    if(num%2 ===0 ) {
      return Random.cname();
    }
    return ''
  },
  phoneNum: '17784455445',
  sourcePhone: '17784455445', // 资源电话
  sourceComeBack: '1', // 是否回国
  sourceSchool: '重庆邮电大学',
  sourceProfession: '信息管理与信息系统',
  sourceGrade: '2016',
  sourceQq: '1461304646',
  sourceWx: '1461304646',
  type: '1',
  'key|1-5000': 1,
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
      signName: Random.cname(),
      signPhone: '17784455445',
      signType: '身份证',
      signType_num: Random.id(),
      signEmail: Random.email(),
      signAddress: Random.county(true),
    },
    'contract|1-3': [{
      contractType: '纸质合同',
      contractSignal: Random.guid(),
      contractName: '合同名称',
      contractConsultant: 'genluo',
      contractAmount: 100,
      contractDate: 1280977330000,
      'key|1-5000': 1,
    }],
  },
})

// 联系记录
const contactData = Mock.mock({
  code: '10001',
  data: {
    'list|30': [{
      'recordId|1-100': 1,
      'recordType|1-5': 1,
      'status|1-5': 1,
      'recordContent': Random.title(),
      person: 'genluo',
      recordPrice: '100',
      recordTime: 1280977330000,
      createTime: 1280977330000,
      'key|1-5000': 1,
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
      sourceId: 1,
      'status|1-5': 1,
      sourceName: Random.cname(),
      sourceNum: '17784455445',
      person: 'genluo',
      'secholdDay|1-10': 1,
      'contractContent|1-3': [Random.title()],
      'key|1-5000': 1,
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