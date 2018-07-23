import { getUserInfo } from "../services/userInfo";

export default {
  namespace: 'userInfo',

  state: {
    basicInfo: {},
  },


  effects: {
    *fetchUserInfo({ payload },{ call, put}) {
      const { userId } = payload;
      if(userId === undefined) return 0;
      
      const response = yield call(getUserInfo, userId);
      
      yield put({
        type: 'saveBasicInfo',
        basicData: response.data,
      })
    },
  },

  reducers: {
    saveBasicInfo(state, { basicData }) {
      return {
        ...state,
        basicInfo: basicData,
      }
    },
  },
}
