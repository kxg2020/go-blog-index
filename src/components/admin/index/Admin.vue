<template>
    <div>
        <div id="chart" :style="{width: fullWidth, height: fullHeight+'px'}">

        </div>
    </div>
</template>

<script>
  const echarts = require('echarts');
  export default {
    name: "Admin",
    data(){
      return{
        fullWidth:window.innerWidth,
        fullHeight:document.documentElement.clientHeight - 150
      }
    },
    methods:{
      drawLine(){
        let myChart = echarts.init(document.getElementById('chart'));
        let data = [];

        for (let i = 0; i <= 360; i++) {
          let t = i / 180 * Math.PI;
          let r = Math.sin(2 * t) * Math.cos(2 * t);
          data.push([r, i]);
        }

        // 绘制图表
        myChart.setOption({
          title: {
            text: '极坐标双数值轴'
          },
          legend: {
            data: ['line']
          },
          polar: {
            center: ['50%', '54%']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          angleAxis: {
            type: 'value',
            startAngle: 0
          },
          radiusAxis: {
            min: 0
          },
          series: [{
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }],
          animationDuration: 2000
        });
      }
    },
    mounted(){
      this.drawLine()
  }
  }
</script>

<style scoped>

</style>