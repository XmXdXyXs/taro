import { useLaunch } from "@tarojs/taro";
import "./app.scss";
import dva from "./dva";
import models from "./models";
import { Provider } from "react-redux";
import "taro-skeleton/dist/index.css";

const dvaApp = dva.createApp({
  initialState: {},
  models,
});
const store = dvaApp.getStore();
function App({ children }) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return <Provider store={store}>{children}</Provider>;
}

export default App;
