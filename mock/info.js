import Mock from 'mockjs';
const { Random, mock } = Mock;

const userInfo = mock({
  code: 10001,
  data: {
    user_id: 1,
    user_name: 'genluo',
    user_permission: 1, // 1：客服人员，2：销售人员， 3： 销售主管
    user_sign_num: 10,
    user_rank: 1,
    new_source: 10,
  },
})

export default {
  userInfo,
}