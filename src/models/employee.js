import { queryEmployeeList, operateEmployee, deleteEmployee } from '../services/employee';

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
    *operate({ payload: { formValues, searchValues } }, { call, put }) {
      const response = yield call(operateEmployee, formValues);

      yield put({
        type: 'fetchList',
        payload: searchValues,
      })
     
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteEmployee, payload);
      yield put({
        type: 'deleteData',
        payload,
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
    deleteData(state, { payload }) {
      return {
        data: {
          ...state.data,
          list: state.data.list.filter(item => item.userId !== payload),
        },
      }
    },
  },
}
