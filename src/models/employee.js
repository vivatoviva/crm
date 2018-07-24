import { queryEmployeeList } from '../services/employee';

export default {
  namespace: 'employee',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchList({ payload }, { call, put}) {
      const response = yield call(queryEmployeeList, payload);
      yield put({
        type: 'savaData',
        payload: response.data,
      })
    },
  },

  reducers: {
    savaData(state, { payload }) {
      return {
        ...state,
        data: payload,
      }
    },
  },
}
