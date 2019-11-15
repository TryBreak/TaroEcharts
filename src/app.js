import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";

class App extends Component {
  config = {
    pages: [
      "pages/index/index",
      "pages/Pie/Pie",
      "pages/Bar/Bar",
      "pages/Funnel/Funnel",
      "pages/Gauge/Gauge",
      "pages/Heatmap/Heatmap",
      "pages/Radar/Radar",
      "pages/Tree/Tree",
      "pages/Line/Line",
      "pages/Scatter/Scatter",
      "pages/Sunburst/Sunburst",
      "pages/Map/Map",
      "pages/Graph/Graph",
      "pages/K/K",
      "pages/Move/Move",
      "pages/More/More",
      "pages/Add/Add"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    }
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
