import Mock from 'mockjs';

const { Random } = Mock;

const basic = Mock.mock({
  employee_id: Random.id(),
  employee_name: Random.cname(),
  'employee_permission|1-3': 1, // 1 客服人员 2销售人员 3销售主管
  employee_phone: 177784455445,
  employee_project_num: 20,
  employee_rank: 1,
})

const employeeList = Mock.mock({
  code: '100001',
  data: {
    "list|10": [basic],
    pagination: {
      current: 1,
      total: 100,
    },
  },
})

export default {
  employeeList, 
}
