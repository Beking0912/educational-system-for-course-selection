<template>
  <div id="manageDepartment">
    <h1>管理院系</h1>
    <div class="container">
      <div class="left">
        <div class="card student" v-for="(item,index) in departmentData" :key="item.departmentID">
          <div class="info">
            <div class="name">院系名称：{{item.departmentName}}</div>
            <div class="account">院系编号：{{item.departmentID}}</div>
            <el-button
              type="danger"
              size="small"
              style="background: #7266ba; border-color: #7266ba"
              @click="deleteDepartment(item.departmentID,index)"
            >删除</el-button>
          </div>
          <div class="avant">{{item.departmentName}}</div>
        </div>
      </div>
    <div class="right">
      <div class="add_teacher">
        <div class="title">添加院系</div>
        <el-form :model="form" :rules="rules" ref="form" label-width="80px" label-position="left">
          <el-form-item label="院系名称" prop="departmentName">
            <el-input v-model="form.departmentName"></el-input>
          </el-form-item>

          <el-form-item label="院系编号" prop="departmentID">
            <el-input v-model="form.departmentID"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm" style="float:right">添 加</el-button>
            <el-button type="info" @click="clearForm" style="float:right; margin-right: 20px;">清 空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departmentData: [],
      page: 1,
      form: {
        departmentID: "",
        departmentName: "",
      },
      rules: {
        departmentID: [
          {required: true, message: "请填写信息", trigger: ["change", "blur"]}
        ],
        departmentName: [
          {required: true, message: "请填写信息", trigger: ["change", "blur"]}
        ]
      }
    };
  },
  methods: {
    getDepartment() {
      this.axios
              .get("/getDepartment")
              .then(res => {
                if (res.data.code == 1) {
                  this.departmentData = res.data.data;
                }
              })
              .catch(err => {
                console.log(err);
                this.$message("获取系别失败，服务器无法连接");
              });
    },
    deleteDepartment(id, index) {
      this.$confirm("您确定要删除该院系吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
              .then(() => {
                this.axios
                        .get("/deleteDepartment?departmentID=" + id)
                        .then(res => {
                          if (res.data.code == 1) {
                            this.total--;
                            this.departmentData.splice(index, 1);
                            this.$message("删除成功！");
                          }
                        })
                        .catch(err => {
                          console.log(err);
                          this.$message("服务器无法连接");
                        });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "操作已取消"
                });
              });
    },
    addDepartment() {
      this.$confirm("添加信息确认无误吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
              .then(() => {
                let obj = this.form;
                this.axios
                        .post("/addDepartment", obj)
                        .then(res => {
                          if (res.data.code == 1) {
                            this.getDepartment();
                            this.$message({
                              type: "success",
                              message: "添加成功!"
                            });
                            this.clearForm();
                          } else {
                            this.$message.error("该编号已被注册！");
                          }
                        })
                        .catch(err => {
                          console.log(err);
                          this.$message("服务器无法连接");
                        });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "操作已取消"
                });
              });
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
            this.addDepartment();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    clearForm() {
      this.$refs.form.resetFields();
    }
  },
  mounted() {
    this.getDepartment();
  }
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  .left {
    width: 70%;
    .student {
      display: flex;
      justify-content: space-between;
      padding: 20px 40px;
      .avant {
        background-color: #c4c8c9a2;
        width: 100px;
        height: 100px;
        border-radius: 100px;
        line-height: 100px;
        text-align: center;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.5);
        font-size: 0.9rem;
      }
      .info {
        .name {
          color: #99dadc;
          font-size: 1.2rem;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .account {
          color: #969799;
          margin-bottom: 10px;
        }
      }
    }
  }
  .right {
    width: 30%;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    height: 200px;
    margin-left: 20px;
    .add_teacher {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      margin: -20px;
      margin-top: -10px;
      overflow: hidden;
      height: 230px;
      .title {
        margin: -20px;
        padding: 20px;
        background-color: #23b7e5;
        color: white;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
