import { queryFollowData, queryRecent, querySource, getDetail, getContractList } from '../services/source';


export default {
  namespace: 'source',

  state: {
    // 资源详情
    detail: {
      detail: {},
      sign: {},
      contract: {},
    },
    // 最近资源
    recentData: {
      list: [],
      pagination: {},
    },
    // 搜优资源
    allData: {
      list: [],
      pagination: {},
    },
    // 资源联系记录
    contract: {
      list: [],
    },
    // 资源跟进
    followData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchRecent({ payload: { id } }, { call, put }) {
      const response = yield call(queryRecent, id);
      const data = response.data.rencentData;
      yield put({
        type: 'saveRecent',
        payload: data,
      })
    },
    *fetchList({ payload }, { call, put }) {
      const response = yield call(querySource, payload);
      const { code, data } = response;
      if(code === 0) return;
      yield put({
        type: 'saveSource',
        payload: data,
      })
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getDetail);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      })
    },
    *fetchContract({ payload }, { call, put }) {
      const response = yield call(getContractList, payload);
      yield put({
        type: 'saveContract',
        payload: response.data,
      })
    },
    *fetchFollowData({ payload }, { call,   put }) {
      const response = yield call(queryFollowData, payload);
      yield put({
        type: 'saveFollow',
        payload: response.data,
      })
    } 
  },

  reducers: {
    saveRecent(state, action) {
      return {
        ...state,
        recentData: {
          list: action.payload
        },
      }
    },
    saveSource(state, { payload }) {
      return {
        ...state,
        allData: payload,
      }
    },
    saveDetail(state, { payload }) {
      return {
        ...state,
        detail: payload,
      }
    },
    saveContract(state, { payload }) {
      return {
        ...state,
        contract:  payload,
      }
    },
    saveFollow(state, { payload }) {
      return {
        ...state,
        followData: payload,
      }
    },
  },
}