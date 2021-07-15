import '../css/signup.css'
const subjectOptions = ['物理', '化学', '生物', '政治','历史','地理'];
export default {
    name: "Signup",
    data() {
        return {
            labelPosition: 'right',
            studentData: {
                name: '',
                password:'',
                score: '',
                type: '',
                year: '',
                subject: [''],
            },

            subjects: subjectOptions
        };
    }
}