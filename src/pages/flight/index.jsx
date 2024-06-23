import { PureComponent, useEffect, useState } from "react";
import {
  View,
  SwiperItem,
  Text,
  Button,
  Swiper,
  Image,
  Switch,
  Input,
} from "@tarojs/components";
import { getBanner } from "@/common/api";
import { useSelector, useDispatch } from "react-redux";
import Taro, { useShareAppMessage } from "@tarojs/taro";

import NoExploit from "@/components/NoExploit";
import "./index.scss";
import dayjs from "dayjs";
import tools from "@/common/tools";

const FLIGHT_TABS = [
  {
    label: "单程",
    id: 0,
  },
  {
    label: "多程",
    id: 1,
  },
  {
    label: "往返",
    id: 2,
  },
];

export default function Index() {
  useEffect(() => {
    getBannerList();
    getUserPosition();
  }, []);
  const getBannerList = async () => {
    const result = await getBanner();
    setAdList(result);
  };
  const { arrCityName, dptCityName, cityType, dptDate, dptCityId, arrCityId } =
    useSelector((state) => state.fightIndex);
  const dispatch = useDispatch();

  const [adList, setAdList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isExchange, setIsExchange] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180914%2Ff4b0c16e207e4fd0b686bf378a62989c.jpg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633356232&t=99c2f5e1ceb1b611976b1e28608aeee7"
  );
  useShareAppMessage(() => {
    return {
      title: "我的行程分你一半，快乐同样分你一半～",
      imageUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180914%2Ff4b0c16e207e4fd0b686bf378a62989c.jpg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633356232&t=99c2f5e1ceb1b611976b1e28608aeee7",
      path: "/pages/index/index", // 分享卡片的小程序路径
    };
  });
  const handleCity = (type) => {
    dispatch({
      type: "fightIndex/updateStata",
      payload: {
        cityType: type,
      },
    });
    // 注意：使用app.config.js中注册的绝对路径，需要加/
    Taro.navigateTo({
      url: "/pages/airportList/index",
    });
  };
  const handleCalendar = () => {
    Taro.navigateTo({
      url: "/pages/calendar/index",
    });
  };
  const handleFilght = () => {
    tools.navigaeTo({
      url: "/pages/allFlight/index",
      data: {
        arrCityName,
        dptCityName,
        cityType,
        dptDate,
        dptCityId,
        arrCityId,
      },
    });
  };
  const handleChange = (e) => {
    const {
      detail: { value },
    } = e;
    setFlag(value);
    console.log(e);
  };
  const getUserPosition = () => {};
  const handleGetuserinfo = (e) => {
    console.log(e);
  };
  const getUserProfile = () => {
    Taro.getUserProfile({
      desc: "用于完善会员资料",
      success: (res) => {
        console.log(res);
      },
    });
  };
  const handleChooseAvatar = (e) => {
    const {
      detail: { avatarUrl },
    } = e;
    setAvatarUrl(avatarUrl);
  };
  return (
    <View className="flight-container">
      <View className="flight-top">
        {cityType}
        <View className="item station">
          <View
            className={`cell from ${isExchange ? "slide" : ""}`}
            onClick={() => handleCity("depart")}
          >
            {dptCityName}
          </View>
          <Text
            className={`icon-zhihuan iconfont ${isExchange ? "active" : ""}`}
          ></Text>
          <View
            className={`cell to ${isExchange ? "slide" : ""}`}
            onClick={() => handleCity("arrive")}
          >
            {arrCityName}
          </View>
        </View>
        <View onClick={handleCalendar} className="item date">
          {dayjs(dptDate).format(`M月D日`)}
        </View>
        <Button className="search-btn" onClick={handleFilght}>
          搜一下吧～
        </Button>
      </View>
      <View className="alipay-swiper" style={{ margin: "15px" }}>
        <Swiper className="advs-banner-bd" autoplay circular interval={3000}>
          {adList.map((item) => {
            return (
              <SwiperItem key={item.id} className="item">
                <Image className="img" src={item.imgUrl}></Image>
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
      <View>
        <Button type="primary" openType="share">
          分享
        </Button>
        {/* 无法获取用户数据 */}
        <Button
          type="primary"
          openType="getUserInfo"
          onGetUserInfo={handleGetuserinfo}
        >
          获取用户信息
        </Button>
        {/* 无法获取用户数据 */}
        <Button type="primary" onClick={getUserProfile}>
          获取用户信息2
        </Button>
        {/* 正确用法 */}
        <Button open-type="chooseAvatar" onChooseAvatar={handleChooseAvatar}>
          <image class="avatar" src={avatarUrl}></image>
        </Button>
        <Input type="nickname" class="weui-input" placeholder="请输入昵称" />
      </View>
      {/*  机票底部  */}
      <View className="flight-info"></View>
      <View>
        {flag && (
          <View>
            11111
            <View>23232</View>
            <View>23232</View>
            <View>23232</View>
            <View>23232</View>
            <View>23232</View>
            <View>23232</View> <View>23232</View>
            <View>23232</View>
            <View>23232</View> <View>23232</View>
            <View>23232</View>
          </View>
        )}
      </View>
      <Switch onChange={handleChange}></Switch>
    </View>
  );
}
