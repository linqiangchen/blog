<template>
  <el-row class="demo-avatar demo-basic">
    <el-col :span="12">
      <div class="block">
        <el-avatar :size="size" :src="circleUrl"></el-avatar>
      </div>
    </el-col>
  </el-row>
</template>
<style lang="" scope="">
.el-avatar img {
  margin-top: -4px;
  display: inline-block;
}
</style>
<script>
export default {
  created() {
    this.avatrUser = this.user;
    var islogin = localStorage.getItem("islogin");
    localStorage.getItem("islogin");
    if (islogin !== "true" || localStorage.getItem("user") === null) {
      window.location.href = "#/login";
    } else {
      this.$axios
        .get("http://10.20.158.17:3000/avatr?user=" + this.user)
        .then((res) => {
          this.circleUrl = res.data.result;
        })
        .catch((err) => {});
    }
  },
  updated() {
    this.avatrUser = this.user;
    var islogin = localStorage.getItem("islogin");
    localStorage.getItem("islogin");
    if (islogin !== "true" || localStorage.getItem("user") === null) {
      window.location.href = "#/login";
    } else {
      this.$axios
        .get("http://10.20.158.17:3000/avatr?user=" + this.user)
        .then((res) => {
          this.circleUrl = res.data.result;
        })
        .catch((err) => {});
    }
  },
  props: ["size", "user"],
  watch: {
    user: function (newVal, oldVal) {
      this.user = newVal;
    },
  },
  data() {
    return {
      myuser: "",
      circleUrl: "",
      avatrUser: "",
    };
  },
};
</script>