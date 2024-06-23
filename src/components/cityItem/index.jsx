import { View, Text } from "@tarojs/components";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import Taro from "@tarojs/taro";

export default function Index({ label = "", cityItem = [] }) {
  const dispath = useDispatch();
  const { cityType } = useSelector((state) => state.fightIndex);
  const handleSelectCity = (city) => {
    console.log(cityType, "cityType");
    console.log(cityType === "depart");
    const payload =
      cityType === "depart"
        ? {
            dptCityName: city.cityname,
            dptCityId: city.id,
          }
        : { arrCityName: city.cityname, arrCityId: city.id };
    console.log(payload, "payload");
    dispath({ type: "fightIndex/updateStata", payload });
    Taro.navigateBack("/pages/index/index");
  };
  return (
    <View className="list-item" id={label}>
      <Text className="label">{label}</Text>
      {cityItem.map((city) => {
        return (
          <View
            className="name"
            key={city.id}
            onClick={() => handleSelectCity(city)}
          >
            {city.cityname}
          </View>
        );
      })}
    </View>
  );
}
