<template >
  <div class="body">
    <!-- 快捷导航栏制作结束 -->
    <div class="header">
      <div class="w">
        <img src="../../img/header1.png" alt="">
        <h4 class="header_h4">院校信息查询</h4>
      </div>
    </div>
    <el-container class="biggestdiv">
      <div class="w">
        <div>
          <el-space :size="40">
            <el-space direction="vertical"  alignment="flex-start" :size="25">
              <!--所在地-->
              <div class="schoolPosition">
                <el-space wrap :size="33">
                  <h4 class="demonstration">院校所在地 </h4>
                  <el-cascader
                      placeholder="试试搜索：北京"
                      :options="options"
                      :props="{ multiple: true }"
                      filterable
                      collapse-tags
                      ref="cascadeAddr"
                      clearable
                      @change="submit"></el-cascader>
                </el-space>
              </div>
              <!--主管部门-->
              <div>
                <el-space wrap :size="43">
                  <h4 class="demonstration">主管部门 </h4>
                  <el-radio-group v-model="selForm.Manage" @change="submit">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="教育部"></el-radio-button>
                    <el-radio-button label="其他部委"></el-radio-button>
                    <el-radio-button label="地方"></el-radio-button>
                    <el-radio-button label="军校"></el-radio-button>
                  </el-radio-group>
                </el-space>
              </div>
              <!--层级-->
              <div>
                <el-space  wrap :size="43">
                  <h4 class="demonstration">院校层级 </h4>
                  <el-radio-group v-model="selForm.Layer" @change="submit">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="本科"></el-radio-button>
                    <el-radio-button label="高职（专科）"></el-radio-button>
                    <el-radio-button label="独立学院"></el-radio-button>
                    <el-radio-button label="中外合作办学"></el-radio-button>
                  </el-radio-group>
                </el-space>

              </div>
              <!--特点-->
              <div>
                <el-space wrap :size="43">
                  <h4 class="demonstration">院校特点 </h4>
                  <el-space :size="10" :spacer="spacer">
                    <el-radio-group v-model="selForm.Level" @change="submit">
                      <el-radio-button label="全部"></el-radio-button>
                      <el-popover
                          placement="bottom"
                          title="985工程"
                          :width="200"
                          trigger="hover"
                          content="是为了实现现代化，建立若干所具有世界先进水平的一流大学的建设工程。">
                        <template #reference>
                          <el-radio-button label="985院校"></el-radio-button>
                        </template>
                      </el-popover>
                      <el-popover
                          placement="bottom"
                          title="211工程"
                          :width="200"
                          trigger="hover"
                          content="面向21世纪、重点建设100所左右的高等学校和一批重点学科的建设工程。">
                        <template #reference>
                          <el-radio-button label="211院校"></el-radio-button>
                        </template>
                      </el-popover>
                    </el-radio-group>
                    <el-popover
                        placement="right"
                        title="双一流高校"
                        :width="200"
                        trigger="hover"
                        content="建设世界一流大学和一流学科，是中共中央、国务院作出的重大战略决策，也是中国高等教育领域继“211工程”“985工程”之后的又一国家战略。">
                      <template #reference>
                        <el-switch
                            v-model="Switch"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="仅查看双一流高校"
                            @change="submit"></el-switch>
                      </template>
                    </el-popover>
                  </el-space>
                </el-space>
              </div>
              <!--搜索-->
              <el-space>
                <el-input
                    placeholder="请输入院校名称"
                    v-model="selForm.Name"
                    clearable
                    @keyup.enter.native="search">
                </el-input >
                <el-button icon="el-icon-search" @click="search" type="primary"></el-button>
              </el-space>
            </el-space>
            <!--地图-->
            <el-card>
              <div id="map" style="width: 400px;height:270px;"></div>
              <el-button type="primary" icon="el-icon-back" circle @click="revertMap"></el-button>
              <el-button type="anger" icon="el-icon-delete" circle @click="reset"></el-button>
            </el-card>
          </el-space>
          <el-divider></el-divider>
          <!--查询结果-->
          <el-table
              :data="schoolList"
              highlight-current-row
              max-height="700"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
            <el-table-column type="expand">
              <template #default="props">
                <el-form inline>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-card>
                        <el-space direction="vertical" :size="spaceSize" alignment="flex-start">
                        <span><el-icon :size="15" :color="color">
                             <school/>
                           </el-icon>
                          {{ "院校名称：" + props.row.name }}</span>
                          <span><el-icon :size="15" :color="color">
                             <crop/>
                           </el-icon>
                          {{ "占地面积：" + props.row.area + "亩" }}</span>
                          <span><el-icon :size="15" :color="color"><Link/></el-icon>{{ "官方网站："}}<el-link type="primary" :href="props.row.schoolSite" target="_blank">{{ props.row.schoolSite }}</el-link></span>
                        </el-space>
                      </el-card>
                    </el-col>

                    <el-col :span="12">
                      <el-card>
                        <el-space direction="vertical" :size="spaceSize" alignment="flex-start">

                        <span>
                          <el-icon :size="15" :color="color">
                             <locationInformation/>
                           </el-icon>{{ "地址：" + props.row.address }}</span>

                          <span>
                          <el-icon :size="15" :color="color">
                             <timer/>
                           </el-icon>{{ "建校时间：" + props.row.createDate + "年" }}</span>

                          <span>
                           <el-icon :size="15" :color="color">
                             <phone/>
                           </el-icon>{{ "联系方式：" + props.row.phone }}</span>
                        </el-space>
                      </el-card>
                    </el-col>
                  </el-row>
                  <el-divider></el-divider>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-card>
                        <el-space direction="vertical" :size="spaceSize" alignment="flex-start">

                        <span>
                           <el-icon :size="15" :color="color">
                             <medal/>
                           </el-icon>{{ "院校层级：" + props.row.natureName }}</span>

                          <span>
                           <el-icon :size="15" :color="color">
                             <notebook/>
                           </el-icon>{{ "硕士点： " + props.row.masterNum }}</span>

                          <span>
                           <el-icon :size="15" :color="color">
                             <management/>
                           </el-icon>{{ "博士点：" + props.row.doctorNum }}</span>
                        </el-space>
                      </el-card>
                    </el-col>

                    <el-col :span="12">
                      <el-card>
                        <el-space direction="vertical" :size="spaceSize" alignment="flex-start">
                        <span>
                           <el-icon :size="15" :color="color">
                             <files/>
                           </el-icon>{{ "软科排名：" + props.row.ruanKeRank }}</span>
                          <span>
                           <el-icon :size="15" :color="color">
                             <files/>
                           </el-icon>{{ "校友会排名：" + props.row.xyhrank }}</span>
                          <span>
                           <el-icon :size="15" :color="color">
                             <files/>
                           </el-icon>{{ "武书连排名：" + props.row.wslrank }}</span>
                        </el-space>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="学校代码" prop="">
              <template #default="scope">
                <el-image  style="width: 70px; height: 70px" :src="scope.row.site" alt="" :fit="fill" ></el-image>
              </template>
            </el-table-column>
            <el-table-column label="院校名称" prop="name"></el-table-column>
            <el-table-column label="所在地" prop="position"></el-table-column>
            <el-table-column label="主管部门" prop="manage"></el-table-column>
            <el-table-column label="院校层级" prop="layer"></el-table-column>
            <el-table-column label="院校类型" prop="typeName"></el-table-column>
            <el-table-column label="院校特点" prop="type" ></el-table-column>
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
              :disabled = "searchOption"
              background>
          </el-pagination>
        </div>
      </div>

    </el-container>
  </div>

