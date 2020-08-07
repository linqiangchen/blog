<template>
  <div class="regist-wrap">
    <el-form status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机">
        <el-input v-model="user" placeholder="请输入11位手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="pass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>

        <el-button @click="clear()">重置</el-button>
        <a href="#/regist">没有账号，注册一个呗</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      pass: ""
    };
  },
  methods: {
    submitForm: function() {
      this.checkUser();
      this.checkPass();
      if(!this.user.trim()|| !this.pass.trim()){
        this.$message.error('用户名或密码不能为空');
        return;
      }
      let data = { user: this.user, pass: this.pass };
      this.$axios.post("http://10.20.158.17:3000/dologin", data).then(result => {
        if (result.data.res == "ok") {
          localStorage.setItem("islogin", "true");
          localStorage.setItem("user", this.user);
          window.location.href = "/";
        } else {
          this.$message.error('用户名或密码错误');
        }
      });
    },
    checkUser: function() {
      var reg = /[^0-9]/
      if (this.user.length != 11) {
        this.$message.error("请输入正确的电话号码");
        this.clear();
      }else if(reg.test(this.user)){
        this.$message.error("请输入正确的电话号码");
        this.clear();
      }
    },
    checkPass: function() {
      if (this.pass.length < 8) {
       this.$message.error("密码长度应大于8");
        this.clear();
      }
    },
    clear: function() {
      this.user = "";
      this.pass = "";
    }
  }
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
