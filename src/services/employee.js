import request from "../utils/request";

export function queryEmployeeList(params) {
  return request('/api/queryEmployeeList', {
    method: 'POST',
  })
}
