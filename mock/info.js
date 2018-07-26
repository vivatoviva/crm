import Mock from 'mockjs';

const { mock } = Mock;

// 用户信息
const userInfo = mock({
  code: 10001,
  data: {
    userId: 1,
    userName: 'genluo',
    userPermission: 1, // 1：客服人员，2：销售人员， 3： 销售主管
    userSignNum: 10,
    userRank: 1,
    newSource: 10,
    personNum: 20,
    userAvatar: 'https://avatars1.githubusercontent.com/u/26970959?s=460&v=4',
  },
})

export default {
  userInfo,
}