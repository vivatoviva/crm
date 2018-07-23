import request from '../utils/request';
// 获取用户基本信息
export function getUserInfo(id) {
  return request(`/api/getUserInfo?id=${id}`);
}