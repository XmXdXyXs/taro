import { Component, useState } from "react";
import { View } from "@tarojs/components";
import "./index.scss";

import FlightIndex from "../flight/index";
import NoExploit from "../../components/NoExploit";

const DEFAULT_TAB_LIST = [
  { title: "飞船", tab: "flight", index: 0 },
  { title: "火车", tab: "tick", index: 1 },
];

function Index() {
  const [tabIndex, setTabIndex] = useState(0);
  const switchTab = (index) => {
    setTabIndex(index);
  };
  const innerStyle = {
    width: `${100 / DEFAULT_TAB_LIST.length}%`,
    transform: `translateX(${tabIndex * 100}%)`,
  };
  return (
    <View className="index-container">
      <View className="top">
        <View className="index-tab">
          {DEFAULT_TAB_LIST.map((item) => (
            <View
              key={item.tab}
              className={`index_tab_item ${item.tab} ${
                tabIndex === item.index ? "current" : ""
              }`}
              onClick={() => switchTab(item.index)}
            >
              {item.title}
            </View>
          ))}
        </View>
        <View className="scrollbar" style={innerStyle}></View>
      </View>
      {DEFAULT_TAB_LIST[tabIndex]["tab"] === "flight" ? (
        <FlightIndex />
      ) : (
        <NoExploit />
      )}
    </View>
  );
}
export default Index;
