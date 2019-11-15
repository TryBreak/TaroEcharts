# TaroEcharts 仓库介绍

因为原本的[官方仓库](https://github.com/WsmDyj/echarts-for-taro)拉下来之后根本无法成功运行 , 为方便以后查看 , 所以用自己开发的[小程序模板](https://github.com/meichangliang/Public_Taro_MiniPrograms_TS)集成了该 demo

以下是 `README.md` 的原文

## TaroEcharts 简介

本项目是在实际开发中总结出来的一套基于 ec-canvas 封装的适用于 Taro 版本的图表框架。开发者可以通过简单的配置及 React 的语法，快速开发图表，满足各种可视化需求。

#### 微信小程序预览：

![TaroECharts Demo](https://user-gold-cdn.xitu.io/2019/1/17/1685a1063cc8a9bf?w=439&h=413&f=png&s=106489)

## 实现过程

### 1 下载

为了兼容小程序 Canvas，我们首先去构建 ec-canvas 下载到本地。其中 ec-canvas 是 echarts 官网提供的组件，我们可以自行下载或者去[官网自定义构建](https://echarts.baidu.com/builder.html)选择自己需要的图表或插件进行下载。

### 2 引入组件

在项目中引入我们需要的组件库，这里统一将其放在`src/components/ec-canvas`文件夹下。大家可将[该文件夹](https://github.com/WsmDyj/echarts-for-taro/tree/master/src/components/ec-canvas)导入到自己项目中去。其中 echarts.js 就是刚我们自行下载的 echarts 图表插件，可根据实际项目需求自定义下载所需图表然后将其导入。

### 3 创建图表(以饼图为例)

### 3.1 新建图表组件

在`components`文件夹下创建`pieCharts.js`组件。引入我们刚创建的组件

> import \* as echarts from "./ec-canvas/echarts";

### 3.2 懒加载渲染图表

配置我们的 ec-canvas

```
config = {
    usingComponents: {
        "ec-canvas": "./ec-canvas/ec-canvas"
    }
};
```

在 render 函数中使用刚导入的 ec-canvas

```
<ec-canvas
    ref={this.refChart}
    canvas-id="mychart-area"
    ec={this.state.ec}
/>
```

构建 refresh 函数初始化图表

```
refresh(data) {
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setChartData(chart, data);
      return chart;
    });
  }

  refChart = node => (this.Chart = node);
```

配置懒加载图表

```
state = {
    ec: {
      lazyLoad: true
    }
 };
```

### 3.3 配置我们所需图表的 option

这里在 setChartData 进行配置，并传入 charts,data 参数。

```

function setChartData(chart, data) {
  let option = {
    series : [
      {
        name: '访问来源',
        type: 'pie',
        center: ['50%', '50%'],
        radius: [0, '60%'],
        data: data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  chart.setOption(option);
}
```

至此饼图已经创建完成，具体的可参考[饼图](https://github.com/WsmDyj/echarts-for-taro/blob/master/src/components/PieChart.js)

## 4 实例化图表

在需要图表的页面中导入刚创建的图表([饼图](https://github.com/WsmDyj/echarts-for-taro/blob/master/src/pages/Pie/Pie.js))

> import PieChart from "../../components/PieChart";

render 函数中导入

```
<PieChart ref={this.refPieChart} />
```

实例化图表并传入 data

```
componentDidMount() {
    const chartData = [
      {value:335, name:'直接访问'},
      {value:310, name:'邮件营销'},
      {value:234, name:'联盟广告'},
      {value:135, name:'视频广告'},
      {value:1548, name:'搜索引擎'}
    ];
    this.pieChart.refresh(chartData);
  }
  refPieChart = (node) => this.pieChart = node
```

至此饼图已经创建完成，饼图如此其他的都是类似的。只要照着这个方式去设置 option,我们就可以创建你想要的图表了。

## FAQ

### 可滑动的图表？

添加配置 dataZoom 可对图表进行缩放达到滑动的效果，可以参考 `pages/Move/Move` 的写法。

### 多图表结合在一起？

参见 `pages/More/More` 的例子，可以在获取数据后再初始化数据。

### 如何在一个页面中加载多个图表？

参见 `pages/Add/Add` 的例子。

## 结束语

> 请忽略`eslint`的波浪线
