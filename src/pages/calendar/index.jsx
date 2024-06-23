import { View } from "@tarojs/components";
import { AtCalendar } from "taro-ui";
import { useSelector, useDispatch } from "react-redux";
import { MIN_DATE, MAX_DATE } from "@/common/utils";
import Taro from "@tarojs/taro";
import "./index.scss";
export default function Index() {
  const { dptDate } = useSelector((state) => state.fightIndex);
  const dispatch = useDispatch();
  const handleCalendar = (data) => {
    const {
      value: { start },
    } = data;
    dispatch({
      type: "fightIndex/updateStata",
      payload: {
        dptDate: start,
      },
    });
    Taro.navigateBack("/pages/index/index");
  };
  return (
    <View className="calendar-page">
      <AtCalendar
        currentDate={dptDate}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        onSelectDate={handleCalendar}
      />
    </View>
  );
}
