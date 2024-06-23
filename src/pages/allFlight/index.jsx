import { ScrollView, View, Text, Picker } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { useState, useEffect } from "react";
import { MIN_DATE, MAX_DATE, getDatesBetween } from "@/common/utils";
import { getAllFlight } from "@/common/api";
import Skeleton from "taro-skeleton";
import { useSelector } from "react-redux";
import "./index.scss";
export default function Index() {
  const { params } = getCurrentInstance().router;
  const [timeList, setTimeList] = useState([]);
  const [currentLetter, setCurrentLetter] = useState("");
  const [allFlightList, setAllFlightList] = useState([]);
  const [initFlightList, setInitFlightList] = useState([]);
  const [company, setCompany] = useState([]);
  const [curAirCompanyIndex, setCurAirCompanyIndex] = useState(0);
  useEffect(() => {
    const datesBetween = getDatesBetween(MIN_DATE, MAX_DATE);
    setCurrentLetter(`data-${datesBetween[0]}`);
    setTimeList(datesBetween);
    Taro.setNavigationBarTitle({
      title: `${params.dptCityName}-${params.arrCityName}`,
    });
  }, []);
  useEffect(() => {
    getAllFlightList();
  }, []);
  const getAllFlightList = async () => {
    const res = await getAllFlight();
    setInitFlightList(res.data);
    setAllFlightList(res.data);
    setCompany(res.company);
  };
  console.log(params, "params");
  const handleCurrentLetter = (item) => {
    setAllFlightList([]);
    setCurrentLetter(`data-${item}`);
    getAllFlightList();
  };
  const { arrCityName, dptCityName } = useSelector((state) => state.fightIndex);
  const onAirCompanyChange = (e) => {
    const { value } = e.detail;
    setCurAirCompanyIndex(value);
    const res = initFlightList.filter(
      (item) => item.company === company[value]
    );
    setAllFlightList(res);
  };
  return (
    <>
      <View class="allFlight-box">
        <View className="calendar-list">
          <ScrollView
            className="calendar-scroll-list"
            scrollX
            scrollWithAnimation
            scrollIntoView={currentLetter}
          >
            {timeList.map((item) => {
              return (
                <View
                  key={item}
                  id={`data-${item}`}
                  className={`item ${
                    `data-${item}` == `${currentLetter}` ? "active" : ""
                  }`}
                  onClick={() => handleCurrentLetter(item)}
                >
                  {item}
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View className="calendar-list-1">
          {allFlightList.length ? (
            <ScrollView scrollY className="calendar-scrollY-list">
              {allFlightList.map((item) => {
                const { start, end, id, company } = item;
                return (
                  <View className="list-item" key={id}>
                    <View className="item-price">
                      <View className="flight-row">
                        <View className="depart">
                          <Text className="flight-time">{start}</Text>
                          <Text className="airport-name">{dptCityName}</Text>
                        </View>
                        <View className="separator">
                          <View className="spt-arr"></View>
                        </View>
                        <View className="arrival">
                          <Text className="flight-time">{end}</Text>
                          <Text className="airport-name">{arrCityName}</Text>
                        </View>
                      </View>
                      <Text className="flight-price color-red">¥ {100}</Text>
                    </View>
                    <View className="air-info">
                      {/* <Image className="logo" src={airIcon} /> */}
                      <Text className="company-name">{company}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            Array(7)
              .fill(0)
              .map((item) => {
                return <Skeleton row={3} action></Skeleton>;
              })
          )}
        </View>
        <View
          className={`flilter-btn ${allFlightList?.length ? "" : "hidden"}`}
        >
          <Picker
            range={company}
            value={curAirCompanyIndex}
            onChange={onAirCompanyChange}
          >
            筛选
          </Picker>
        </View>
      </View>
    </>
  );
}
