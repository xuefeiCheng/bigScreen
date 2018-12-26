<template>
  <div class="data mapTab">
    <div class="data-title">
      <div class="title-new fl" style="position:relative">
        <div class="tabBox">
          <div class="tabBox_flex">
            <div class="tabBox_flex_item tabBox_flex_item_active">
              <span class="item_font item_font_active">综合业务展示</span>
            </div>
             <div class="tabBox_flex_item">
            <a href="http://10.1.62.13:8231/bdp/#!/customBigScreen" target="_parent" >
             <span class="item_font">大数据平台展示</span>
            </a>
            </div>

            <div class="tabBox_flex_item">
            <a href="http://10.123.8.11:5000/#/jumpLogin" target="_parent" >
             <span class="item_font">互联网反诈展示</span>
            </a>
            </div>
          </div>
        </div>
        广西电信诈骗防范拦截系统
        <div class="timeBox">
           <div>{{localtime}}</div>
           <div>{{localdate}}</div>
        </div>
      </div>
    </div>
    <div class="data-content" ref="dataContent">
      <div class="content-left content-left-copy">
        <div class="content-left-item content-left-item-copy" :style="{height: leftItemHeight + 'px'}">
          <div class="content-left-item-title">总拦截量</div>
          <div class="content-left-item-con OOFD7E" id="zljl">{{ljzj}}</div>
          <img class="content-left-item-icon" src="static/img/icon5.png" alt="" >
        </div>
        <div class="content-left-item content-left-item-copy" :style="{height: leftItemHeight + 'px'}">
          <div class="content-left-item-title">被骚扰号码</div>
          <div class="content-left-item-con FFDE00" id="ztxl">{{txzj}}</div>
          <img class="content-left-item-icon" src="static/img/icon4.png" alt="" >
        </div>
        <div class="content-left-item content-left-item-copy" :style="{height: leftItemHeight + 'px'}">
          <div class="content-left-item-title">黑名单数量</div>
          <div class="content-left-item-con OODAFC">{{blackcount}}</div>
          <img class="content-left-item-icon" src="static/img/icon3.png" alt="" >
        </div>
        <div class="content-left-item content-left-item-copy" :style="{height: leftItemHeight + 'px'}">
          <div class="content-left-item-title">公检法号码数量</div>
          <div class="content-left-item-con OODAFC">{{checknumcount}}</div>
          <img class="content-left-item-icon" src="static/img/icon2.png" alt="" >
        </div>
        <div class="content-left-item content-left-item-copy" :style="{height: leftItemHeight + 'px'}">
          <div class="content-left-item-title">有害语音模板数量</div>
          <div class="content-left-item-con OODAFC">{{voicecount}}</div>
          <img class="content-left-item-icon" src="static/img/icon1.png" alt="" >
        </div>
      </div>
      <div class="content-right">
        <div class="info-concent" id="map"></div>
      </div>
      <div class="content-left2 content-left2-copy">
        <div class="content-left-box" :style="{height: rightItemHeight + 'px'}">
           <div class="left-box-title">运营商分类号码量</div>
           <div class="left-box-con" id="echart_bar" :style="{height: rightConHeight + 'px'}"></div>
        </div>
        <div class="content-left-box" :style="{height: rightItemHeight + 'px'}">
           <div class="left-box-title">短信分类号码量</div>
           <div class="left-box-con" id="echart_huan" :style="{height: rightConHeight + 'px'}"></div>
        </div>
      </div>

      <Modal v-model="gxModal" footer-hide :closable="false" class="wjzModal">
        <p slot="header" style="width: 100%;position: relative;">
          <span>{{mapTitle}}</span>
          <span style="position: absolute;top:0;right:0;cursor: pointer;" @click="closeModal">关闭</span>
        </p>
        <div id="gxMap"  class="hideLogo" style="width: 100%; height:400px"></div>
      </Modal>

    </div>
  </div>
</template>

