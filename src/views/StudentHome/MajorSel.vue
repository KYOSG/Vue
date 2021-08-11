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
        <el-space>
          <el-space direction="vertical"  alignment="flex-start" >

            <!--专业-->
            <div>
              <el-space wrap :size="43">
                <span class="demonstration">主管部门 </span>
                <el-radio-group v-model="selForm.Manage" @change="submit">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="教育部"></el-radio-button>
                  <el-radio-button label="其他部委"></el-radio-button>
                  <el-radio-button label="地方"></el-radio-button>
                  <el-radio-button label="军校"></el-radio-button>
                </el-radio-group>
              </el-space>
            </div>
            <!--985/211-->
            <div>
              <el-space wrap :size="20">
                <span class="demonstration">985/211院校 </span>
                <el-radio-group v-model="selForm.Level" @change="submit">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="985院校"></el-radio-button>
                  <el-radio-button label="211院校"></el-radio-button>
                </el-radio-group>
              </el-space>
            </div>
            <!--层级-->
            <div>
              <el-space  wrap :size="43">
                <span class="demonstration">院校层级 </span>
                <el-radio-group v-model="selForm.Layer" @change="submit">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="本科"></el-radio-button>
                  <el-radio-button label="高职（专科）"></el-radio-button>
                </el-radio-group>
              </el-space>

            </div>
            <!--特性-->
            <div>
              <el-space wrap :size="43">
                <span class="demonstration">院校特点 </span>
                <el-space :size="10" :spacer="spacer">
                  <el-radio-group v-model="selForm.Features" @change="submit">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="一流大学建设高校"></el-radio-button>
                    <el-radio-button label="一流学科建设高校"></el-radio-button>
                  </el-radio-group>
                  <el-switch v-model="Switch" active-color="#13ce66" inactive-color="#ff4949" active-text="是否有研究生院制度" @change="submit"></el-switch>
                </el-space>
              </el-space>
            </div>
          </el-space>
        </el-space>
        <el-divider></el-divider>
        <!--查询结果-->
        <el-table
            :data="schoolList"
            border stripe
            highlight-current-row
            @change="submit"
            max-height="400">
          <el-table-column label="序号" type="index" width="50px"></el-table-column>
          <el-table-column label="院校名称" prop="name"></el-table-column>
          <el-table-column label="所在地" prop="position"></el-table-column>
          <el-table-column label="主管部门" prop="manage"></el-table-column>
          <el-table-column label="院校层级" prop="level"></el-table-column>
          <el-table-column label="985高校" prop="s985"></el-table-column>
          <el-table-column label="211高校" prop="s211"></el-table-column>
          <el-table-column label="院校特点" prop="mobile"></el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
            @size-change="pageSizeChange"
            @current-change="pageCurrentChange"
            :current-page="selForm.pageNum"
            :page-sizes="[1,50, 100, 200]"
            :page-size= "selForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
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
  name: "StudentInf",

  data() {
    return {
      spacer: h(ElDivider, { direction: 'vertical' }),
      props: {multiple: true},

      Switch: false,

      selForm:{
        Position:[],
        Manage: '全部',
        Level:'全部',
        Layer:'全部',
        Features: '全部',
        SwitchVal: '',
        pageNum: 1,
        pageSize: 50,
      },
      schoolList:[],
      total: 0,
    }
  },
  mounted() {
    this.submit();
  //执行下面的函数
  },
  methods:{
    submit(){
      this.$http({
        method:'post',
        url:'/User/',
        data: this.selForm
      }).then(res=> {
        this.schoolList = res.data.list
        this.total = res.data.total
      })
    },

    test(){
      console.log(this.selForm)
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
  },
}

</script>

<style scoped>

</style>