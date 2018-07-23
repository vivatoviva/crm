import { queryRecent, querySource, getDetail } from '../services/source';


export default {
  namespace: 'source',

  state: {
    // 最近资源
    detail: {
      detail: {},
      sign: {},
      contract: {},
    },
    recentData: {
      list: [],
      pagination: {},
    },
    allData: {
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
    }
  },
}