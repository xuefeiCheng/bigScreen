<template>
  <div class="data mapTab inter_mapTab">
    <Modal v-model="baiduModal" footer-hide :closable="false" class="wjzModal" :width='1200'>
      <p slot="header" style="width: 100%;position: relative; font-size:16px">
        <span>{{mapTitle}}</span>
        <span style="position: absolute;top:0;right:0;cursor: pointer;" @click="closeModal">关闭</span>
      </p>
      <div id="BigMap" ref="BigMap" style="width:1190px; height:500px"></div>
    </Modal>
    <div class="data-title">
      <div class="title-new fl" style="position:relative">
        <div class="tabBox tabBox_inter">
          <div class="tabBox_flex">
            <div class="tabBox_flex_item">
              <!-- <a href='' target="_parent" > -->
                <span class="item_font">综合业务展示</span>
              <!-- </a> -->
            </div>
            <div class="tabBox_flex_item">
              <!-- <a href='' target="_parent" > -->
                <span class="item_font">大数据平台展示</span>
              <!-- </a> -->
            </div>
            <div class="tabBox_flex_item tabBox_flex_item_active">
              <span class="item_font item_font_active">互联网反诈展示</span>
            </div>
          </div>
        </div>
        <div>
          <div class="inter_title">广西电信诈骗防范拦截系统</div>
          <div class="inter_desctitle">Guangxi Telecom Fraud Prevention and Interception System</div>
        </div>
        <div class="timeBox timeBox_inter">
          <div>{{localtime}}</div>
          <div>{{localdate}}</div>
        </div>
      </div>
    </div>
    <div class="inter_top_box">
      <div class="inter_top_boxL">
        <div class="inter_TBL_box_top">
          <div class="inter_TBL_box_top_item">
            <div class="box_title">僵尸木马事件总数</div>
            <div class="box_conent upColor"><span style="color:#00DAFC;font-size:22px;dispaly:inle-block;padding-right:5px" id="count1">{{count1}}</span><Icon type="md-arrow-up" color='#FF6823'/>20%</div>
          </div>
          <div class="inter_TBL_box_top_item">
            <div class="box_title">恶意程序事件总数</div>
            <div class="box_conent downColor"><span style="color:#00DAFC;font-size:22px;dispaly:inle-block;padding-right:5px" id="count2">{{count2}}</span><Icon type="md-arrow-down" color="#00DAFC"/>11%</div>
          </div>
          <div class="inter_TBL_box_top_item">
            <div class="box_title">僵尸木马事件总数</div>
            <div class="box_conent downColor"><span style="color:#00DAFC;font-size:22px;dispaly:inle-block;padding-right:5px" id="count3">{{count3}}</span><Icon type="md-arrow-down" color="#00DAFC"/>14%</div>
          </div>
        </div>
        <div class="inter_TBL_box_bottom">
          <div class="box_title border-self">
            <span class="cicle"></span><span>受害事件实时播报</span>
          </div>
          <div class="box_conent border-self">
            <div class="inter_table">
              <div class="inter_table_header">
                <ul>
                  <li>手机号</li>
                  <li>运营商</li>
                  <li>事件</li>
                  <li>事件详情</li>
                  <li>时间</li>
                </ul>
              </div>
              <transition name="list" v-if="transition">
                <div class="inter_table_body">
                  <div class="anim">
                    <ul v-for="(item, index) in tableData" :key="index">
                      <li>{{item.phone}}</li>
                      <li class="BLUE">{{item.yys}}</li>
                      <li class="ORANGE">{{item.event}}</li>
                      <li>{{item.detail | substr(12)}}</li>
                      <li class="YELLOW">{{item.time}}</li>
                    </ul>
                    <ul v-for="(item, index) in tableData" :key="'ID' + index">
                      <li>{{item.phone}} == </li>
                      <li class="BLUE">{{item.yys}}</li>
                      <li class="ORANGE">{{item.event}}</li>
                      <li>{{item.detail}}</li>
                      <li class="YELLOW">{{item.time}}</li>
                    </ul>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div class="border-self inter_top_boxM">
        <div class="inter_top_boxM_side">
          <div class="inter_box_absolute inter_box_absolute_l">
            <div class="box_title border-self">
              <span>僵尸木马事件地域分布图</span>
            </div>
            <div class="box_conent border-self">
              <div id='GxMap' style="width:100%;height:100%"></div>
            </div>
          </div>
        </div>
        <div class="inter_top_boxM_m">
          <div id='worldMap' style="width:100%;height:100%"></div>
        </div>
        <div class="inter_top_boxM_side">
          <div class="inter_box_absolute  inter_box_absolute_r">
            <div class="box_title border-self">
              <span>区域分布周统计</span>
            </div>
            <div class="box_conent border-self">
              <div id='chinaMap' style="width:100%;height:100%"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="inter_top_boxR">
        <!-- <div class="inter_TBR_box border-self"> -->
          <Carousel autoplay :autoplay-speed="8000" radius-dot :arrow="setting_arrow" class="inter_TBR_box border-self">
            <CarouselItem>
              <div class="box_title border-self-bottom">
                <span class="cicle"></span><span>受害运营商占比</span>
              </div>
              <div class="box_conent">
                <div id='YunYs' style="width:100%;height:100%"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="box_title border-self-bottom">
                <span class="cicle"></span><span>受害运行商占比</span>
              </div>
              <div class="box_conent">
                <div id='YunYsLine' style="width:100%;height:100%"></div>
              </div>
            </CarouselItem>
          </Carousel>
        <!-- </div> -->
        <div class="inter_block"></div>
        <!-- <div class="inter_TBR_box  border-self"> -->
          <Carousel autoplay :autoplay-speed="8000" radius-dot :arrow="setting_arrow" class="inter_TBR_box  border-self">
            <CarouselItem id="widtht">
              <div class="box_title border-self-bottom">
                <span class="cicle"></span><span>僵尸蠕事件 TOP10</span>
              </div>
              <div class="box_conent">
                <div id="top10" style="width:100%;height:100%;"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="box_title border-self-bottom">
                <span class="cicle"></span><span>僵尸蠕事件 TOP10</span>
              </div>
              <div class="box_conent">
                <div id="IPtop10" style="width:100%;height:100%;"></div>
              </div>
            </CarouselItem>
          </Carousel>
        <!-- </div> -->
      </div>
    </div>
    <div class="border-self inter_bottom_box">
      <div class="inter_bottom_box_items">
        <div id="bottom_1" style="width: 100%;height:100%;"></div>
      </div>
      <div class="inter_bottom_box_items">
        <div id="bottom_2" style="width: 100%;height:100%;"></div>
      </div>
      <div class="inter_bottom_box_items">
        <div id="bottom_3" style="width: 100%;height:100%;"></div>
      </div>
      <div class="inter_bottom_box_items" style="position:relative">
        <!-- <div class="inter_bottom_box_items_title">移动恶意事件类型次数统计</div> -->
        <div id="bottom_4" style="width: 100%;height:100%;"></div>
      </div>
      <div class="inter_bottom_box_items" style="position:relative">
        <!-- <div class="inter_bottom_box_items_title">恶意程序八大类占比图</div> -->
        <div id="bottom_5" style="width: 100%;height:100%;"></div>
      </div>
      <div class="inter_bottom_box_items">
        <div id="bottom_6" style="width: 100%;height:100%;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/echarts'
