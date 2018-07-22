import request from "../utils/request";

export async function queryRecent(id) {
  return request('/api/queryRecent')
}