<script>
import 'echarts/lib/echarts'
import 'echarts/map/js/china.js'
import CountUp from '@/utils/CountUp'
export default {
  name: 'test',
  data () {
    return {
      blackcount: 0,
      checknumcount: 0,
      voicecount: 0,
      localtime: '',
      localdate: '',
      ljzj_old: 0, // 总拦截量
      txzj_old: 0, // 被骚扰号码
      ljzj: 0, // 拦截来电总数
      txzj: 0, // 被骚扰号码总数
      actionindex: 0, // 定时切换的标识
      leftItemHeight: 0, // 左侧元素高度
      rightItemHeight: 0, // 右侧元素高度
      rightConHeight: 0,
      barData: [], // 堆积柱状图
      baroldData: [203, 489, 34, 970, 744, 230, 203, 489, 34, 970, 744, 230, 670], // 堆积柱状图
      barintervalid: 0, // 堆积柱状图的定时任务
      yysData: [], // 运营商柱状图
      yysoldData: [1020, 988, 573, 389], // 运营商柱状图
      yysintervalid: 0, // 运营商柱状图的定时任务
      settimeIntervalid: 0, // 时间的定时任务
      gxModal: false, // 弹出框
      mapTitle: ''
    }
  },
  created () {
    let dataHeight = document.documentElement.clientHeight // 内容区域高度
    this.rightConHeight = (dataHeight - 135) / 2 * 0.8
  },
  mounted () {
    this.initHeight()
    this.gettime()
    this.drawMap()
    this.drawBar()
    this.drawHuan()
    this.init()
    this.intervalid = setInterval(() => {
      this.getRandomNum()
      this.changeNum()
    }, 3000)
    this.settimeIntervalid = setInterval(() => {
      this.gettime()
    }, 2000)
  },
  methods: {
    // 初始数值，根据小时来算
    init () {
      let mydate = new Date()
      let newhour = mydate.getHours()
      this.ljzj = newhour * 11000 + parseInt(1000 * Math.random())
      this.txzj = newhour * 1000 + parseInt(100 * Math.random())
      var zljl =
       new CountUp('zljl', this.ljzj_old, this.ljzj, 0, 3)
      var ztxl = new CountUp('ztxl', this.txzj_old, this.txzj, 0, 3)
      zljl.start()
      ztxl.start()
    },
    // 重置提醒或拦截总数
    changeNum () {
      var zljl = new CountUp('zljl', this.ljzj_old, this.ljzj, 0, 3)
      var ztxl = new CountUp('ztxl', this.txzj_old, this.txzj, 0, 3)
      zljl.start()
      ztxl.start()
    },
    // 生成随机提醒或拦截总数
    getRandomNum () {
      var ln = parseInt(50 * Math.random())// 生成0-50的随机数
      this.ljzj_old = this.ljzj
      this.ljzj = this.ljzj + ln
      var tn = parseInt(8 * Math.random())// 生成0-8的随机数
      this.txzj_old = this.txzj
      this.txzj = this.txzj + tn
    },
    gettime () {
      var today = new Date()
      var hh = today.getHours()
      if (hh < 10) hh = '0' + hh
      var mm = today.getMinutes()
      if (mm < 10) mm = '0' + mm
      var ss = today.getSeconds()
      if (ss < 10) ss = '0' + ss
      this.localtime = hh + ':' + mm + ':' + ss
      this.localdate = this.showLocale(today)
    },
    showLocale (objD) {
      var str
      var yy = objD.getYear()
      if (yy < 1900) yy = yy + 1900
      var MM = objD.getMonth() + 1
      if (MM < 10) MM = '0' + MM
      var dd = objD.getDate()
      if (dd < 10) dd = '0' + dd
      var ww = objD.getDay()
      if (ww === 0) ww = '星期日'
      if (ww === 1) ww = '星期一'
      if (ww === 2) ww = '星期二'
      if (ww === 3) ww = '星期三'
      if (ww === 4) ww = '星期四'
      if (ww === 5) ww = '星期五'
      if (ww === 6) ww = '星期六'
      str = yy + '/' + MM + '/' + dd + ' ' + ww
      return (str)
    },
    // 生成柱状图的增量
    getbarRandomNum () {
      let _this = this
      _this.barData = []
      _this.baroldData.forEach(function (c) {
        var ln = c + parseInt(10 * Math.random())// 生成0-3的随机数
        _this.barData.push(ln)
      })
      _this.baroldData = _this.barData
    },
    // 生成运营商今天号码量柱状图的增量
    getyysRandomNum () {
      let _this = this
      _this.yysData = []
      _this.yysoldData.forEach(function (c) {
        var ln = c + parseInt(3 * Math.random())// 生成0-3的随机数
        _this.yysData.push(ln)
      })
      _this.yysoldData = _this.yysData
    },
    drawBar () { // 伪基站
      let myChart = this.$echarts.init(document.getElementById('echart_bar'))
      let _this = this
      _this.yysData = _this.yysoldData
      // 绘制图表
      myChart.setOption({
        title: '',
        tooltip: {},
        legend: {
          data: ['昨日号码量', '今日号码量'],
          y: 'bottom',
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: {
          data: ['移动', '联通', '电信', '其他'],
          axisLabel: {
            // rotate: 60,
            textStyle: {
              color: '#fff',
              fontSize: '18'
            }
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: '#fff'
              // fontSize: '16'
            }
          }
        },
        grid: {
          left: 55
        },
        series: [{
          name: '昨日号码量',
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            normal: {
              color: '#D38265',
              // barBorderRadius: [10, 10, 10, 10],
              label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                fontSize: '17'
              }
            }
          },
          data: [3500, 1020, 1100, 2010]
        }, {
          name: '今日号码量',
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            normal: {
              color: '#01d1fd',
              // barBorderRadius: [10, 10, 10, 10],
              label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                fontSize: '17'
              }
            }
          },
          data: _this.yysData
        } ]
      })
      window.addEventListener('resize', function () {
        _this.initHeight()
        myChart.resize()
      })

      _this.yysintervalid = setInterval(() => {
        _this.getyysRandomNum()
        myChart.setOption({
          series: [
            {
              data: [3500, 1020, 1100, 2010]
            },
            {
              data: _this.yysData
            }
          ]
        })
      }, 30000)
    },
    initHeight () {
      let dataHeight = this.$refs.dataContent.offsetHeight // 内容区域高度
      this.leftItemHeight = dataHeight / 5
      this.rightItemHeight = dataHeight / 2
      this.rightConHeight = dataHeight / 2 * 0.8
    },
    drawHuan () {
      let huanChart = this.$echarts.init(document.getElementById('echart_huan'))
      let _this = this
      _this.barData = _this.baroldData
      huanChart.setOption({
        angleAxis: {
          type: 'category',
          data: ['诈骗', '运营商广告', '医疗美容保健', '骚扰', '其他非法', '房地产及装修', '金融证券', '化妆卫浴', '服装鞋帽', '考试文凭', '电子电器', '餐饮娱乐休闲', '赌黑'],
          z: 10,
          axisLabel: {
            interval: 0,
            rotate: 30,
            textStyle: {
              color: '#fff',
              fontSize: '16'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radiusAxis: {
          z: 11,
          axisLabel: {
            interval: 0,
            rotate: 30,
            textStyle: {
              color: '#ff0',
              fontSize: '16'
            }
          }
        },
        polar: {
        },
        series: [{
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#c73c0b'
            }
          },
          data: _this.barData,
          coordinateSystem: 'polar'
        }]
      })

      window.addEventListener('resize', function () {
        _this.initHeight()
        huanChart.resize()
      })

      _this.barintervalid = setInterval(() => {
        _this.getbarRandomNum()
        huanChart.setOption({
          series: [
            {
              data: _this.barData
            }
          ]
        })
      }, 60000)
    },
    chartClick (param) {
      if (this.actionindex === 0) {
        this.mapTitle = '广西受骗用户地市分布图'
      } else {
        this.mapTitle = '广西施骗用户地市分布图'
      }
      this.gxModal = true
      this.$nextTick(() => { this.drowgx() })
    },
    drowgx () {
      let chart = document.getElementById('gxMap')
      let gxmyChart = this.$echarts.init(chart)
      let gxoption = {
        title: {
          show: false,
          text: '拦截号码',
          subtext: '',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: '3%',
          bottom: '7%',
          text: ['高', '低'],
          seriesIndex: 0,
          calculable: true,
          textStyle: {
            color: 'white',
            fontSize: 15
          },
          inRange: {
            color: ['#191970', '#6495ED', '#87CEFA']
          }
        },
        geo: {
          map: '广西',
          left: '15%',
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: '#fff',
                fontSize: 15
              }
            },
            emphasis: {
              show: false
            }
          },
          roam: true, // 是否开启鼠标缩放和平移漫游
          zoom: 1.1,
          itemStyle: {
            normal: {
              areaColor: '#6495ED',
              borderColor: '#F5F5F5'
            },
            emphasis: {
              areaColor: '#389BB7'
            }
          }
        },
        series: []
      }
      gxmyChart.setOption(gxoption)
      window.addEventListener('resize', function () {
        gxmyChart.resize()
      })
    },
    drawMap () { // 基于准备好的dom，初始化echarts实例
      let _this = this
      _this.changestate = 0
      let chinachart = document.getElementById('map')
      chinachart.removeAttribute('_echarts_instance_')// 加上这句
      let minigrateChart = this.$echarts.init(chinachart)
      let MinigrateOption = {
        title: {
          show: false,
          text: '拦截号码',
          subtext: '',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: '3%',
          bottom: '0%',
          text: ['高', '低'],
          seriesIndex: [0],
          calculable: true,
          textStyle: {
            color: 'white',
            fontSize: 15
          },
          inRange: {
            color: ['#191970', '#6495ED', '#87CEFA']
          }
        },
        geo: {
          map: 'china',
          left: '10%',
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: '#fff',
                fontSize: 15
              }
            },
            emphasis: {
              show: false
            }
          },
          roam: true, // 是否开启鼠标缩放和平移漫游
          zoom: 1.1,
          itemStyle: {
            normal: {
              areaColor: '#6495ED',
              borderColor: '#F5F5F5'
            },
            emphasis: {
              areaColor: '#389BB7'
            }
          }
        },
        series: []
      }
      minigrateChart.setOption(MinigrateOption)
      minigrateChart.on('click', this.chartClick)
      window.addEventListener('resize', function () {
        _this.initHeight()
        minigrateChart.resize()
      })
    },
    closeModal () {
      this.gxModal = false
    }

  },
  beforeDestroy () {
    // 清除定时器
    clearInterval(this.intervalid)
    clearInterval(this.barintervalid)
    clearInterval(this.yysintervalid)
    clearInterval(this.settimeIntervalid)
  }
}
</script>
