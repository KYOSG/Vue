import '../css/signup.css'
import { defineComponent, ref } from 'vue'
//const subjectOptions = ['物理', '化学', '生物', '政治','历史','地理'];
export default {
    name: "Signup",
    data() {
        return {
            labelPosition: 'right',
            studentData: {
                name: ref(''),
                number:ref(''),
                password:ref(''),
                score: ref(''),
                type: ref(''),
                year: ref(''),
                subject: [''],
            },

           // subjects: subjectOptions
        };
    }
}