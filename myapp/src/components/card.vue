<template>
  <div>
    <post :posts="msg"></post>
    <el-dialog title="快来分享吧" :visible.sync="dialogVisible" width="30%">
      <index></index>
    </el-dialog>
    <div class="select">
      <ul>
        <li @click="showPost">我的文章</li>
        <li @click="showFollow">我的收藏</li>
        <li @click="showAll">所有文章</li>
        <li @click="dialogVisible = true">写文章</li>
        <li @click="top">回到顶部</li>
      </ul>
    </div>
  </div>
</template>
<style  scoped>
.add {
  position: fixed;
  border-radius: 50%;
  top: 80px;
  right: 20px;
  width: 80px;
  height: 80px;
  background: lightcoral;
}
.select {
  position: fixed;
  right: -85px;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
}
.select ul {
  width: 100px;
}
.select ul li {
  cursor: pointer;
  transition: all 0.5s;
  position: relative;
  width: 100px;
  margin: 10px 0;
  height: 30px;
  padding-left: 10px;
  line-height: 30px;
  background: lightseagreen;
  border-radius: 100px 0px 0 100px;
}
.select ul li:hover {
  color: white;
  transform: translateX(-90px);
  box-shadow: 0px 0px 20px lightseagreen;
}
.el-card {
  box-sizing: border-box;
  width: 300px;
  height: 300px;
  margin: 20px;
  padding: 20px;
  letter-spacing: 5px;
  background-color: rgba(29, 54, 52, 1);
  color: white;
  text-shadow: 1px 1px 0px #eee, 1.5px 1.5px 0px #ddd, 2px 2px 0px #ccc;
  cursor: pointer;
  box-shadow: 5px 5px #ccc;
  border-radius: 20px;
}
h1 {
  font-size: 20px;
  margin-top: 80px;
}
span {
  display: block;
  margin-top: 30px;
  margin-left: 50px;
}

.card-wrap {
  justify-content: space-evenly;
  box-sizing: border-box;
  flex-wrap: wrap;
  margin: 150px auto;
  display: flex;
}
</style>

<script>
export default {
  created() {
    if (localStorage.getItem("islogin") != "true") {
      window.location.href = "#/login";
    } else {
      this.user = localStorage.getItem("user");
    }
    this.$axios
      .get("http://10.20.158.17:3000/post")
      .then((res) => {
        this.all = res.data;
        this.msg = this.all;
      })
      .catch((err) => {});
    this.$axios
      .get("http://10.20.158.17:3000/myPosts?user=" + this.user)
      .then((res) => {
        this.myPosts = res.data;
      })
      .catch((err) => {});
    this.$axios
      .get("http://10.20.158.17:3000/myShoucang?user=" + this.user)
      .then((res) => {
        this.shou = res.data.posts;
      })
      .catch((err) => {});
  },

  data() {
    return {
      msg: "",
      user: "",
      myPosts: [],
      shou: [],
      all: [],
      dialogVisible: false,
    };
  },
  inject: ["reload"],
  methods: {
    animate(dom, obj, callback) {
      for (var attr in obj) {
        if (attr === "opacity") {
          var current = parseInt(getComputedStyle(dom, null)[attr] * 100);
          var target = obj[attr] * 100;
        } else if (attr.indexOf("scroll") !== -1) {
          var current = dom[attr];
          var target = obj[attr];
        } else {
          var current = parseInt(getComputedStyle(dom, null)[attr]);
          var target = obj[attr];
        }
        obj[attr] = {
          current: current,
          target: target,
        };
      }
      dom.timer = setInterval(function () {
        for (var key in obj) {
          var current = parseInt(obj[key].current);
          var target = obj[key].target;
          var speed =
            (target - current) / 10 >= 0
              ? Math.ceil((target - current) / 10)
              : Math.floor((target - current) / 10);
          if (Math.abs(target - current) <= Math.abs(speed)) {
            if (key === "opacity") {
              dom.style[key] = target / 100;
            } else if (attr.indexOf("scroll") !== -1) {
              dom[key] = target;
            } else {
              dom.style[key] = target + "px";
            }
            delete obj[key];
            for (var item in obj) {
              return;
            }
            typeof callback === "function" ? callback() : "";
            clearInterval(dom.timer);
          } else {
            obj[key].current += speed;
            if (key === "opacity") {
              dom.style[key] = current / 100;
            } else if (attr.indexOf("scroll") !== -1) {
              dom[key] = current;
            } else {
              dom.style[key] = current + "px";
            }
          }
        }
      }, 20);
    },
    top() {
      this.animate(document.documentElement, { scrollTop: 0 });
    },
    showAll() {
      this.msg = this.all;
    },
    showPost() {
      this.msg = this.myPosts;
    },
    showFollow() {
      this.msg = this.shou;
    },
  },
};
</script>
