import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import { getCity } from "@/common/api";
import tools from "@/common/tools";
import CityItem from "../../components/cityItem";
import "./index.scss";

export default function Index() {
  const [cityObj, setCityObj] = useState({
    cityList: [],
    navList: [],
    currentLetter: "",
  });
  useEffect(() => {
    getCityList();
  }, []);
  const getCityList = async () => {
    try {
      tools.showLoading();
      const data = await getCity();
      const navList = Object.keys(data);
      setCityObj({
        cityList: data,
        navList,
      });
      tools.hideLoading();
    } catch (error) {
      console.log(error);
      tools.showToast("网络出现了问题");
      tools.hideLoading();
    }
  };
  const handleLetter = (item) => {
    setCityObj({
      ...cityObj,
      currentLetter: item,
    });
  };
  return (
    <View className="airport-list-container">
      <ScrollView
        scrollY
        scrollWithAnimation
        style={{ height: "100vh" }}
        scrollIntoView={cityObj.currentLetter}
      >
        {cityObj.navList?.map((item) => (
          <CityItem label={item} cityItem={cityObj.cityList[item]} />
        ))}
      </ScrollView>
      <View className="letter-container">
        {cityObj.navList?.map((item) => (
          <View
            key={item}
            className="letter-item"
            onClick={() => handleLetter(item)}
          >
            {item}
          </View>
        ))}
      </View>
    </View>
  );
}
