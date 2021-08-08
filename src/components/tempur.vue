<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/StudentHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>志愿填报</el-breadcrumb-item>
        <el-breadcrumb-item>院校查询</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
      <el-card>
        <!--所在地-->
        <div class="schoolPosition">
          <span class="demonstration">院校所在地 </span>
          <el-cascader
              placeholder="试试搜索：北京"
              :options="options"
              v-model="ccc"
              :props="{ multiple: true }"
              filterable
              @change="vvv"
              ref="qqq"></el-cascader>
        </div>
        <!--等级-->
      </el-card>

    </el-main>

  </el-container>
</template>

<script>
import * as arr from "core-js";

export default {
  name: "StudentInf",
  data(){
    return {
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致',
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      checkboxGroup1: [''],
      cities: ['211', '985'],
      ccc:[]
    }
  },
  methods:{
    vvv(){
      var arrEnd = [];
      var obj1 = {};
      var obj2={};
      var obj3={};
      arr.forEach((item,index)=>{
        if(obj1[item[0]]){
          //该省份已插入，直接下一步
          if(obj2[item[2]]){
            //该市已插入，直接下一步
            if(obj3[item[4]]){
              //该县已插入，不操作
            }else{
              //该县未插入
              obj3[item[4]] = 1
              arrEnd[arrEnd.length-1].c[arrEnd[arrEnd.length-1].c.length-1].c.push(
                  {v:item[4],n:item[5]}
              )
            }
          }else{
            //该市未插入，先插入再下一步
            obj2[item[2]] = 1
            arrEnd[arrEnd.length-1].c.push(
                {v:item[2],n:item[3],c:[]}
            )

            if(obj3[item[4]]){
              //该县已插入，不操作
            }else{
              //该县未插入
              obj3[item[4]] = 1
              arrEnd[arrEnd.length-1].c[arrEnd[arrEnd.length-1].c.length-1].c.push(
                  {v:item[4],n:item[5]}
              )
            }
          }
        }else{
          //该省份未插入，先插入省再下一步
          obj1[item[0]] = 1
          arrEnd.push({v:item[0],n:item[1],c:[]})

          if(obj2[item[2]]){
            //该市已插入，直接下一步
            if(obj3[item[4]]){
              //该县已插入，不操作
            }else{
              //该县未插入
              obj3[item[4]] = 1
              arrEnd[arrEnd.length-1].c[arrEnd[arrEnd.length-1].c.length-1].c.push(
                  {v:item[4],n:item[5]}
              )
            }
          }else{
            //该市未插入，先插入再下一步
            obj2[item[2]] = 1
            arrEnd[arrEnd.length-1].c.push(
                {v:item[2],n:item[3],c:[]}
            )

            if(obj3[item[4]]){
              //该县已插入，不操作
            }else{
              //该县未插入
              obj3[item[4]] = 1
              arrEnd[arrEnd.length-1].c[arrEnd[arrEnd.length-1].c.length-1].c.push(
                  {v:item[4],n:item[5]}
              )
            }
          }
        }
      })
      console.log(JSON.stringify(arrEnd))

    }
  }

}

</script>

<style scoped>
.CheckBoxBackground
{
  height:370px;
  background-color: #54D7BCFF;
  border-radius:15px;
  position:absolute;
  top:10%;
  right:3%;
  left:3%;
}

.cityChange
{
  position:absolute;
  top:.3rem;
  right:3%;
  left:3%;
}

.chargeChange
{
  position:absolute;
  top:2rem;
  right:3%;
  left:3%;
}

.typeChange
{
  position:absolute;
  top:3rem;
  right:3%;
  left:3%;
}

.layerChange
{
  position:absolute;
  top:4rem;
  right:3%;
  left:3%;
}

.featureChange
{
  position:absolute;
  top:5rem;
  right:3%;
  left:3%;
}

.FeatureS
{
  position:absolute;
  top:6rem;
  right:3%;
  left:3%;
}
.result{
  position: absolute;
  top: 50%;
}
</style>