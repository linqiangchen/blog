<template>
  <div id="app">
    <div class="nav-wrap">
      <div class="mynav">
        <div class="left">
          <ul>
            <li>
              <router-link :to="{name: 'HelloWorld'}">首页</router-link>
            </li>
            <li>
              <router-link :to="{name: 'post'}">树屋</router-link>
            </li>
            <li>
              <router-link :to="{name: 'xce'}">摄影</router-link>
            </li>
            <li>
              <router-link :to="{name: 'ranking'}">排行</router-link>
            </li>
            <li>
              <router-link :to="{name: 'bu'}">广场</router-link>
            </li>
          </ul>
        </div>
        <div class="right">
          <search ></search>
          <li class="_avatr">
            <router-link to="/center">
              <avatr :size="50" :user="user"></avatr>
            </router-link>
          </li>
        </div>
        <div class="liner">
        <div class="bar" :style="left"></div></div>
      </div>
    </div>
    <router-view v-if="isRouterAlive" class="content" />
  </div>
</template>


<style  >
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
::-webkit-scrollbar{
  display: none;
}
.liner{
  width: 1200px;
  height: 5px;
  position: absolute;
  bottom: -5px;

}
._avatr{
  margin-right: 10px;
}
.bar{
  transition: 0.5s ease-in-out;
border-radius: 3px;
top:-6px;
  position: absolute;
  width: 120px;
  height: 6px;
  left: 0px;
  background: #fb414c;
}
#app{
  width: 100%;
}

a {
  text-decoration: none;
}
.left li {
  box-sizing: content-box;
}
.nav-wrap {
  position: sticky;
  top: 0;

  min-width: 1200px;
  margin: 0 auto;
  height: 60px;
  z-index: 99;
  background-color: #545c64;
}
.mynav {
  margin: 0 auto;
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mynav .left {
  width: 600px;
}
.mynav .left ul {
  width: 600px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mynav .right {
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.avatr {
  margin-top: 10px;
}
body,
html {
  height: 100%;
}
#app {
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  margin-top: 60px;
}

.mynav .left a {
  transition: 0.5s;
  display: block;
  width: 120px;
  height: 60px;
  line-height: 60px;
  text-decoration: none;
  color: #fff;
}
.mynav .left a:hover {
  color: #fb414c;
}

</style>
<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  created: function () {
    if (localStorage.getItem("islogin") != "true") {
      window.location.href = "#/login";
    } else {
      this.user = localStorage.getItem("user");

      this.islogin = true;
    }
  },
  mounted() {
    var allLi = document.querySelectorAll(" .mynav li");

    switch (location.hash) {
     case "#/": {
        allLi[this.next].classList.remove("active");
        allLi[0].classList.add("active");
        this.next = 0;
        this.left = "left:0px"
        break;
      }
      case "#/post": {
        allLi[this.next].classList.remove("active");
        allLi[1].classList.add("active");
        this.next = 1;
        this.left = "left:120px"
        break;
      }
      case "#/xce": {
        allLi[this.next].classList.remove("active");
        allLi[2].classList.add("active");
        this.next = 2;
        this.left = "left:240px"
        break;
      }
      case "#/center": {
        allLi[this.next].classList.remove("active");
        allLi[5].classList.add("active");
        this.next = 5;
        this.left = "left:1140px;width:50px"

        break;
      }
      case "#/ranking": {
        allLi[this.next].classList.remove("active");
        allLi[3].classList.add("active");
        this.next = 3;
        this.left = "left:360px"
        break;
      }
      case "#/bu": {
        allLi[this.next].classList.remove("active");
        allLi[4].classList.add("active");
        this.next = 4;
        this.left = "left:480px"
        break;
      }
    }
  },
  updated() {
    var allLi = document.querySelectorAll(" .mynav li");

    switch (location.hash) {
      case "#/": {
        allLi[this.next].classList.remove("active");
        allLi[0].classList.add("active");
        this.next = 0;
        this.left = "left:0px"
        break;
      }
      case "#/post": {
        allLi[this.next].classList.remove("active");
        allLi[1].classList.add("active");
        this.next = 1;
        this.left = "left:120px"
        break;
      }
      case "#/xce": {
        allLi[this.next].classList.remove("active");
        allLi[2].classList.add("active");
        this.next = 2;
        this.left = "left:240px"
        break;
      }
      case "#/center": {
        allLi[this.next].classList.remove("active");
        allLi[5].classList.add("active");
        this.next = 5;
        this.left = "left:1140px;width:50px"

        break;
      }
      case "#/ranking": {
        allLi[this.next].classList.remove("active");
        allLi[3].classList.add("active");
        this.next = 3;
        this.left = "left:360px"
        break;
      }
      case "#/bu": {
        allLi[this.next].classList.remove("active");
        allLi[4].classList.add("active");
        this.next = 4;
        this.left = "left:480px"
        break;
      }
    }
  },
  data() {
    return {
      isRouterAlive: true,
      user: "",
      activeIndex: "1",
      activeIndex2: "1",
      islogin: false,
      next: 0,
      left:"left:0px"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      //
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

