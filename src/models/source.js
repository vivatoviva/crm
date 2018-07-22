import { queryRecent } from '../services/source';


export default {
  namespace: 'source',

  state: {
    // 最近资源
    recentData: {
      list: [],
      pagination: {},
    }
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
  },

  reducers: {
    saveRecent(state, action) {
      return {
        ...state,
        recentData: {
          list: action.payload
        }
      }
    }
  }
}