<template>
  <div id="box">
    <el-form ref="form" :model="form" label-width="50px" action="http://10.20.158.17:3000/doUserName">
      <el-form-item label="用户昵称" label-width="50px">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="性       别" >
        <el-select v-model="form.sex">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="出生年月" >
        <el-col :span="11">
          <el-input v-model="form.birthday" size="medium" type="datetime"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="兴趣爱好">
        <el-checkbox-group v-model="form.label">
          <el-checkbox label="美食" name="type"></el-checkbox>
          <el-checkbox label="旅游" name="type"></el-checkbox>
          <el-checkbox label="摄影" name="type"></el-checkbox>
          <el-checkbox label="阅读" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="个性签名">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancel" >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
#box {
  width: 30%;
  margin: 50px auto;
  white-space: pre;
}
.el-form-item{
  display: flex;

}
.el-col-11{
  width: 100%;
}

</style>
<script>
export default {
  created: function() {
    if (localStorage.getItem("islogin") != "true") {
      window.location.href = "#/login";
    } else {
      this.form.user = localStorage.getItem("user");
      var src = "http://10.20.158.17:3000/centerPer?user=" + this.form.user;
      this.$axios
        .get(src)
        .then(res => {
          this.form.name = res.data.username;
          this.form.sex = res.data.sex;
          this.form.birthday = res.data.birthday;
          this.form.desc = res.data.describe;
          this.form.label= res.data.label
        })
        .catch(err => {});
    }
  },
  data() {
    return {
      form: {
        user: "",
        name: "",
        sex: "",
        birthday: "",
        label: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    cancel(){
 window.location.href = "#/center";
    },
    onSubmit() {
      var bir = this.form.birthday.toString();
      //this.form.birthday = this.form.birthday.substring(0,9)
      var src = "http://10.20.158.17:3000/doUserName";
      this.$axios
        .get(src, {
          params: {
            form: this.form
          }
        })
        .then(res => {
          window.location.href = "#/center";
        })
        .catch(err => {});
    }
  }
};
</script>