import 'echarts/map/js/china.js'
import 'echarts/map/js/world.js'
import 'echarts/map/js/province/guangxi.js'
import CountUp from '@/utils/CountUp'

const WORLDDATA = [
  {
    'value': [108.361543, 22.813007],
    'name': '中国'
  }
]
const CHINADATA = [
  {
    'value': [108.361543, 22.813007],
    'name': '广西'
  }
]
const GXDATA = [
  {
    'value': [109.602146, 23.0936],
    'name': '贵港市'
  },
  {
    'value': [109.702146, 25.1936],
    'name': '桂林市'
  },
  {
    'value': [109.802146, 24.0936],
    'name': '来宾市'
  },
  {
    'value': [109.74664, 22.576275],
    'name': '钦州市'
  },
  {
    'value': [109.17245, 25.03179],
    'name': '柳州市'
  },
  {
    'value': [106.621138, 23.90898],
    'name': '百色市'
  }
]
// 移动恶意事件类型次数统计
const LENDGE = ['信息窃取', '诱骗欺诈', '资费消耗', '流氓行为', '恶意扣费', '远程控制', '恶意传播']
const PIEDATA = [
  {
    value: 335,
    name: '信息窃取'
  },
  {
    value: 310,
    name: '诱骗欺诈'
  },
  {
    value: 234,
    name: '资费消耗'
  },
  {
    value: 135,
    name: '流氓行为'
  },
  {
    value: 1548,
    name: '恶意扣费'
  },
  {
    value: 1548,
    name: '远程控制'
  },
  {
    value: 1548,
    name: '恶意传播'
  }
]
// 恶意程序八大类占比图
const LENDGE_EIGHT = ['信息窃取', '诱骗欺诈', '资费消耗', '流氓行为', '恶意扣费', '远程控制', '恶意传播', '系统破坏']
const PIEDATA_EIGHT = [
  {
    value: 335,
    name: '信息窃取'
  },
  {
    value: 310,
    name: '诱骗欺诈'
  },
  {
    value: 234,
    name: '资费消耗'
  },
  {
    value: 135,
    name: '流氓行为'
  },
  {
    value: 1548,
    name: '恶意扣费'
  },
  {
    value: 1548,
    name: '远程控制'
  },
  {
    value: 1548,
    name: '恶意传播'
  },
  {
    value: 1548,
    name: '系统破坏'
  }
]
// const PIETITLEOPTION = {
//   text: '事件总数',
//   textStyle: {
//     color: '#fff',
//     fontWeight: 'normal',
//     fontSize: 14
//   },
//   x: '25%',
//   y: 'center'
// }
// 危害行为周统计
const BOTTOM_XDATA = ['仿冒工商银行', '仿冒中国移动']
const BOTTOM_DATAS = [[500, 560], [600, 680]]
// 事件变化趋势周统计（事件数）
const ECWCOUNTS = [[96.3, 96.4, 97.5, 95.6, 98.1, 94.8, 89.6], [90.6, 80.0, 91.5, 69.8, 67.5, 90.4, 84.9]]
// 事件变化趋势周统计(用户数)
const ECWCOUNTS_USER = [[95.3, 96.4, 97.5, 95.6, 97.1, 94.8, 86.6], [92.6, 81.0, 91.5, 79.8, 67.5, 90.4, 84.9]]
// 僵木蠕事件趋势图
const JMREVENTS = [[0, 7, 15, 18, 25, 30, 29], [0, 12, 15, 15, 16, 18, 17]]
// top10 事件源
const EVENT_TOP10 = {
  city: ['北京', '天津', '上海', '广州', '四川', '广西', '浙江', '辽宁', '哈尔滨', '海口'],
  data: [10, 15, 22, 28, 36, 43, 58, 60, 68, 78]
}
// top10 目的源
const TARGET_TOP10 = {
  city: ['上海', '天津', '北京', '广州', '哈尔滨', '广西', '浙江', '辽宁', '四川', '海口'],
  data: [14, 16, 22, 28, 36, 48, 51, 60, 75, 91]
}
const TABLEDATA = [
  {
    phone: '1',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '2',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '3',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '4',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件',
    time: '2018/12/20'
  },
  {
    phone: '5',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '6',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '7',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '8',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '9',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '10',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  }
]
const RETABLEDATA = [
  {
    phone: '--1',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '--2',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '--3',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '--4',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '--5',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '--6',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '--7',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '--8',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '--9',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  },
  {
    phone: '--10',
    yys: '中国移动',
    event: '网络诈骗',
    detail: '这是网络诈骗事件的详情内容',
    time: '2018/12/20'
  }
]
export default {
  name: 'interMap',
  data () {
    return {
      setting_arrow: 'never',
      localtime: '',
      localdate: '',
      baiduModal: false,
      mapTitle: '标题',
      count1_old: 0, // 总拦截量
      count2_old: 0, // 被骚扰号码
      count3_old: 0, // 被骚扰号码
      count1: 0, // 拦截来电总数
      count2: 0, // 被骚扰号码总数
      count3: 0, // 被骚扰号码总
      transition: true,
      tableData: TABLEDATA,
      tableF: true
    }
  },
  filters: {
    substr: function (value, length) {
      if (!value) return ''
      const le = value.length
      return value.substr(0, length) + (length < le ? '...' : '')
    }
  },
  mounted () {
    this.init()
    this.intervalid = setInterval(() => {
      this.getRandomNum()
      this.changeNum()
    }, 3000)
    this.tableIntervalid = setInterval(() => {
      this.set()
    }, 30 * 1000)
    this.settimeIntervalid = setInterval(() => {
      this.gettime()
    }, 2000)
    this.$nextTick(() => {
      const WIDTH = document.getElementById('widtht').offsetWidth
      const main = document.getElementById('top10')
      const IPTOP10 = document.getElementById('IPtop10')
      const YunYs = document.getElementById('YunYs')
      const YunYsLine = document.getElementById('YunYsLine')
      // 减去 padding值
      IPTOP10.style.width = main.style.width = YunYs.style.width = YunYsLine.style.width = WIDTH - 20 + 'px'
      this.drawTopByID('top10', EVENT_TOP10, {text: '僵尸木马事件源ip'})
      this.drawTopByID('IPtop10', TARGET_TOP10, {text: '僵尸木马目的ip'})
      this.drawYunYsLine()
      this.drawMapByType('YunYs', ['中国移动', '中国联通', '中国电信', '其他'], [{value: 335, name: '中国移动'}, {value: 310, name: '中国联通'}, {value: 234, name: '中国电信'}, {value: 135, name: '其他'}], '', '按事件数', {radius: '50%', center: ['40%', '60%']}, '', '')
    })
    this.drawBottom_1()
    this.drawBottom_23('bottom_2', '', ECWCOUNTS)
    this.drawBottom_23('bottom_3', '事件变化趋势周统计（用户数）', ECWCOUNTS_USER)
    this.drawBottom_6(JMREVENTS)
    this.drawMapByType('bottom_4', LENDGE, PIEDATA, '', '移动恶意事件类型次数统计', {radius: ['35%', '55%'], center: ['35%', '60%']}, '事件总数', 'big')
    this.drawMapByType('bottom_5', LENDGE_EIGHT, PIEDATA_EIGHT, '', '恶意程序八大类占比图', {radius: ['35%', '55%'], center: ['35%', '60%']}, '事件总数', 'big')
    this.drawMapByArea('worldMap', 'world', WORLDDATA, {show: true, title: '诈骗源国家分布周统计', mapTitle: '诈骗源国家分布周统计'}, 'world')
    this.drawMapByArea('GxMap', '广西', GXDATA, {show: false, title: '', mapTitle: '僵尸木马事件地域分布图'}, '广西')
    this.drawMapByArea('chinaMap', 'china', CHINADATA, {show: false, title: '', mapTitle: '区域分布周统计'}, 'china')
  },
  methods: {
    set () {
      this.transition = !this.transition
      this.tableF ? this.tableData = RETABLEDATA : this.tableData = TABLEDATA
      setTimeout(() => {
        this.transition = !this.transition
        this.tableF = !this.tableF
      }, 1000)
    },
    drawYunYsLine () {
      let myChart = this.$echarts.init(document.getElementById('YunYsLine'))
      let option = {
        title: {
          text: '按受害用户数',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 12,
            color: '#269fede8'
          },
          top: 0,
          left: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['业务一', '业务二', '业务三'],
          left: 'right',
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['区域一', '区域二', '区域三', '区域四', '区域五'],
          axisLine: {
            show: true,
            lineStyle: {
              color: '#57617B',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [
          {
            name: '业务一',
            type: 'bar',
            data: [500, 700, 300, 402, 356],
            barWidth: 8,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00da9c'
                }, {
                  offset: 1,
                  color: '#007a55'
                }]),
                opacity: 1
              }
            }
          },
          {
            name: '业务二',
            type: 'bar',
            data: [890, 480, 453, 564, 435],
            barWidth: 8,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#c4e300'
                }, {
                  offset: 1,
                  color: '#728400'
                }]),
                opacity: 1
              }
            }
          },
          {
            name: '业务三',
            type: 'bar',
            data: [100, 600, 563, 456, 654],
            barWidth: 8,
            // barGap: 1,// 设置柱图间距
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#2672cc'
                }, {
                  offset: 1,
                  color: '#503e8d'
                }]),
                opacity: 1
              }
            }
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drawBottom_23 (ID, title, data) {
      var myChart = this.$echarts.init(document.getElementById(ID))
      var option = {
        title: {
          text: title || '事件变化趋势周统计（事件数）',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['钓鱼网址', '违法网址'],
          right: 'right',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          data: ['1', '2', '3', '4', '5', '6', '7']
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: '钓鱼网址',
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(137, 189, 27, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(137, 189, 27, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)'
            }
          },
          data: data[0]
        }, {
          name: '违法网址',
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 136, 212, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 136, 212, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(0,136,212)'
            }
          },
          data: data[1]
        }]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drawMapByType (ID, legend, data, titleOption, title, position, text, titltStyle) {
      let myChart = this.$echarts.init(document.getElementById(ID))
      let privateT = {
        text: title,
        textStyle: {
          fontWeight: 'normal',
          fontSize: 12,
          color: '#269fede8'
        },
        top: 0,
        left: 10
      }
      let privateTBig = {
        text: title || '标题',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 16,
          color: '#F1F1F3'
        },
        top: 10,
        left: 10
      }
      let titleOptionPrivate = titltStyle !== '' ? privateTBig : privateT
      let option = {
        title: titleOption ? titleOption !== '' : titleOptionPrivate,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          bottom: 0,
          data: legend,
          itemGap: 5,
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        graphic: {
          type: 'text',
          // 这是四个相对于父元素的定位属性，每个属性可取『像素值』或者『百分比』或者 'center'/'middle'。
          // right: 10,
          // bottom: '10%',
          left: '26%', // 相对父元素居中
          top: '55%', // 相对父元素居中
          // 可设置颜色 字体等等
          style: {
            fill: 'white', // text颜色
            text: text || '',
            font: '14px Microsoft YaHei'
          }
        },
        color: ['#3AA7F9', '#F56C7C', '#FD9A36', '#EBE028', '#31CE65', '#20DACD', '#D671F5', '#F430E8', '#8A31FB'],
        series: [{
          name: '事件：',
          type: 'pie',
          radius: position.radius,
          center: position.center,
          data: data,
          itemStyle: {
            normal: {
              label: {
                formatter: '{d}%'
              },
              labelLine: {
                show: true
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drawMapByArea (ID, Areaname, data, others, flag) {
      let _this = this
      let minigrateChart = this.$echarts.init(document.getElementById(ID))
      minigrateChart.clear()
      let ColorMap = {
        '0': 'rgba(241, 109, 115, .8)',
        '1': 'rgba(255, 235, 59, .7)',
        '2': 'rgba(147, 235, 248, 1)',
        '3': '#3AA7F9',
        '4': '#F56C7C',
        '5': '#FD9A36',
        '6': '#EBE028',
        '7': '#31CE65',
        '8': '#20DACD',
        '9': '#D671F5',
        '10': '#F430E8',
        '11': '#8A31FB'
      }
      let MinigrateOption = {
        title: {
          show: others.show,
          text: others.title || '',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          top: 20,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} ：{b}'
        },
        geo: {
          map: Areaname,
          label: {
            normal: {
              show: false, // 是否显示对应地名
              textStyle: {
                color: '#fff'
              }
            },
            emphasis: {
              show: false

            }
          },
          roam: true, // 是否开启鼠标缩放和平移漫游
          zoom: 1.2,
          itemStyle: {
            normal: {
              borderColor: 'rgba(37, 142, 183, 1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(11, 37, 108, .5)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(11, 37, 108, 1)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(50, 137, 215, .34)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 18
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: '区域',
            type: 'effectScatter', // 配置显示方式为用户自定义
            rippleEffect: { // 涟漪特效相关配置。
              period: 4, // 动画的时间。
              scale: 4, // 动画中波纹的最大缩放比例。
              brushType: 'fill' // 波纹的绘制方式，可选 'stroke' 和 'fill'。
            },
            symbolSize: others.symbolSize || 5,
            coordinateSystem: 'geo',
            itemStyle: {
              normal: {
                color: function (params) {
                  return ColorMap[Math.floor(Math.random() * 11)]
                }
              }
            },
            data: data
          }
        ]
      }
      minigrateChart.setOption(MinigrateOption)
      window.addEventListener('resize', function () {
        minigrateChart.resize()
      })
      minigrateChart.on('click', function (params) {
        _this.mapTitle = others.mapTitle
        if (flag) {
          if (flag === '广西') {
            _this.drawMapByArea('BigMap', '广西', GXDATA, {show: false, mapTitle: '僵尸木马事件地域分布图', symbolSize: 15})
          } else if (flag === 'world') {
            _this.drawMapByArea('BigMap', 'world', WORLDDATA, {show: true, mapTitle: '诈骗源国家分布周统计', symbolSize: 15})
          } else if (flag === 'china') {
            _this.drawMapByArea('BigMap', 'china', CHINADATA, {show: false, mapTitle: '区域分布周统计', symbolSize: 15})
          }
        }
        setTimeout(() => {
          _this.baiduModal = true
        }, 20)
      })
    },
    closeModal () {
      this.baiduModal = false
      // const content = this.$refs.BigMap
    },
    drawBottom_6 (data) {
      var myChart = this.$echarts.init(document.getElementById('bottom_6'))
      var option = {
        title: {
          text: '僵木蠕事件趋势图',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['僵尸木马', '蠕虫'],
          right: 'right',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          data: ['1', '2', '3', '4', '5', '6', '7']
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: '僵尸木马',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12
            }
          },
          data: data[0] || [0, 7, 15, 18, 25, 30, 29]
        }, {
          name: '蠕虫',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(219,50,51)',
              borderColor: 'rgba(219,50,51,0.2)',
              borderWidth: 12
            }
          },
          data: data[1] || [0, 12, 15, 15, 16, 18, 17]
        }]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drawBottom_1 () {
      var myChart = this.$echarts.init(document.getElementById('bottom_1'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '危害行为周统计',
          top: 10,
          left: 10,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          }
        },
        // backgroundColor: '#00265f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['事件数', '涉及用户数'],
          align: 'left',
          top: 0,
          right: 'right',
          textStyle: {
            color: '#fff'
          },
          itemWidth: 10,
          itemHeight: 10
          // itemGap: 35
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: BOTTOM_XDATA,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#57617B',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [
          {
            name: '事件数',
            type: 'bar',
            data: BOTTOM_DATAS[0],
            barWidth: 10,
            barGap: 1,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00da9c'
                }, {
                  offset: 1,
                  color: '#007a55'
                }]),
                opacity: 1
              }
            }
          },
          {
            name: '涉及用户数',
            type: 'bar',
            data: BOTTOM_DATAS[1],
            barWidth: 10,
            barGap: 1,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#c4e300'
                }, {
                  offset: 1,
                  color: '#728400'
                }]),
                opacity: 1
              }
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drawTopByID (ID, data, others) {
      var myChart = this.$echarts.init(document.getElementById(ID))
      var Color = ['#3b7186', '#2e8d94', '#637b69', '#789b6f',
        '#3b64a6', '#2672cc', '#503e8d', '#5d3ec5',
        '#874f5f', '#b6575c', '#623363', '#962e66'
      ]
      var option = {
        title: {
          text: others.text,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 12,
            color: '#269fede8'
          },
          top: 0,
          left: 10
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{b}: {c0}',
          backgroundColor: 'rgba(0,0,0,0.7)', // 背景
          padding: [8, 10], // 内边距
          extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', // 添加阴影
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'value',
          axisTick: {show: false},
          axisLine: {show: false},
          splitLine: {show: false},
          axisLabel: {show: false}
        },
        yAxis: {
          type: 'category',
          axisLine: {show: false},
          splitLine: {show: false},
          axisTick: {show: false},
          splitArea: {show: false},
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontSize: '12'
            }
          },
          data: data.city || ['北京', '天津', '上海', '广州', '四川', '广西', '浙江', '辽宁', '哈尔滨', '海口']
        },
        series: [{
          name: others.others,
          type: 'bar',
          itemStyle: {
            normal: {
              show: true,
              color: function (params) {
                var colorList = []
                for (var i = 11; i > 0; i--) {
                  colorList.push({
                    type: 'bar',
                    colorStops: [
                      {
                        offset: 0,
                        color: Color[i - 2] // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: Color[i - 1] // 100% 处的颜色
                      }],
                    globalCoord: false // 缺省为 false
                  })
                }
                return colorList[params.dataIndex]
              },
              barBorderRadius: 50,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '50%',
          data: data.data || [12, 32, 91, 34, 76, 20, 22, 34, 56, 78]
        }]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
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
    // 初始数值，根据小时来算
    init () {
      let mydate = new Date()
      let newhour = mydate.getHours()
      this.count1 = newhour * 200 + parseInt(100 * Math.random())
      this.count2 = newhour * 100 + parseInt(100 * Math.random())
      this.count3 = newhour * 100 + parseInt(100 * Math.random())
      var count1 = new CountUp('count1', this.count1_old, this.count1, 0, 3)
      var count2 = new CountUp('count2', this.count2_old, this.count2, 0, 3)
      var count3 = new CountUp('count3', this.count3_old, this.count3, 0, 3)
      count1.start()
      count2.start()
      count3.start()
    },
    // 重置提醒或拦截总数
    changeNum () {
      var count1 = new CountUp('count1', this.count1_old, this.count1, 0, 3)
      var count2 = new CountUp('count2', this.count2_old, this.count2, 0, 3)
      var count3 = new CountUp('count3', this.count3_old, this.count3, 0, 3)
      count1.start()
      count2.start()
      count3.start()
    },
    // 生成随机提醒或拦截总数
    getRandomNum () {
      var ln = parseInt(50 * Math.random()) // 生成0-10的随机数
      this.count1_old = this.count1
      this.count1 = this.count1 + ln
      var tn = parseInt(8 * Math.random()) // 生成0-10的随机数
      this.count2_old = this.count2
      this.count2 = this.count2 + tn
      var tnn = parseInt(8 * Math.random()) // 生成0-10的随机数
      this.count3_old = this.count3
      this.count3 = this.count3 + tnn
    }
  },
  beforeDestroy () {
    // 清除定时器
    clearInterval(this.intervalid)
    clearInterval(this.settimeIntervalid)
    clearInterval(this.tableIntervalid)
  }
}
</script>

<style>
/** 插入过程 **/
  .list-enter-active{
    transition: all 1s;
  }
  /** 移除过程 **/
  .list-leave-active {
    transition: all 1s;
  }
  /*** 开始插入、移除结束的位置变化 ***/
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  @keyframes rowup {
    0% {
        -webkit-transform: translate3d(0, 25px, 0);
        transform: translate3d(0, 25px, 0);
    }
    100% {
        -webkit-transform: translate3d(0, -470px, 0);
        transform: translate3d(0, -470px, 0);
    }
}
  .anim {
    animation: 20s rowup linear infinite normal;
    transition: all 0.5s;
    position: relative;
  }
</style>
