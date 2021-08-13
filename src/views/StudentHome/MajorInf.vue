<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/StudentHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>志愿填报</el-breadcrumb-item>
        <el-breadcrumb-item>专业查询</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-card>
      <div>
        <el-space :size="40">
          <el-space alignment="flex-start" :size="25">
            <!--专业筛选-->
            <div class="schoolPosition">
              <el-space wrap :size="33">
                <span class="demonstration">专业筛选 </span>
                <el-cascader
                    placeholder="试试搜索：计算机类"
                    :options="options"
                    :props="{ multiple: true }"
                    filterable
                    collapse-tags
                    ref="cascadeAddr"
                    clearable
                    @change="submit"></el-cascader>
              </el-space>
            </div>

            <!--层级-->
            <div>
              <el-space  wrap :size="43">
                <span class="demonstration">专业层级 </span>
                <el-radio-group v-model="selForm.level1_name" @change="submit">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="本科"></el-radio-button>
                  <el-radio-button label="专科"></el-radio-button>
                </el-radio-group>
              </el-space>

            </div>
            <!--搜索-->
            <el-space>
              <el-input
                  placeholder="请输入专业名称"
                  v-model="selForm.FuzzyString"
                  clearable>
              </el-input >
              <el-button icon="el-icon-search" @click="searchSchool" type="primary"></el-button>
            </el-space>
          </el-space>
        </el-space>
        <el-divider></el-divider>
        <!--查询结果-->
        <el-table
            :data="schoolList"
            border stripe
            highlight-current-row
            @change="submit"
            max-height="700"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}">
          <el-table-column label="大类代码" prop="id"></el-table-column>
          <el-table-column label="大类名称" prop="type"></el-table-column>
          <el-table-column label="专业代码" prop="code"></el-table-column>
          <el-table-column label="专业名称" prop="name"></el-table-column>
          <el-table-column label="专业层级" prop="level1_name"></el-table-column>
          <el-table-column label="学位名称" prop="degree"></el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
            @size-change="pageSizeChange"
            @current-change="pageCurrentChange"
            :current-page="selForm.pageNum"
            :page-sizes="[5, 50, 100]"
            :page-size= "selForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            background>
        </el-pagination>
      </div>
    </el-card>
  </el-container>
</template>

<script>
import { h } from 'vue'
import { ElDivider } from 'element-plus'
import * as echarts from "echarts";
import { getProvinceMapInfo } from "../../../utils/mapNameExchange";

