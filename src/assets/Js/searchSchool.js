import '../css/searchSchool.css';
const City = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'];
const Charge = ['教育部', '地方', '军校', '其他部委'];
const Type = ['综合', '功课', '农业', '林业', '医药', '示范', '语言', '财经', '政法', '体育', '艺术', '民族'];
const Layer = ['本科', '高职（专科）'];
const Feature = ['985', '211', '双一流', '一流大学建设高校', '一流学科建设高校', '研究生院'];
export
default {
    data() {
        return {
            checkAllCi:
                true,
            checkedCities: [''],
            cities: City,
            isIndeterminate: true,

            checkAllCh: true,
            checkedChargers: [''],
            Charges: Charge,

            checkAllTy: true,
            checkedTypes: [''],
            Types: Type,

            checkAllLa: true,
            checkedLayers: [''],
            Layers: Layer,

            checkAllFe: true,
            checkedFeatures: [''],
            Features: Feature,

            FeatureS: ''
        };
    },
    methods: {
        handleCheckAllChangeCity(valCi) {
            this.checkedCities = valCi ? City: [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChangeCity(valueCi) {
            let checkCity = valueCi.length;
            this.checkAllCi = checkCity === this.cities.length;
            this.isIndeterminate = checkCity > 0 && checkCity < this.cities.length;
        },

        handleCheckAllChangeCharge(valCh) {
            this.checkedChargers = valCh ? Charge: [];
            this.isIndeterminate = false;
        },
        handleCheckedChargeChange(valueCh) {
            let checkedCharge = valueCh.length;
            this.checkAllCh = checkedCharge === this.Charges.length;
            this.isIndeterminate = checkedCharge > 0 && checkedCharge < this.Charges.length;
        },

        handleCheckAllChangeType(valTy) {
            this.checkedTypes = valTy ? Type: [];
            this.isIndeterminate = false;
        },
        handleCheckedTypeChange(valueTy) {
            let checkedType = valueTy.length;
            this.checkAllTy = checkedType === this.Types.length;
            this.isIndeterminate = checkedType > 0 && checkedType < this.Types.length;
        },

        handleCheckAllChangeLayer(valLa) {
            this.checkedLayers = valLa ? Layer: [];
            this.isIndeterminate = false;
        },
        handleCheckedLayerChange(valueLa) {
            let checkedLayer = valueLa.length;
            this.checkAllLa = checkedLayer === this.Layers.length;
            this.isIndeterminate = checkedLayer > 0 && checkedLayer < this.Layers.length;
        },
        handleCheckAllChangeFeature(valFe) {
            this.checkedFeatures = valFe ? Feature: [];
            this.isIndeterminate = false;
        },
        handleCheckedFeatureChange(valueFe) {
            let checkedFeature = valueFe.length;
            this.checkAllFe = checkedFeature === this.Features.length;
            this.isIndeterminate = checkedFeature > 0 && checkedFeature < this.Features.length;
        },
    }
};