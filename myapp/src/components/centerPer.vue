<template>
  <div id="center">
    <div id="left">
      <avatr :size="80" :user="user"></avatr>
      <router-link class="link" :to="{name: 'upAvatr'}">修改头像</router-link>
      <router-link class="link" :to="{name: 'userName'}">修改资料</router-link>
      <router-link class="link" :to="{path:`/user/${user}`}">个人主页</router-link>
      <a class="link" @click="exit()">退出登录</a>
    </div>
    <div id="right">
      <ul>
        <li>昵 称: {{msg.username}}</li>
        <li>性 别: {{msg.sex}}</li>
        <li>出生年月: {{msg.birthday}}</li>
        <li>兴趣爱好: {{msg.label}}</li>
        <li>个性签名: {{msg.describe}}</li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
#box {
  width: 80%;
  margin: 0 auto;
}
#center {
  display: flex;
  width: 80%;
}
#left {
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-grow: 1;
}
#right {
  padding: 20px;
  flex-grow: 6;
  display: flex;
}
ul {
  text-align: left;
  list-style: none;
}
li {
  white-space: pre;
  height: 35px;
}
#right li:hover {
  color: maroon;
}
.link {
  color: #42b983;
  margin-left: 10px;
  cursor: pointer;
}
</style>
<script>
export default {
  created() {
    if (localStorage.getItem("islogin") != "true") {
      window.location.href = "#/login";
    }
    var user = localStorage.getItem("user");
    this.user = user;
    this.$axios
      .get("http://10.20.158.17:3000/centerPer?user=" + user)
      .then((res) => {
        this.msg = res.data;
        this.msg.label = this.msg.label.toString();
      })
      .catch((err) => {});
  },
  data() {
    return {
      msg: {},
      user: "",
    };
  },
  methods: {
    exit: function () {
      localStorage.setItem("islogin", false);
      localStorage.setItem("user", "");
      window.location = "/";
    },
  },
};
</script>