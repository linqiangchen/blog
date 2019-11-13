<template>
  <div id="app">
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1"><router-link :to="{name: 'HelloWorld'}">首页</router-link></el-menu-item>

   
  <el-menu-item index="2"><router-link :to="{name: 'card'}">小屋</router-link></el-menu-item>
  
  
    <el-menu-item index="3"><router-link :to="{name: 'xce'}">相册</router-link></el-menu-item>
  <el-menu-item index="4" ><router-link :to="{name: 'personer'}">纪念</router-link></el-menu-item>
</el-menu>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
   data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
h1{
  margin-top: 60px;
}
a {
  text-decoration: none;
}
router-link{
  text-decoration: none;
}

</style>
