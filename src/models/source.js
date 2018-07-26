import { 
  deleteSource,
  dispatchSource,
  addSource as addSourceFun,
  editSource,
  signSource as signSourceFun, // 资源签约
  retreatSource as retreatSourceFun, // 资源退回
  addContract as addContractFun,
  operateRecord,
  deleteRecord  as deleteRecordFun,
  queryFollowData,
  queryRecent,
  querySource,
  getDetail,
  getContractList,
} from '../services/source';



export default {
  namespace: 'source',

  state: {
    // 资源详情
    detail: {
      detail: {},
      sign: {},
      contract: [],
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
      const response = yield call(getDetail, payload);
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
    }, 
    *editDetail({ payload }, { call, put }) {
      const response = yield call(editSource, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      })
    },
    *signSource({ payload }, { call, put }) {
      const response = yield call(signSourceFun, payload);
      yield put({
        type: 'updateSign',
        payload: '3',
      })
    },
    *retreatSource(payload, { call, put }) {
      const response = yield call(retreatSourceFun, payload);
      yield put({
        type: 'updateSign',
        payload: '4',
      })
    },
    *addContract({ payload }, { call, put }) {
      const response = yield call(addContractFun, payload);

      yield put({
        type: 'updateContract',
        payload,
      })
    },
    *addRecord({ payload }, { call, put }) {
      const response = yield call(operateRecord, payload);
      yield put({
        type: 'updateRecord',
        payload: response.data,
      })
    },
    *editRecord({ payload }, { call, put }) {
      const response = yield call(operateRecord, payload);
      yield put({
        type: 'modifyRecord',
        payload,
      })
    },
    *deleteRecord({ payload }, { call, put }) {
      const response = yield call(deleteRecordFun, payload);

      yield put({
        type: 'delRecord',
        payload,
      })
    },
    *addSource({ payload: { values, comeBack} }, { call, put }) {
      const response = yield call(addSourceFun, values);
      comeBack(response.data.sourceId);
    },
  },

  reducers: {
    saveRecent(state, action) {
      return {
        ...state,
        recentData: {
          list: action.payload,
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
    updateDetail(state, { payload }) {
      return {
        ...state,
        detail: {
          detail: { ...state.detail.detail, ...payload },
          sign: {...state.detail.sign, ...payload },
          contract: {...state.detail.contract, ...payload},
        },
      }
    },
    updateSign(state, { payload }) {
      return {
        ...state,
        detail: {
          ...state.detail,
          detail: {
            ...state.detail.detail,
            type: payload,
          },
        },
      }
    },
    updateContract(state, { payload }) {
      return {
        ...state,
        detail: {
          ...state.detail,
          contract: [...state.detail.contract, payload ],
        },
      }
    },
    updateRecord(state, { payload }) {
      return {
        ...state,
        contract: {
          list: [...state.contract.list, payload ],
        },
      }
    },
    modifyRecord(state, { payload }) {
      console.log('修改', payload);
      return {
        ...state,
        contract: {
          list: state.contract.list.map(item => item.recordId  === payload.recordId? payload:item),
        },
      }
    },
    delRecord(state, { payload }) {
      return {
        ...state,
        contract: {
          list: state.contract.list.filter(item => item.recordId !== payload),
        },
      }
    },
  },
}