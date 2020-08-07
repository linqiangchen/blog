<template>
  <div id="box">
    <ul class="left">
      <li @click="Switch(msg,1)" class="_active">个 人 信 息</li>
      <li @click="Switch(myPosts,2)">我 的 帖 子</li>
      <li @click="Switch(msg.posts,3)">我 的 收 藏</li>
      <li @click="Switch(msg.follow,4)">我 的 关 注</li>
      <li @click="Switch(fans,5)">我 的 粉 丝</li>
    </ul>
    <div id="right">
      <component :is="com" :posts="myProps"></component>
    </div>
  </div>
</template>
<style scoped>
ul {
  padding-right: 20px;
  border-right: 2px solid lightseagreen;
  width: 150px;
  list-style: none;
  display: flex;
  flex-direction: column;
  white-space: pre;
}
li {
  transition: 0.5s;
  line-height: 30px;
  cursor: pointer;
}
li:hover {
  background: #545c64;
  color: white;
}
.left ._active {
  background: lightseagreen;
  color: white;
}
#box {
  padding: 10px;
  list-style: none;
  display: flex;
  flex-direction: row;
}
#right {
  flex: 6;
}
</style>
<script>
export default {
  created() {
    if (localStorage.getItem("islogin") != "true") {
      window.location.href = "#/login";
    }
    this.user = localStorage.getItem("user");
    this.$axios
      .get("http://10.20.158.17:3000/centerPer?user=" + this.user)
      .then((res) => {
        this.msg = res.data;
        this.$axios
          .get("http://10.20.158.17:3000/fans?id=" + this.msg._id)
          .then((res) => {
            this.fans = res.data;
          })
          .catch((err) => {});
      })
      .catch((err) => {});
    this.$axios
      .get("http://10.20.158.17:3000/myPosts?user=" + this.user)
      .then((res) => {
        this.myPosts = res.data;
      })
      .catch((err) => {});
  },
  methods: {
    Switch(props, com) {
      let li = document.querySelectorAll("#box .left li");
      li[this.active - 1].classList.remove("_active");
      li[com - 1].classList.add("_active");
      this.active = com;
      switch (com) {
        case 1: {
          this.com = "centerPer";
          this.myProps = "";
          break;
        }
        case 2: {
          this.com = "post";
          this.myProps = props;
          break;
        }
        case 3: {
          this.com = "post";
          this.myProps = props;
          break;
        }
        case 4: {
          this.com = "userFollow";
          this.myProps = props;
          break;
        }
        case 5: {
          this.com = "fans";
          this.myProps = props;
          break;
        }
      }
    },
  },
  data() {
    return {
      user: "",
      com: "centerPer",
      myProps: "",
      msg: "",
      myPosts: [],
      fans: [],
      active: 1,
    };
  },
};
</script>
