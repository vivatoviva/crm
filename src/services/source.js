import request from "../utils/request";

export async function queryRecent(id) {
  return request('/api/queryRecent')
}

export async function querySource(params) {
  return request('/api/querySource', {
    method: 'POST',
    body: {
      ...params,
    },
  })
}

export async function getDetail(sourceId) {
  return request(`/api/getDetail?sourceId=${sourceId}`);
};