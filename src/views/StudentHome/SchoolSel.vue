<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/StudentHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>志愿填报</el-breadcrumb-item>
        <el-breadcrumb-item>院校查询</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
      <el-card>
        <div>
          <el-space>
            <el-space direction="vertical"  alignment="flex-start" >
              <el-button @click="test">test</el-button>
              <el-button @click="submit">submit</el-button>
              <!--所在地-->
              <div class="schoolPosition">
                <el-space wrap :size="33">
                 <span class="demonstration">院校所在地 </span>
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
            <!--地图-->
            <el-card>
              <div id="map" style="width: 600px;height:300px;"></div>

          </el-card>
          </el-space>
          <el-divider></el-divider>
          <!--查询结果-->
          <el-table
              :data="schoolList"
              border stripe
              highlight-current-row
              @change="submit">
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
              :current-page="selForm.PageNum"
              :page-sizes="[1,50, 100, 200]"
              :page-size= "selForm.PageSize"
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
      options:[
        {
          value: 100, label: "北京", children: [
            {label: "北京市",value: 101},
          ],},
        {
          value: 200, label: "天津", children: [
            {label: "天津市",value: 201},
          ],},
        {
          value: 300, label: "河北", children: [
            {label: "保定市",value: 301},
            {label: "邯郸市",value: 302},
            {label: "石家庄市",value: 303},
            {label: "唐山市",value: 304},
            {label: "张家口市",value: 305},
            {label: "沧州市",value: 306},
            {label: "承德市",value: 307},
            {label: "廊坊市",value: 308},
            {label: "衡水市",value: 309},
            {label: "邢台市",value: 310},
            {label: "秦皇岛市",value: 311},
          ],},
        {
          value: 400, label: "山西", children: [
            {label: "太原市",value: 401},
            {label: "晋中市",value: 402},
            {label: "长治市",value: 403},
            {label: "临汾市",value: 404},
            {label: "大同市",value: 405},
            {label: "运城市",value: 406},
            {label: "忻州市",value: 407},
            {label: "吕梁市",value: 408},
            {label: "阳泉市",value: 409},
            {label: "晋城市",value: 410},
            {label: "朔州市",value: 411},

          ],},
        {
          value: 500, label: "内蒙古", children: [
            {label: "呼和浩特市",value: 501},
            {label: "包头市",value: 502},
            {label: "通辽市",value: 503},
            {label: "赤峰市",value: 504},
            {label: "呼伦贝尔市",value: 505},
            {label: "乌兰察布市",value: 506},
            {label: "巴彦淖尔市",value: 507},
            {label: "鄂尔多斯市",value: 508},
            {label: "兴安盟市",value: 509},
            {label: "锡林郭勒盟市",value: 510},
            {label: "乌海市",value: 511},
            {label: "阿拉善盟市",value: 512},

          ],},
        {
          value: 600, label: "辽宁", children: [
            {label: "沈阳市",value: 601},
            {label: "大连市",value: 602},
            {label: "鞍山市",value: 603},
            {label: "阜新市",value: 604},
            {label: "抚顺市",value: 605},
            {label: "锦州市",value: 606},
            {label: "本溪市",value: 607},
            {label: "丹东市",value: 608},
            {label: "辽阳市",value: 609},
            {label: "葫芦岛市",value: 610},
            {label: "营口市",value: 611},
            {label: "朝阳市",value: 612},
            {label: "铁岭市",value: 613},
            {label: "盘锦市",value: 614},

          ],},
        {
          value: 700, label: "吉林", children: [
            {label: "长春市",value: 701},
            {label: "延边朝鲜族自治州",value: 702},
            {label: "吉林市",value: 703},
            {label: "通化市",value: 704},
            {label: "四平市",value: 705},
            {label: "白城市",value: 706},
            {label: "辽源市",value: 707},
            {label: "松原市",value: 708},
            {label: "白山市",value: 709},
            {label: "梅河口市",value: 710},

          ],},
        {
          value: 800, label: "黑龙江", children: [
            {label: "哈尔滨市",value: 801},
            {label: "大庆市",value: 802},
            {label: "佳木斯市",value: 803},
            {label: "牡丹江市",value: 804},
            {label: "齐齐哈尔市",value: 805},
            {label: "绥化市",value: 806},
            {label: "鸡西市",value: 807},
            {label: "黑河市",value: 808},
            {label: "伊春市",value: 809},
            {label: "鹤岗市",value: 810},
            {label: "大兴安岭地区",value: 811},
            {label: "双鸭山市",value: 812},
            {label: "七台河市",value: 813},

          ],},
        {
          value: 900, label: "上海", children: [
            {label: "上海市",value: 901},

          ],},
        {
          value: 1000, label: "江苏", children: [
            {label: "南京市",value: 1000},
            {label: "苏州市",value: 1002},
            {label: "镇江市",value: 1004},
            {label: "徐州市",value: 1006},
            {label: "常州市",value: 1008},
            {label: "无锡市",value: 1010},
            {label: "南通市",value: 1012},
            {label: "盐城市",value: 1014},
            {label: "淮安市",value: 1016},
            {label: "扬州市",value: 1018},
            {label: "连云港市",value: 1020},
            {label: "泰州市",value: 1022},
            {label: "宿迁市",value: 1024},
            {label: "昆山市",value: 1026},

          ],},
        {
          value: 1100, label: "浙江", children: [
            {label: "杭州市",value: 1101},
            {label: "舟山市",value: 1102},
            {label: "温州市",value: 1103},
            {label: "金华市",value: 1104},
            {label: "湖州市",value: 1105},
            {label: "绍兴市",value: 1106},
            {label: "台州市",value: 1107},
            {label: "丽水市",value: 1108},
            {label: "嘉兴市",value: 1109},
            {label: "宁波市",value: 1110},
            {label: "衢州市",value: 1111},

          ],},
        {
          value: 1200, label: "安徽", children: [
            {label: "合肥市",value: 1201},
            {label: "马鞍山市",value: 1202},
            {label: "淮南市",value: 1203},
            {label: "芜湖市",value: 1204},
            {label: "蚌埠市",value: 1205},
            {label: "阜阳市",value: 1206},
            {label: "安庆市",value: 1207},
            {label: "淮北市",value: 1208},
            {label: "黄山市",value: 1209},
            {label: "六安市",value: 1210},
            {label: "滁州市",value: 1211},
            {label: "宿州市",value: 1212},
            {label: "铜陵市",value: 1213},
            {label: "池州市",value: 1214},
            {label: "亳州市",value: 1215},
            {label: "宣城市",value: 1216},

          ],},
        {
          value: 1300, label: "福建", children: [
            {label: "厦门市",value: 1301},
            {label: "泉州市",value: 1302},
            {label: "福州市",value: 1303},
            {label: "南平市",value: 1304},
            {label: "宁德市",value: 1305},
            {label: "漳州市",value: 1306},
            {label: "三明市",value: 1307},
            {label: "龙岩市",value: 1308},
            {label: "莆田市",value: 1309},

          ],},
        {
          value: 1400, label: "江西", children: [
            {label: "南昌市",value: 1401},
            {label: "抚州市",value: 1402},
            {label: "赣州市",value: 1403},
            {label: "景德镇市",value: 1404},
            {label: "上饶市",value: 1405},
            {label: "宜春市",value: 1406},
            {label: "吉安市",value: 1407},
            {label: "萍乡市",value: 1408},
            {label: "新余市",value: 1409},
            {label: "九江市",value: 1410},
            {label: "鹰潭市",value: 1411},

          ],},
        {
          value: 1500, label: "山东", children: [
            {label: "济南市",value: 1501},
            {label: "青岛市",value: 1502},
            {label: "淄博市",value: 1503},
            {label: "泰安市",value: 1504},
            {label: "潍坊市",value: 1505},
            {label: "滨州市",value: 1506},
            {label: "济宁市",value: 1507},
            {label: "聊城市",value: 1508},
            {label: "德州市",value: 1509},
            {label: "烟台市",value: 1510},
            {label: "临沂市",value: 1511},
            {label: "菏泽市",value: 1512},
            {label: "枣庄市",value: 1513},
            {label: "东营市",value: 1514},
            {label: "日照市",value: 1515},
            {label: "威海市",value: 1516},

          ],},
        {
          value: 1600, label: "河南", children: [
            {label: "郑州市",value: 1601},
            {label: "焦作市",value: 1602},
            {label: "洛阳市",value: 1603},
            {label: "新乡市",value: 1604},
            {label: "开封市",value: 1605},
            {label: "信阳市",value: 1606},
            {label: "周口市",value: 1607},
            {label: "安阳市",value: 1608},
            {label: "许昌市",value: 1609},
            {label: "南阳市",value: 1610},
            {label: "商丘市",value: 1611},
            {label: "驻马店市",value: 1612},
            {label: "平顶山市",value: 1613},
            {label: "漯河市",value: 1614},
            {label: "三门峡市",value: 1615},
            {label: "濮阳市",value: 1616},
            {label: "济源市",value: 1617},
            {label: "鹤壁市",value: 1618},

          ],},
        {
          value: 1700, label: "湖北", children: [
            {label: "武汉市",value: 1701},
            {label: "荆州市",value: 1702},
            {label: "黄石市",value: 1703},
            {label: "黄冈市",value: 1704},
            {label: "恩施土家族苗族自治州",value: 1705},
            {label: "十堰市",value: 1706},
            {label: "襄阳市",value: 1707},
            {label: "孝感市",value: 1708},
            {label: "咸宁市",value: 1709},
            {label: "宜昌市",value: 1710},
            {label: "荆门市",value: 1711},
            {label: "鄂州市",value: 1712},
            {label: "仙桃市",value: 1713},
            {label: "随州市",value: 1714},
            {label: "潜江市",value: 1715},
            {label: "天门市",value: 1716},

          ],},
        {
          value: 1800, label: "湖南", children: [
            {label: "湘潭市",value: 1801},
            {label: "湘西土家族苗族自治州",value: 1802},
            {label: "长沙市",value: 1803},
            {label: "岳阳市",value: 1804},
            {label: "郴州市",value: 1805},
            {label: "衡阳市",value: 1806},
            {label: "邵阳市",value: 1807},
            {label: "怀化市",value: 1808},
            {label: "常德市",value: 1809},
            {label: "永州市",value: 1810},
            {label: "娄底市",value: 1811},
            {label: "益阳市",value: 1812},
            {label: "株洲市",value: 1813},
            {label: "张家界市",value: 1814},

          ],},
        {
          value: 1900, label: "广东", children: [
            {label: "广州市",value: 1901},
            {label: "汕头市",value: 1902},
            {label: "湛江市",value: 1903},
            {label: "韶关市",value: 1904},
            {label: "惠州市",value: 1905},
            {label: "潮州市",value: 1906},
            {label: "肇庆市",value: 1907},
            {label: "梅州市",value: 1908},
            {label: "深圳市",value: 1909},
            {label: "江门市",value: 1910},
            {label: "中山市",value: 1911},
            {label: "茂名市",value: 1912},
            {label: "东莞市",value: 1913},
            {label: "佛山市",value: 1914},
            {label: "珠海市",value: 1915},
            {label: "揭阳市",value: 1916},
            {label: "汕尾市",value: 1917},
            {label: "云浮市",value: 1918},
            {label: "阳江市",value: 1919},
            {label: "河源市",value: 1920},
            {label: "清远市",value: 1921},

          ],},
        {
          value: 2000, label: "广西", children: [
            {label: "南宁市",value: 2001},
            {label: "柳州市",value: 2002},
            {label: "桂林市",value: 2003},
            {label: "百色市",value: 2004},
            {label: "崇左市",value: 2005},
            {label: "河池市",value: 2006},
            {label: "玉林市",value: 2007},
            {label: "梧州市",value: 2008},
            {label: "来宾市",value: 2009},
            {label: "钦州市",value: 2010},
            {label: "贺州市",value: 2011},
            {label: "北海市",value: 2012},
            {label: "贵港市",value: 2013},

          ],},
        {
          value: 2100, label: "海南", children: [
            {label: "海口市",value: 2101},
            {label: "三亚市",value: 2102},
            {label: "琼海市",value: 2103},
            {label: "文昌市",value: 2104},

          ],},
        {
          value: 2200, label: "重庆", children: [
            {label: "重庆市",value: 2201},

          ],},
        {
          value: 2300, label: "四川", children: [
            {label: "成都市",value: 2301},
            {label: "绵阳市",value: 2302},
            {label: "自贡市",value: 2303},
            {label: "德阳市",value: 2304},
            {label: "雅安市",value: 2305},
            {label: "凉山彝族自治州",value: 2306},
            {label: "泸州市",value: 2307},
            {label: "南充市",value: 2308},
            {label: "内江市",value: 2309},
            {label: "宜宾市",value: 2310},
            {label: "达州市",value: 2311},
            {label: "阿坝藏族羌族自治州",value: 2312},
            {label: "乐山市",value: 2313},
            {label: "攀枝花市",value: 2314},
            {label: "甘孜藏族自治州",value: 2315},
            {label: "眉山市",value: 2316},
            {label: "遂宁市",value: 2317},
            {label: "广安市",value: 2318},
            {label: "广元市",value: 2319},
            {label: "巴中市",value: 2320},
            {label: "资阳市",value: 2321},

          ],},
        {
          value: 2400, label: "贵州", children: [
            {label: "贵阳市",value: 2401},
            {label: "遵义市",value: 2402},
            {label: "铜仁市",value: 2403},
            {label: "黔西南布依族苗族自治州",value: 2404},
            {label: "安顺市",value: 2405},
            {label: "毕节市",value: 2406},
            {label: "黔东南苗族侗族自治州",value: 2407},
            {label: "黔南布依族苗族自治州",value: 2408},
            {label: "六盘水市",value: 2409},

          ],},
        {
          value: 2500, label: "云南", children: [
            {label: "昆明市",value: 2500},
            {label: "大理白族自治州",value: 2501},
            {label: "昭通市",value: 2502},
            {label: "曲靖市",value: 2503},
            {label: "普洱市",value: 2504},
            {label: "保山市",value: 2505},
            {label: "红河哈尼族彝族自治州",value: 2506},
            {label: "玉溪市",value: 2507},
            {label: "楚雄彝族自治州",value: 2508},
            {label: "文山壮族苗族自治州",value: 2509},
            {label: "丽江市",value: 2510},
            {label: "临沧市",value: 2511},
            {label: "大理市",value: 2512},
            {label: "西双版纳傣族自治州",value: 2513},
            {label: "德宏傣族景颇族自治州",value: 2514},
            {label: "红河州",value: 2515},
            {label: "林芝市",value: 2516},

          ],},
        {
          value: 2600, label: "西藏", children: [
            {label: "拉萨市",value: 2517},

          ],},
        {
          value: 2700, label: "陕西", children: [
            {label: "咸阳市",value: 2518},
            {label: "西安市",value: 2519},
            {label: "延安市",value: 2520},
            {label: "汉中市",value: 2521},
            {label: "宝鸡市",value: 2522},
            {label: "渭南市",value: 2523},
            {label: "榆林市",value: 2524},
            {label: "商洛市",value: 2525},
            {label: "安康市",value: 2526},
            {label: "铜川市",value: 2527},
            {label: "神木市",value: 2528},

          ],},
        {
          value: 2800, label: "甘肃", children: [
            {label: "兰州市",value: 2529},
            {label: "庆阳市",value: 2530},
            {label: "天水市",value: 2531},
            {label: "张掖市",value: 2532},
            {label: "甘南藏族自治州",value: 2533},
            {label: "平凉市",value: 2534},
            {label: "陇南市",value: 2535},
            {label: "定西市",value: 2536},
            {label: "酒泉市",value: 2537},
            {label: "武威市",value: 2538},
            {label: "嘉峪关市",value: 2539},
            {label: "金昌市",value: 2540},
            {label: "白银市",value: 2541},
            {label: "临夏州",value: 2542},

          ],},
        {
          value: 2900, label: "青海", children: [
            {label: "西宁市",value: 2901},
            {label: "海东市",value: 2902},
            {label: "海西蒙古族藏族自治州",value: 2903},

          ],},
        {
          value: 3000, label: "宁夏", children: [
            {label: "银川市",value: 3001},
            {label: "固原市",value: 3002},
            {label: "石嘴山市",value: 3003},
            {label: "吴忠市",value: 3004},

          ],},
        {
          value: 3100, label: "新疆", children: [
            {label: "乌鲁木齐市",value: 3101},
            {label: "阿拉尔市",value: 3102},
            {label: "石河子市",value: 3103},
            {label: "喀什地区",value: 3104},
            {label: "伊犁哈萨克自治州",value: 3105},
            {label: "昌吉回族自治州",value: 3106},
            {label: "阿克苏地区",value: 3107},
            {label: "巴音郭楞蒙古自治州",value: 3108},
            {label: "和田地区",value: 3109},
            {label: "克拉玛依市",value: 3110},
            {label: "五家渠市",value: 3111},
            {label: "哈密市",value: 3112},
            {label: "吐鲁番市",value: 3113},
            {label: "博尔塔拉蒙古自治州",value: 3114},
            {label: "克孜勒苏柯尔克孜自治州",value: 3115},
            {label: "阿勒泰地区",value: 3116},
            {label: "塔城地区",value: 3117},
            {label: "铁门关市",value: 3118},

          ],},],//不要打开！！！
      Switch: false,

      selForm:{
        Position:[],
        Manage: '全部',
        Level:'全部',
        Layer:'全部',
        Features: '全部',
        SwitchVal: '',
        PageSize: 50,
        PageNum: 1,
      },
      schoolList:[],
      total: 0,
    }
  },
  mounted() {
    this.submit();
    this.drawMap();    //执行下面的函数

  },
  methods:{
    drawMap(){
      const dataChart = echarts.init(document.getElementById('map'))

      const mapData = require("../../assets/Js/map/china.json")

      echarts.registerMap('chinaMap', mapData)
      const option = {
        geo:{
          type: 'map',
          map: 'chinaMap',
          roam: true
        }
      }
      dataChart.setOption(option)
      //点击
      dataChart.on('click',arg => {
        const provinceData = getProvinceMapInfo(arg.name)

        const mapProvince = require("../../assets/Js/map/province/" + provinceData.key + ".json")

        echarts.registerMap(provinceData.key, mapProvince)

        const optionProvince = {
          geo: {
            map: provinceData.key,
            roam: true
          }
        }
        dataChart.setOption(optionProvince)

      })
    },
    submit(){
      //给位置数组赋值方便后端接收数据
      for(let i=0;i<this.$refs['cascadeAddr'].getCheckedNodes().length;i++){
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 2) {
          this.selForm.Position[i] = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }

      //处理开关数据
      if(this.Switch === true){
        this.selForm.SwitchVal = 'T'
      }
      else{
        this.selForm.SwitchVal = 'F'
      }

      this.$http({
        method:'post',
        url:'/User/selectUniversityByCity',
        data: this.selForm
      }).then(res=>{
        if (res.data.info.code !== 200)
          return this.$message.error(res.data.info.message);
      })
    },
    test(){
      console.log(this.selForm.Position)
    },
    pageSizeChange(newSize){
      this.selForm.pageSize = newSize;
      this.submit();
    },
    pageCurrentChange(newPage){
      this.selForm.pageNum = newPage;
      this.submit();
    },

  },

}

</script>

<style scoped>

</style>