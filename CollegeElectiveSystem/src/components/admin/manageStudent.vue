<template>
  <div id="manageStudent">
    <h1>管理学生</h1>
    <div class="container">
      <div class="left">
        <div class="card student" v-for="(item,index) in studentData" :key="item.studentID">
          <div class="info">
            <div class="name">学生姓名：{{item.name}}</div>
            <div class="account">学生学号：{{item.studentID}}</div>
            <div class="account">学生系别：{{item.department}}</div>
            <div class="account">在读学期：{{item.studentSemester}}</div>
            <div class="account">学生密码：{{item.studentPwd}}</div>
            <el-button
              type="danger"
              size="small"
              style="background: #7266ba; border-color: #7266ba"
              @click="deleteUser(item.studentID,index)"
            >删除</el-button>
          </div>
          <div class="avant">{{item.name}}</div>
        </div>
        <el-button
          type="primary"
          v-show="this.studentData.length < this.total"
          style="float: right"
          @click="getMore"
        >加载更多</el-button>
      </div>
      <div class="right">
        <ve-pie :data="chartData"></ve-pie>
        <div class="add_teacher">
          <div class="title">添加学生</div>
          <el-form :model="form" :rules="rules" ref="form" label-width="80px" label-position="left">
            <el-form-item label="学生姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="学生编号" prop="studentID">
              <el-input v-model="form.studentID"></el-input>
            </el-form-item>
            <el-form-item label="所读学期" prop="studentSemester">
              <el-input v-model="form.studentSemester"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="studentPwd">
              <el-input type="password" v-model="form.studentPwd"></el-input>
            </el-form-item>

            <el-form-item label="学生系别" prop="department">
              <el-select v-model="form.departmentName" placeholder="请选择" style="width:100%">
                <el-option
                        v-for="item in department"
                        :key="item.departmentID"
                        :label="item.departmentName"
                        :value="item.departmentID"
                ></el-option>
              </el-select>
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
      studentData: [],
      chartData: {
        columns: ["用户", "数量"],
        rows: [{ 用户: "已展示用户", 数量: 0 }, { 用户: "未展示用户", 数量: 0 }]
      },
      total: 0,
      page: 1,
      form: {
        studentID: "",
        name: "",
        studentSemester: "",
        departmentName: "",
        studentPwd: ""
      },
      rules: {
        studentID: [
          { required: true, message: "请填写信息", trigger: ["change", "blur"] }
        ],
        name: [
          { required: true, message: "请填写信息", trigger: ["change", "blur"] }
        ],
        studentPwd: [
          { required: true, message: "请填写信息", trigger: ["change", "blur"] }
        ],
        studentSemester: [
          { required: true, message: "请填写信息", trigger: ["change", "blur"] }
        ],
        departmentName: [{ required: true, message: "请填写信息", trigger: "change" }]
      },
      department: []
    };
  },
  methods: {
    getStudentData(callback) {
      this.axios
        .get("/getStudentData?page=" + this.page)
        .then(res => {
          console.log(this.page)
          if (res.data.code == 1) {
            this.total = res.data.total;
            this.studentData = [
              ...this.studentData,
              ...res.data.data.studentData
            ];
            callback();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    addStudent() {
      this.$confirm("添加信息确认无误吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
              .then(() => {
                let obj = this.form;
                obj.departmentID = this.form.departmentName;
                console.log("111");
                this.axios
                        .post("/addStudent", obj)
                        .then(res => {
                          console.log(res.data);
                          if (res.data.code == 1) {
                            this.$message({
                              type: "success",
                              message: "添加成功!"
                            });
                            this.page = 1;
                            this.clearForm();
                            this.getTeacherData(() => {
                              this.chartData.rows[0].数量 = this.teacherData.length;
                              this.chartData.rows[1].数量 =
                                      this.total - this.studentData.length;
                            });
                          } else {
                            this.$message.error("该学号已被注册！");
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
    getDepartment() {
      console.log('11111')
      this.axios
              .get("/getDepartment")
              .then(res => {
                if (res.data.code == 1) {
                  this.department = res.data.data;
                }
              })
              .catch(err => {
                console.log(err);
                this.$message("获取系别失败，服务器无法连接");
              });
    },
    getMore() {
      this.page++;
      this.getStudentData(() => {
        this.chartData.rows[0].数量 = this.studentData.length;
        this.chartData.rows[1].数量 = this.total - this.studentData.length;
      });
    },
    deleteUser(id, index) {
      this.$confirm("您确定要删除该学生吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/deleteStudent?studentID=" + id)
            .then(res => {
              if (res.data.code == 1) {
                this.total--;
                this.studentData.splice(index, 1);
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
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.addStudent();
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
    this.getStudentData(() => {
      this.chartData.rows[0].数量 = this.studentData.length;
      this.chartData.rows[1].数量 = this.total - this.studentData.length;
    });
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
        font-size: 1.4rem;
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
    height: 350px;
    margin-left: 20px;
    .add_teacher {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      margin: -20px;
      margin-top: -10px;
      overflow: hidden;
      height: 410px;
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
