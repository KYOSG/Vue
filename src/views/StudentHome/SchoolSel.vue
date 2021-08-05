<template>
  <el-container>
    <el-header>
      <div class="CheckBoxBackground">
        <div class="cityChange">
          <div>此处要改成联级选择器</div>
          <!--城市-->
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllCi" @change="handleCheckAllChangeCity">全选</el-checkbox>

          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChangeCity">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div style="margin: 15px 0;"></div>

        <div class="chargeChange">
          <!--主管部门-->
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllCh" @change="handleCheckAllChangeCharge">全选</el-checkbox>

          <el-checkbox-group v-model="checkedChargers" @change="handleCheckedChargeChange">
            <el-checkbox v-for="Charge in Charges" :label="Charge" :key="Charge">{{Charge}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div style="margin: 15px 0;"></div>
        <div class="typeChange">
          <!--院校类型-->
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllTy" @change="handleCheckAllChangeType">全选</el-checkbox>

          <el-checkbox-group v-model="checkedTypes" @change="handleCheckedTypeChange">
            <el-checkbox v-for="Type in Types" :label="Type" :key="Type">{{Type}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div style="margin: 15px 0;"></div>
        <div class="layerChange">

          <!--学历层次-->
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllLa" @change="handleCheckAllChangeLayer">全选</el-checkbox>

          <el-checkbox-group v-model="checkedLayers" @change="handleCheckedLayerChange">
            <el-checkbox v-for="Layer in Layers" :label="Layer" :key="Layer">{{Layer}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div style="margin: 15px 0;"></div>
        <div class="featureChange">

          <!--院校特性-->
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllFe" @change="handleCheckAllChangeFeature">全选</el-checkbox>

          <el-checkbox-group v-model="checkedFeatures" @change="handleCheckedFeatureChange">
            <el-checkbox v-for="Feature in Features" :label="Feature" :key="Feature">{{Feature}}</el-checkbox>
          </el-checkbox-group>
        </div>


        <el-radio-group v-model="FeatureS" class="FeatureS">
          <el-radio label="1">民办高校</el-radio>
          <el-radio label="2">独立学院</el-radio>
          <el-radio label="3">中外合作办学</el-radio>
          <el-radio label="4">内地与港澳台合作办学</el-radio>
        </el-radio-group>

      </div>
    </el-header>

      <!--院校列表-->
    <el-card class="result">
      <el-table
         :data="schoolList"
         border stripe
         highlight-current-row
         style="width: 98%">
       <el-table-column label="序号" type="index" width="50px"></el-table-column>
       <el-table-column label="院校名称" prop="st_name"></el-table-column>
       <el-table-column label="直属部门" prop="st_email"></el-table-column>
       <el-table-column label="学历层次" prop="st_mark"></el-table-column>
       <el-table-column label="院校特性" prop="st_mobile"></el-table-column>
    </el-table>
    </el-card>
      <!--分页-->


  </el-container>
</template>

<script type="text/javascript" src="../../assets/Js/schoolSel.js">
export default {
  name: "StudentInt",
  data() {
    return {
      //用户列表
      queryInfo: {
        query: '',
        pageSum: '',
        pageSize: '',
      },
      schoolList: [],
      total: 0,
      editDialogVisible: false,

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

  top: 50%;
}
</style>