<template>
<div class="Background">
  <div class="title">院校库</div>

  <div class="CheckBoxBackground">
    <div class="cityChange">
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
  </div>
</template>

<script type="text/javascript" src="../assets/Js/searchSchool.js">

</script>

<style scoped>

</style>