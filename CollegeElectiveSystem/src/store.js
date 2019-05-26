import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: '',
    studentName: '王小明',
    teacherName:'翁文勇',
    departmentName: '计算机与计算机科学',
    semester: '大三下学期',
    studentID: '31601102',
    teacherID: '21301',
    adminName: '小张',
    account: '3131654'
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
    }
  },
  actions: {

  }
})