</template>

<script lang="ts">
import { h } from 'vue'
import { ElDivider } from 'element-plus'
import * as echarts from "echarts";
import { getProvinceMapInfo } from "../../../utils/mapNameExchange";
import { Collection, LocationInformation, Medal, Notebook, Management, School, Crop, Link, Timer, Phone, Files } from '@element-plus/icons'
export default {
  name: "SchoolPublic",

  data() {
    return {
      spacer: h(ElDivider, { direction: 'vertical' }),
      props: {multiple: true},
      options: require('../../../public/static/Data/positionData.json'),
      Switch: false,

      selForm:{
        Position:[],
        Manage: '全部',
        Level:'全部',
        Layer:'全部',
        Features: '',
        pageNum: 1,
        pageSize: 50,
        Name: '',
      },
      schoolList:[],
      total: 0,
      spaceSize:20,
      searchOption: false,
      chartInstance: null,
      allData: null,
      mapData: {},
      flag:'china'
    }

  },
  mounted() {
    this.submit();
    this.drawMap();
  },
  methods:{
    reset(){
      this.selForm.Position = []
      this.submit()
    },
    drawMap(){
      this.chartInstance = echarts.init(document.getElementById('map'))
      // 获取中国地图的矢量数据
      const ret = require("../../assets/Js/map/china.json")

      echarts.registerMap('china', ret)
      const initOption = {
        title: {
          text: '▎ 地区选择',
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: '#74abee',
            borderColor: '#333'
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'
        }
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('click', async arg => {
        if (this.flag === 'china') {
          this.flag = 'province'
          const provinceInfo = getProvinceMapInfo(arg.name)
          // arg.name 得到所点击的省份, 这个省份他是中文
          if (!this.mapData[provinceInfo.key]) {

            const ret = require("../../assets/Js/map/province/" + provinceInfo.key + ".json")
            this.mapData[provinceInfo.key] = ret
            echarts.registerMap(provinceInfo.key, ret)
          }
          const changeOption = {
            geo: {
              map: provinceInfo.key
            }
          }
          this.chartInstance.setOption(changeOption)
        }
        else{
          console.log(arg.name)
          let charge = 0
          for (let i = 0;i<this.selForm.Position.length;i++){
            if (this.selForm.Position[i] === arg.name){
              charge = 1;
              break;
            }
          }
          if (charge === 0 ){
            this.selForm.Position[this.selForm.Position.length] = arg.name
            console.log(this.selForm)
            this.submit()
          }

        }

      })
    },
    revertMap () {
      this.flag = 'china'
      const revertOption = {
        geo: {
          map: 'china'
        }
      }
      this.chartInstance.setOption(revertOption)
    },
    submit(){
      this.selForm.Position = []
      //给位置数组赋值方便后端接收数据
      for(let i=0;i<this.$refs['cascadeAddr'].getCheckedNodes().length;i++){
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 2) {
          this.selForm.Position[i] = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }
      //处理开关数据
      if(this.Switch === true){
        this.selForm.Features = 'T'
      }
      else{
        this.selForm.Features = 'F'
      }

      console.log(this.selForm)
      this.$http({
        method:'post',
        url:'/User/showUniversityByNeed',
        data: this.selForm
      }).then(res=> {
        for(let i=0;i<res.data.list.length;i++) {
          res.data.list[i].type = res.data.list[i].firstClass
          res.data.list[i].site = 'https://static-data.eol.cn/upload/logo/' + res.data.list[i].school_id + '.jpg'
        }
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
      this.selForm.pageNum = newPage;
      this.submit();
    },
    search(){
      this.searchOption = true

      this.selForm.pageNum = 1;
      this.selForm.pageSize = 50;

      this.$http({
        method:'post',
        url:'/User/getUniversityByName',
        data: this.selForm
      }).then(res=> {
        for(let i=0;i<res.data.length;i++) {
          res.data[i].type = res.data[i].firstClass
          res.data[i].site = 'https://static-data.eol.cn/upload/logo/' + res.data[i].school_id + '.jpg'
        }
        this.schoolList = res.data
        this.total = res.data.length

      })
    },
  },
  components: {
    Collection,
    LocationInformation,
    Medal,
    Notebook,
    Management,
    School,
    Crop,
    Link,
    Timer,
    Phone,
    Files
  },
}

</script>

<style scoped>
* {
  box-sizing: border-box;
  padding:0;margin:0;
}
.w {
  width: 1200px;
  margin: 0 auto;
}

li {
  list-style: none;
}
.body {

  height: 100%;
  background-color:#fff;

}

a {
  text-decoration: none;
}

h4 {
  float: left;
}

.header {
  text-align: center;
  height: 120px;
  margin-bottom: 20px;
  border-bottom: 3px solid #F49F0A;
}

.header img {
  display:inline-block;
  float: left;
  width: 120px;
  height: 120px;
}

.header_h4 {
  margin: 48px 10px;
  font-size: 24px;
  color: #F49F0A;
}

.shortcut {
  height: 40px;

  background-color: #f5f5f5;
  line-height: 40px;
}

.shortcut img {
  float: left;
  width: 50px;
  height: 30px;
  margin-right: 20px;
}

.fr {
  margin-left: 50%;
}

.shortcut ul li {
  float: left;
  list-style: none;

}

.shortcut ul li a {
  color: #666666;
}

.shortcut ul li a:hover {
  color: #F49F0A;
}

.shortcut .fr ul li:nth-child(even) {
  width: 1px;
  height: 12px;
  background-color: #666;
  margin: 14px 15px 0;
}


</style>