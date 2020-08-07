<template>
  <div class="regist-wrap">
    <el-form status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机">
        <el-input v-model="user" placeholder="请输入11位手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="pass" autocomplete="off" placeholder="密码长度至少为8"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="checkpass" autocomplete="off" placeholder="密码长度至少为8"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="clear()">重置</el-button>
           <a href="#/login">已有账号前往登录</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      pass: "",
      checkpass: "",
    };
  },
  methods: {
    submitForm: function () {
      this.checkUser();
      this.checkPass();
      if (this.checkUser() && this.checkPass()) {
        let data = { user: this.user, pass: this.pass };
        this.$axios.post("http://10.20.158.17:3000/dores", data).then((res) => {
          if (res.data == "ok") {
            localStorage.setItem("islogin", "true");
            localStorage.setItem("user", this.user);
            if (confirm("注册成功，请完善个人信息") == true) {
              window.location.href = "#/userName";
            }
          } else {
            this.$message.error("用户名重复");
          }
        });
      }
    },
    checkUser: function () {
      var reg = /[^0-9]/
      if (this.user.length != 11) {
        this.$message.error("请输入正确的手机号");
        this.clear();
        return false;
      } else if (reg.test(this.user)) {
        this.$message.error("请输入正确的电话号码2");
        this.clear();
        return false;
      }
      return true;
    },
    checkPass: function () {
      if (this.pass.length < 8) {
        this.$message.error("密码长度不足");
        this.clear();
        return false;
      }
      if (this.pass != this.checkpass) {
        this.$message.error("密码不一致");
        return false;
      }
      return true;
    },
    clear: function () {
      this.user = "";
      this.pass = "";
    },
  },
};
</script>
</script>
<style  scoped>
.regist-wrap {
  width: 400px;
  height: 400px;
  margin: 100px auto;
}
</style>
