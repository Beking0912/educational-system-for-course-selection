<template>
  <div id="app"  v-loading.fullscreen.lock="loading" element-loading-text="正在验证用户身份">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  methods: {
    getUserInfo(callback) {
      let url="studentInfo";
      switch (localStorage.getItem('role')) {
        case "3":
          url="studentInfo";
          break;
        case "6":
          url="teacherInfo";
          break;
        case "9":
          url="adminInfo";
          break;
      }
      // url = url + "?token=" + localStorage.getItem("token")
      this.axios
              .get(url)//,{token:localStorage.getItem("token")})
              .then(res => {
                if (res.data.code == 1) {
                  this.$store.commit("setData", res.data.data);
                  callback();
                }
              })
              .catch(err => {
                console.log(err);
                this.$message("服务器无法连接");
              });
    }
  },
    mounted() {
      this.getUserInfo(() => {
        console.log(this.$store.state)
        this.loading = false;
        switch (localStorage.getItem('role')) {
          case "3":
            this.$router.push("/student");
            break;
          case "6":
            this.$router.push("/teacher");
            break;
          case "9":
            this.$router.push("/admin");
            break;
        }
      });
    }
};
</script>

<style lang="scss" scoped>
.card {
  margin: 0 auto;
  width: 900px;
  position: relative;
  top: 100px;
}
</style>

