import request from "../utils/request";


// 最近资源信息
export async function queryRecent(id) {
  return request('/api/source/recent')
}

// 查询资源列表
export async function querySource(params) {
  return request('/api/source/list', {
    method: 'POST',
    body: {
      ...params,
    },
  })
}

// 得到资源详情
export async function getDetail(sourceId) {
  return request(`/api/source/detail?sourceId=${sourceId}`);
};

// 获取联系记录
export async function getContractList(sourceId) {
  return request('/api/source/record/list');
}

// 查询资源跟进列表
export async function queryFollowData(params) {
  return request('/api/query/follow', {
    method: 'POST',
  })
}

// 删除资源
export async function deleteSource(params) {
  return request('/api/source/delete', {
    method: 'POST',
  })
}

// 分派资源信息
export async function dispatchSource(params) {
  return request('/api/source/dispatch', {
    method: 'POST',
  })
}

// 编辑资源信息
export async function editSource(params) {
  return request('/api/source/modify', {
    method: 'POST',
  })
}
// 签约资源信息
export async function signSource(sourceId) {
  return request('/api/source/sign', {
    method: 'POST',
  })
}
// 退回资源信息
export async function retreatSource(sourceId) {
  return request('/api/source/retreat', {
    method: 'POST',
  })
}
// 新建合同信息
export async function addContract(params) {
  return request('/api/source/contract/add', {
    method: 'POST',
  })
}

// 新建、编辑联系记录
export async function operateRecord(params) {
  return request('/api/source/record/operate', {
    method: 'POST',
  })
}

// 删除联系记录
export async function deleteRecord(params) {
  return request('/api/source/record/delete')
}

// 添加资源
export async function addSource(params) {
  return request('/api/source/add', {
    method: 'POST',
  })
}