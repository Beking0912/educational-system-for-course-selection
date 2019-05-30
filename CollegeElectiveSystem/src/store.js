import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: '',
    name: '',
    teacherName:'',
    departmentName: '',
    department:'',
    semester: '',
    studentSemester:'',
    studentID: '',
    studentPwd:'',
    teacherID: '',
    adminName: '',
    account: '',
    role: '',
    teacherDes:'',
    teacherAge:''
  },
  mutations: {
    setData(state, obj) {
      for (let key in obj) {
        if (obj[key] == null) {
          state[key] = "";
        } else {
          state[key] = obj[key].toString();
        }
      }
    },
    setRole(state, role) {
      console.log('setRole',role)
      state['role'] = role;
    }
  },
  actions: {

  }
})
