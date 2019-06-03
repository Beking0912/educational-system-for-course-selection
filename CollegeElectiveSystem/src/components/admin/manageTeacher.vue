<template>
  <div id="manageTeacher">
    <h1>管理教师</h1>
    <el-dialog title="教师信息" :visible.sync="dialogFormVisible">
      <el-form :model="editItem" class="fromteacher">
        <el-form-item label="教师姓名">
          <el-input v-model="editItem.teacherName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="教师编号">
          <el-input v-model="editItem.teacherID" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="教师年龄">
          <el-input v-model="editItem.teacherAge" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="教师简介">
          <el-input v-model="editItem.teacherDes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在院系">
          <el-select v-model="editItem.departmentName" placeholder="请选择" style="width:100%">
            <el-option
                    v-for="item in department"
                    :key="item.departmentID"
                    :label="item.departmentName"
                    :value="item.departmentID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教师密码">
          <el-input v-model="editItem.teacherPwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyUser(editItem.teacherID,editItem.teacherName,editItem.departmentName,editItem.teacherAge,editItem.teacherDes,editItem.teacherPwd)">保存</el-button>
      </div>
    </el-dialog>
    <div class="container">
      <div class="left">
        <div class="card student" v-for="(item,index) in teacherData" :key="item.teacherID">
          <div class="info">
            <div class="name">教师姓名：{{item.teacherName}}</div>
            <div class="account">教师编号：{{item.teacherID}}</div>
            <div class="account">教师院系：{{item.departmentName}}</div>
            <div class="account">教师年龄：{{item.teacherAge}}</div>
            <div class="account">教师简介：{{item.teacherDes}}</div>
            <div class="account">教师密码：{{item.teacherPwd}}</div>
            <el-button type="danger" size="small" @click="deleteUser(item.teacherID,index)">删除</el-button>

            <el-button @click="onEdit(item)" type="success" size="small" :class="{choose:item.choose}">编辑</el-button>

          </div>
          <div class="avant">{{item.teacherName}}</div>
        </div>
        <el-button type="primary" v-show="this.teacherData.length < this.total" style="float: right" @click="getMore">加载更多</el-button>
      </div>
      <div class="right">
        <ve-pie :data="chartData"></ve-pie>
        <div class="add_teacher">
          <div class="title">添加教师</div>
          <el-form :model="form" :rules="rules" ref="form" label-width="80px" label-position="left">
            <el-form-item label="教师姓名" prop="teacherName">
              <el-input v-model="form.teacherName" aria-placeholder=""></el-input>
            </el-form-item>

            <el-form-item label="教师编号" prop="teacherID">
              <el-input v-model="form.teacherID"></el-input>
            </el-form-item>
            <el-form-item label="教师年龄" prop="teacherAge">
              <el-input v-model="form.teacherAge"></el-input>
            </el-form-item>
            <el-form-item label="教师简介" prop="teacherDes">
              <el-input v-model="form.teacherDes"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="teacherPwd">
              <el-input type="password" v-model="form.teacherPwd"></el-input>
            </el-form-item>

            <el-form-item label="教师系别" prop="department">
              <el-select v-model="form.departmentName" placeholder="请选择" style="width:100%">
                <el-option v-for="item in department" :key="item.departmentID" :label="item.departmentName" :value="item.departmentID"></el-option>
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
        chooseCourse: "",
        dialogFormVisible: false,

        teacherData: [],
        chartData: {
          columns: ["用户", "数量"],
          rows: [{ 用户: "已展示用户", 数量: 0 }, { 用户: "未展示用户", 数量: 0 }]
        },
        total: 0,
        page: 1,
        form: {
          teacherID: "",
          teacherName: "",
          teacherPwd: "",
          departmentName: "",
          teacherAge: "",
          teacherDes: ""
        },
        rules: {
          teacherID: [
            { required: true, message: "请填写信息", trigger: ["change", "blur"] }
          ],
          teacherName: [
            { required: true, message: "请填写信息", trigger: ["change", "blur"] }
          ],
          teacherPwd: [
            { required: true, message: "请填写信息", trigger: ["change", "blur"] }
          ],
          departmentName: [
            { required: true, message: "请填写信息", trigger: "change" }
          ]
        },
        department: [],
        value: "",
        editItem: {}
      };
    },
    methods: {
      onEdit(item) {
        console.log(item)
        this.dialogFormVisible = true
        this.editItem = item;
      },

      modifyUser() {
        this.$confirm("确认修改吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
                .then(() => {
                    // this.editItem.teacherAge=Number(this.editItem.teacherAge);
                    let obj = this.editItem;
                    this.axios
                          .post("/modifyTeacherInfo",obj)
                          .then(res => {
                            if (res.data.code == 1) {
                              this.$message({
                                type: "success",
                                message: "保存成功!"
                              });
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
        this.dialogFormVisible = false;
      },
      getTeacherData(callback) {
        this.axios
                .get("/getTeacherData?page=" + this.page)
                .then(res => {
                  if (res.data.code == 1) {
                    this.total = res.data.data.total;
                    this.teacherData = [
                      ...this.teacherData,
                      ...res.data.data.teacherData
                    ];
                    callback();
                  }
                })
                .catch(err => {
                  console.log(err);
                  this.$message("服务器无法连接");
                });
      },
      getMore() {
        this.page++;
        this.getTeacherData(() => {
          this.chartData.rows[0].数量 = this.teacherData.length;
          this.chartData.rows[1].数量 = this.total - this.teacherData.length;
        });
      },
      deleteUser(id, index) {
        this.$confirm("您确定要删除该教师吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
                .then(() => {
                  this.axios
                          .get("/deleteTeacher?teacherID=" + id)
                          .then(res => {
                            if (res.data.code == 1) {
                              this.total--;
                              this.teacherData.splice(index, 1);
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
      getDepartment() {
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
      addTeacher() {
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
                          .post("/addTeacher", obj)
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
                                        this.total - this.teacherData.length;
                              });
                            } else {
                              this.$message.error("该工号已被注册！");
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
            this.addTeacher();
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
      this.getTeacherData(() => {
        this.chartData.rows[0].数量 = this.teacherData.length;
        this.chartData.rows[1].数量 = this.total - this.teacherData.length;
      });
      this.getDepartment();
    }
  };
</script>

<style lang='scss' scoped>
  /*.fromteacher {*/
    /*width: 550px;*/
  /*}*/
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
        height: 480px;
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
