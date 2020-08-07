<template>
  <div class="container">
    <div class="card">
      <el-input
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 6}"
        placeholder="请输入内容"
        v-model="textarea1"
        class="el-input"
      ></el-input>
      
      <el-button round class="but" :plain="true" @click="send">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  created: function () {
    if (localStorage.getItem("islogin") != "true") {
      window.location.href = "#/login";
    } else {
      this.user = localStorage.getItem("user");
    }
  },
  methods: {
    getTime: function () {
      var date = new Date();
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var mm =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return MM + DD + " " + hh + mm;
    },
    send: function () {
      if (!this.textarea1) {
        this.$message({
          message: "警告哦，内容不能为空",
          type: "warning",
          center: true,
        });
      } else {
        this.time = this.getTime();
        this.$axios
          .get("http://10.20.158.17:3000/add", {
            params: {
              time: this.time,
              cont: this.textarea1,
              user: this.user,
            },
          })
          .then((res) => {
            this.$message({
              message: "保存成功",
              type: "success",
              center: true,
            });
          })
          .catch((err) => {});
      }
    },
  },
  data() {
    return {
      textarea1: "",
      time: "",
      user: "",
    };
  },
};
</script>
<style scoped>
.el-input {
  width: 350px;
}
.but{
  margin-top:20px;
}
.card {
 
}

</style>
