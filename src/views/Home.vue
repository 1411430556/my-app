<template>
  <div>
    <el-row>

      <!--左侧区域-->
      <el-col :span="8" style="padding-right: 10px">
        <el-card class="box-card" shadow="hover">
          <div class="user">
            <!--<img src="../assets/images/user.png" alt="">-->
            <el-avatar :size="150" :src="avatar"></el-avatar>
            <div class="userinfo">
              <p class="name">🌱</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="login-info">
            <p>登录时间：<span>{{ date }}</span></p>
            <p>登录地点：<span>成都</span></p>
          </div>
        </el-card>

        <el-card style="margin-top: 20px; height: 460px" shadow="hover">
          <el-table
              :data="tableData"
              stripe
              max-height="335"
              style="width: 100%">
            <el-table-column v-for=" (val, key, index) in tableLabel" :prop="key" :label="val" :key="index"/>
          </el-table>
        </el-card>

      </el-col>

      <!--右侧区域-->
      <el-col :span="16" style="padding-left: 10px;">
        <div class="num">
          <!--这里去除卡片组件的内边距，因为elementUI组件的样式优先级很高，所以得设置在这里-->
          <el-card v-for="item in countData" :key="item.name" shadow="hover"
                   :body-style="{display: 'flex', padding: 0}">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{backgroundColor: item.color}"></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!--折线图-->
        <el-card style="height: 280px;" shadow="hover">
          <div ref="echarts1" style="height: 280px;"></div>
        </el-card>
        <div class="graph">
          <!--柱状图-->
          <el-card style="height: 290px; width: 48%;" shadow="hover">
            <div ref="echarts2" style="height: 290px"></div>
          </el-card>

          <!--饼状图-->
          <el-card style="height: 290px; width: 48%;" shadow="hover">
            <div ref="echarts3" style="height: 240px"></div>
          </el-card>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { getData } from '@/api'
import * as echarts from 'echarts'

export default {
  name: 'Home',

  data () {
    return {
      // 头像链接
      avatar: 'http://rsbtei8vb.hd-bkt.clouddn.com/background/%E5%BE%AE%E4%BF%A1%E5%A4%B4%E5%83%8F.png',
      tableData: [],
      tableLabel: {
        name: '型号',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买',
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
      ],
    }
  },

  computed: {
    date () {
      return this.$moment().format('YYYY-MM-DD')
    },
  },

  mounted () {
    getData().then(({ data }) => {
      const { tableData } = data.data
      // console.log(data.data)
      this.tableData = tableData

      // 基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 统一设置图表自适应窗口大小变化
      window.addEventListener('resize', function () {
        echarts1.resize()
        echarts2.resize()
        echarts3.resize()
      })
      // {折线图}
      // 指定图表的配置项和数据
      const echarts1Option = {}
      // 鼠标放图表上显示数据
      echarts1Option.tooltip = {
        trigger: 'axis',
      }
      // 处理数据
      const { orderData, userData, videoData } = data.data
      const xAxis = Object.keys(orderData.data[0])
      echarts1Option.xAxis = {
        data: orderData.date,
      }
      // x轴应该是date：option.xAxis.data: orderData.date
      echarts1Option.yAxis = {}
      echarts1Option.legend = {
        data: xAxis,
      }
      echarts1Option.series = []
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line',
        })
      })
      // 使用刚指定的配置项和数据显示图表。
      echarts1.setOption(echarts1Option)

      // {柱状图}
      const echarts2 = echarts.init(this.$refs.echarts2)
      const echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: '#333',
          },
        },
        grid: {
          left: '20%',
        },
        // 提示框
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category', // 类目轴
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3',
            },
          },
          axisLabel: {
            interval: 0,
            color: '#333',
          },
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3',
              },
            },
          },
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar',
          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar',
          },
        ],
      }
      echarts2.setOption(echarts2Option)

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3Option = {
        tooltip: {
          trigger: 'item',
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf',
        ],
        series: [
          {
            data: videoData,
            type: 'pie',
          }
        ],
      }
      echarts3.setOption(echarts3Option)
    })
  },
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;

  .el-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }

  .userinfo {

    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999;
    }
  }
}

.login-info {

  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;

    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }

  .detail {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 15px;

    .price {
      font-size: 30px;
      margin-bottom: 10px;
      height: 30px;
      line-height: 30px;
    }

    .desc {
      font-size: 14px;
      //text-align: center;
      color: #999;
    }
  }

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
