import Mock from 'mockjs';

const { Random } = Mock;

const employeeList = Mock.mock({
  code: '100001',
  data: {
    "list|10": [{
      'userId|1-100': 1,
      userName: Random.cname(),
      'userPermission|1-3': 1, // 1 客服人员 2销售人员 3销售主管
      userPhone: 177784455445,
      'userProject_num|20-100': 20,
      'userRank|1-100': 1,
      'key|1-1000': 1,
    }],
    pagination: {
      current: 1,
      total: 100,
    },
  },
})

export default {
  employeeList, 
}
