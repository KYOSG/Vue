import '../css/searchSchool.css'
const City = ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','上冻','河南',
              '湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆'];
const Charge = ['教育部','地方','军校','其他部委'];
const Type = ['综合','功课','农业','林业','医药','示范','语言','财经','政法','体育','艺术','民族'];
const Layer = ['本科','高职（专科）'];
const Feature = ['双一流','一流大学建设高校','一流学科建设高校','研究生院'];
export default {
    data() {
        return {
            checkAll: true,
            checkedCities: [''],
            cities: City,
            isIndeterminate: true,

            checkedChargers: [''],
            Charges: Charge,


            checkedTypes: [''],
            Types: Type,


            checkedLayers: [''],
            Layers: Layer,

            checkedFeatures: [''],
            Features: Feature,

            FeatureS:''
        };
    },
    methods: {
        handleCheckAllChangeCity(val) {
            this.checkedCities = val ? City : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChangeCity(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },

        handleCheckAllChangeCharge(val) {
            this.checkedCities = val ? Charge : [];
            this.isIndeterminate = false;
        },
        handleCheckedChargeChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.Charges.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.Charges.length;
        },

        handleCheckAllChangeType(val) {
            this.checkedCities = val ? Type : [];
            this.isIndeterminate = false;
        },
        handleCheckedTypeChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.Types.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.Types.length;
        },

        handleCheckAllChangeLayer(val) {
            this.checkedCities = val ? Layer : [];
            this.isIndeterminate = false;
        },
        handleCheckedLayerChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.Layers.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.Layers.length;
        },
        handleCheckAllChangeFeature(val) {
            this.checkedCities = val ? Feature : [];
            this.isIndeterminate = false;
        },
        handleCheckedFeatureChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.Features.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.Features.length;
        },
    }
};