import request from "../utils/request";

export function queryEmployeeList(params) {
  return request('/api/user/list', {
    method: 'POST',
  })
}

export function operateEmployee(params) {
  return request('/api/user/operate', {
    method: 'POST',
  })
}

export function deleteEmployee(userId) {
  return request('/api/user/delete', {
    method: 'POST',
  })
}
