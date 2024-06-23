import dayjs from "dayjs";

const INIT_STATE = {
  dptCityId: 2,
  dptCityName: "上海",
  arrCityId: 1,
  arrCityName: "北京",
  cityType: "depart", // 选择的城市类型 depart: 出发， arrive：到达
  dptDate: dayjs().format("YYYY-MM-DD"),
};

export default {
  namespace: "fightIndex",
  state: { ...INIT_STATE },
  reducers: {
    updateStata(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {},
};