export default {
  name: "MajorInf",

  data() {
    return {
      spacer: h(ElDivider, { direction: 'vertical' }),
      props: {multiple: true},
      options:[
            { label: "哲学",value: "01", children:[
                  { label: "哲学类", value: "0101"},
                ]},
            { label: "经济学",value: "02", children:[
                  { label: "经济学类", value: "0201"},
                  { label: "财政学类", value: "0202"},
                  { label: "金融学类", value: "0203"},
                  { label: "经济与贸易类", value: "0204"},

                ]},
            { label: "法学",value: "03", children:[
                  { label: "法学类", value: "0301"},
                  { label: "政治学类", value: "0302"},
                  { label: "社会学类", value: "0303"},
                  { label: "民族学类", value: "0304"},
                  { label: "马克思主义理论类", value: "0305"},
                  { label: "公安学类", value: "0306"},

                ]},
            { label: "教育学",value: "04", children:[
                  { label: "教育学类", value: "0401"},
                  { label: "体育学类", value: "0403"},

                ]},
            { label: "文学",value: "05", children:[
                  { label: "中国语言文学类", value: "0501"},
                  { label: "外国语言文学类", value: "0502"},
                  { label: "新闻传播学类", value: "0503"},

                ]},
            { label: "历史学",value: "06", children:[
                  { label: "历史学", value: "历史学类","undefined":"0601"},

                ]},
            { label: "理学",value: "07", children:[
                  { label: "数学类", value: "0701"},
                  { label: "物理学类", value: "0702"},
                  { label: "化学类", value: "0703"},
                  { label: "天文学类", value: "0704"},
                  { label: "地理科学类", value: "0705"},
                  { label: "大气科学类", value: "0706"},
                  { label: "海洋科学类", value: "0707"},
                  { label: "地球物理学类", value: "0708"},
                  { label: "地质学类", value: "0709"},
                  { label: "生物科学类", value: "0710"},
                  { label: "心理学类", value: "0711"},
                  { label: "统计学类", value: "0712"},

                ]},
            { label: "工学",value: "08", children:[
                  { label: "力学类", value: "0801"},
                  { label: "机械类", value: "0802"},
                  { label: "仪器类", value: "0803"},
                  { label: "材料类", value: "0804"},
                  { label: "能源动力类", value: "0805"},
                  { label: "电气类", value: "0806"},
                  { label: "电子信息类", value: "0807"},
                  { label: "自动化类", value: "0808"},
                  { label: "计算机类", value: "0809"},
                  { label: "土木类", value: "0810"},
                  { label: "水利类", value: "0811"},
                  { label: "测绘类", value: "0812"},
                  { label: "化工与制药类", value: "0813"},
                  { label: "地质类", value: "0814"},
                  { label: "矿业类", value: "0815"},
                  { label: "纺织类", value: "0816"},
                  { label: "轻工类", value: "0817"},
                  { label: "交通运输类", value: "0818"},
                  { label: "海洋工程类", value: "0819"},
                  { label: "航空航天类", value: "0820"},
                  { label: "兵器类", value: "0821"},
                  { label: "核工程类", value: "0822"},
                  { label: "农业工程类", value: "0823"},
                  { label: "林业工程类", value: "0824"},
                  { label: "环境科学与工程类", value: "0825"},
                  { label: "生物医学工程类", value: "0826"},
                  { label: "食品科学与工程类", value: "0827"},
                  { label: "建筑类", value: "0828"},
                  { label: "安全科学与工程类", value: "0829"},
                  { label: "生物工程类", value: "0830"},
                  { label: "公安技术类", value: "0831"},

                ]},
            { label: "农学",value: "09", children:[
                  { label: "植物生产类", value: "0901"},
                  { label: "自然保护与环境生态类", value: "0902"},
                  { label: "动物生产类", value: "0903"},
                  { label: "动物医学类", value: "0904"},
                  { label: "林学类", value: "0905"},
                  { label: "水产类", value: "0906"},
                  { label: "草学类", value: "0907"},

                ]},
            { label: "医学",value: "10", children:[
                  { label: "基础医学类", value: "1001"},
                  { label: "临床医学类", value: "1002"},
                  { label: "口腔医学类", value: "1003"},
                  { label: "公共卫生与预防医学类", value: "1004"},
                  { label: "中医学类", value: "1005"},
                  { label: "中西医结合类", value: "1006"},
                  { label: "药学类", value: "1007"},
                  { label: "中药学类", value: "1008"},
                  { label: "法医学类", value: "1009"},
                  { label: "医学技术类", value: "1010"},
                  { label: "护理学类", value: "1011"},

                ]},
            { label: "管理学",value: "11", children:[
                  { label: "管理科学与工程类", value: "1101"},
                  { label: "工商管理类", value: "1102"},
                  { label: "农业经济管理类", value: "1103"},
                  { label: "公共管理类", value: "1104"},
                  { label: "图书情报与档案管理类", value: "1105"},
                  { label: "物流管理与工程类", value: "1106"},
                  { label: "工业工程类", value: "1107"},
                  { label: "电子商务类", value: "1108"},
                  { label: "旅游管理类", value: "1109"},

                ]},
            { label: "艺术学",value: "12", children:[
                { label: "艺术学理论类", value: "1201"},
                { label: "音乐与舞蹈学类", value: "1202"},
                { label: "戏剧与影视学类", value: "1203"},
                { label: "美术学类", value: "1204"},
                { label: "设计学类", value: "1205"},

              ]},
            { label: "农林牧渔大类", value: "51", children: [
                { label: "农业类", value: "5101"},
                { label: "林业类", value: "5102"},
                { label: "畜牧业类", value: "5103"},
                { label: "渔业类", value: "5104"},
              ]},
            { label: "资源环境与安全大类", value: "52", children: [
                { label: "资源勘查类", value: "5201"},
                { label: "地质类", value: "5202"},
                { label: "测绘地理信息类", value: "5203"},
                { label: "石油与天然气类", value: "5204"},
                { label: "煤炭类", value: "5205"},
                { label: "金属与非金属矿类", value: "5206"},
                { label: "气象类", value: "5207"},
                { label: "环境保护类", value: "5208"},
                { label: "安全类", value: "5209"}
              ]},
            { label: "能源动力与材料大类", value: "53", children: [
                { label: "电力技术类", value: "5301"},
                { label: "热能与发电工程类", value: "5302"},
                { label: "新能源发电工程类", value: "5303"},
                { label: "黑色金属材料类", value: "5304"},
                { label: "有色金属材料类", value: "5305"},
                { label: "非金属材料类", value: "5306"},
                { label: "建筑材料类", value: "5307"},
              ]},
            { label: "土木建筑大类", value: "54", children: [
                { label: "建筑设计类", value: "5401"},
                { label: "城乡规划与管理类", value: "5402"},
                { label: "土建施工类", value: "5403"},
                { label: "建筑设备类", value: "5404"},
                { label: "建设工程管理类", value: "5405"},
                { label: "市政工程类", value: "5406"},
                { label: "房地产类", value: "5407"}
              ]},
            { label: "水利大类", value: "55", children: [
                { label: "水文水资源类", value: "5501"},
                { label: "水利工程与管理类", value: "5502"},
                { label: "水利水电设备类", value: "5503"},
                { label: "水土保持与水环境类", value: "5504"}
              ]},
            { label: "装备制造大类", value: "56", children: [
                { label: "机械设计制造类", value: "5601"},
                { label: "机电设备类", value: "5602"},
                { label: "自动化类", value: "5603"},
                { label: "轨道装备类", value: "5604"},
                { label: "船舶与海洋工程装备类", value: "5605"},
                { label: "航空装备类", value: "5606"},
                { label: "汽车制造类", value: "5607"}
              ]},
            { label: "生物与化工大类", value: "57", children:[
                { label: "生物技术类", value: "5701"},
                { label: "化工技术类", value: "5702"},
              ]},
            { label: "轻工纺织大类", value: "58", children: [
                { label: "轻化工类", value: "5801"},
                { label: "包装类", value: "5802"},
                { label: "印刷类", value: "5803"},
                { label: "纺织服装类", value: "5804"}
              ]},
            { label: "食品药品与粮食大类", value: "59", children: [
                { label: "食品类", value: "5901"},
                { label: "药品与医疗器械类", value: "5902"},
                { label: "食品药品管理类", value: "5903"},
                { label: "粮食类", value: "5904"},
                { label: "粮食储检类", value: "5905"}
              ]},
            { label: "交通运输大类", value: "60", children: [
                { label: "铁道运输类", value: "6001"},
                { label: "道路运输类", value: "6002"},
                { label: "水上运输类", value: "6003"},
                { label: "航空运输类", value: "6004"},
                { label: "管道运输类", value: "6005"},
                { label: "城市轨道交通类", value: "6006"},
                { label: "邮政类", value: "6007"},
              ]},
            { label: "电子与信息大类", value: "61", children: [
                { label: "电子信息类", value: "6101"},
                { label: "集成电路类", value: "6102"},
                { label: "计算机类", value: "6103"},
                { label: "通信类", value: "6104"}
              ]},
            { label: "医药卫生大类", value: "62", children: [
                { label: "临床医学类", value: "6201"},
                { label: "中医药类", value: "6202"},
                { label: "护理类", value: "6203"},
                { label: "药学类", value: "6204"},
                { label: "医学技术类", value: "6205"},
                { label: "眼视光类", value: "6206"},
                { label: "康复治疗类", value: "6207"},
                { label: "公共卫生与卫生管理类", value: "6208"},
                { label: "人口与计划生育类", value: "6209"},
                { label: "健康管理与促进类", value: "6210"}
              ]},
            { label: "财经商贸大类", value: "63", children: [
                { label: "物流类", value: "6301"},
                { label: "财政税务类", value: "6301"},
                { label: "金融类", value: "6302"},
                { label: "财务会计类", value: "6303"},
                { label: "统计类", value: "6304"},
                { label: "经济贸易类", value: "6305"},
                { label: "工商管理类", value: "6306"},
                { label: "市场营销类", value: "6307"},
                { label: "电子商务类", value: "6308"}
              ]},
            { label: "旅游大类", value: "64", children: [
                { label: "旅游类", value: "6401"},
                { label: "餐饮类", value: "6402"}
              ]},
            { label: "文化艺术大类", value: "65", children: [
                { label: "艺术设计类", value: "6501"},
                { label: "表演艺术类", value: "6502"},
                { label: "民族文化艺术类", value: "6503"},
                { label: "文化服务类", value: "6504"}
              ]},
            { label: "新闻传播大类", value: "66", children: [
                { label: "新闻出版类", value: "6601"},
                { label: "广播影视类", value: "6602"},
              ]},
            { label: "教育与体育大类", value: "67", children: [
                { label: "教育类", value: "6701"},
                { label: "语言类", value: "6702"},
                { label: "文秘类", value: "6703"},
                { label: "体育类", value: "6704"},
              ]},
            { label: "公安与司法大类", value: "68", children: [
                { label: "公安管理类", value: "6801"},
                { label: "公安指挥类", value: "6802"},
                { label: "公安技术类", value: "6803"},
                { label: "侦查类", value: "6804"},
                { label: "法律实务类", value: "6805"},
                { label: "法律执行类", value: "6806"},
                { label: "司法技术类", value: "6807"},
                { label: "安全防范类", value: "6808"}
              ]},
            { label: "公共管理与服务大类", value: "69", children: [
                { label: "公共事业类", value: "6901"},
                { label: "公共管理类", value: "6902"},
                { label: "公共服务类", value: "6903"}
              ]},
      ],//不要打开！！！
      Switch: false,

      selForm:{
        type_detail:[],
        level1_name:'全部',
        pageNum: 1,
        pageSize: 50,
        FuzzyString: ''
      },
      schoolList:[],
      total: 0,
      spaceSize:20,

    }
  },
  mounted() {
    this.submit();
  },
  methods:{
    submit(){
      this.selForm.type_detail = []
      //给位置数组赋值方便后端接收数据
      for(let i=0;i<this.$refs['cascadeAddr'].getCheckedNodes().length;i++){
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 2) {
          this.selForm.type_detail[i] = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }

      console.log(this.selForm)

      this.$http({
        method:'post',
        url:'/User/showMajorByNeeds ',
        data: this.selForm
      }).then(res=> {
        this.schoolList = res.data.list
        this.total = res.data.total
      })
    },
    pageSizeChange(newSize){
      if (newSize === null)
        return
      this.selForm.pageSize = newSize;
      this.submit();
    },
    pageCurrentChange(newPage){
      if (newPage === null)
        return
      this.selForm.pageNum = newPage;
      this.submit();
    },
    searchSchool(){
      this.$http({
        method:'post',
        url:'/User/showMajorByFuzzy',
        data: this.selForm
      }).then(res=> {
        console.log(res.data)
        this.schoolList = res.data
        this.total = res.data.length
      })
    }
  },
}

</script>

<style scoped>
</style>