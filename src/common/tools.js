import Taro from "@tarojs/taro";
import { formatSearchStr } from "./utils";
const tools = {
  /**
   * 网络请求
   * @{param}	 opts
   */
  request: (opts) => {
    const {
      url = "",
      params = {}, // 请求参数
      method = "GET",
      ...rest // 剩余参数
    } = opts;
    return new Promise((resolve, reject) => {
      Taro.request({
        url,
        data: params,
        method,
        ...rest,
      })
        .then((res) => {
          const { data } = res;
          if (data?.code === 1) {
            // 成功
            resolve(data.result);
          } else {
            // 不是预期的结果
            reject(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  /**
   * 页面loading
   * @{param}
   */
  showLoading: (param = "") => {
    let dptOpts = {
      title: "加载中...",
      mask: true, // 防止触摸穿透
    };
    if (Object.prototype.toString.call(param) === "[object String]") {
      dptOpts.title = param;
    } else if (Object.prototype.toString.call(param) === "[object Object]") {
      dptOpts = {
        ...dptOpts,
        ...param,
      };
    }
    return Taro.showLoading(dptOpts);
  },
  hideLoading: () => {
    Taro.hideLoading();
  },
  /**
   * 页面提示
   * @{param}
   */
  showToast: (param) => {
    let dptOpts = {
      title: "温馨提示", // 提示内容
      icon: "none",
      mask: true,
      duration: 2000, // 提示时间
    };
    if (Object.prototype.toString.call(param) === "[object String]") {
      dptOpts.title = param;
    } else if (Object.prototype.toString.call(param) === "[object Object]") {
      dptOpts = {
        ...dptOpts,
        ...param,
      };
    } else {
      throw new Error("参数类型有误，应该是字符串或者对象");
    }
    return Taro.showToast(dptOpts);
  },
  /**
   * {string} url 跳转路径
   * {object} data
   */
  navigaeTo: ({ url, data }) => {
    let seatchStr = formatSearchStr(data);
    let urlLink = seatchStr ? `${url}?${seatchStr}` : url;
    Taro.navigateTo({
      url: urlLink,
    });
  },
};

export default tools;
