<template>
  <div id="myapp">
    <h1 class="title">{{msg}}</h1>
    <el-carousel :interval="2000" type="card" height="400px">
      <el-carousel-item v-for="item in data" :key="item.id" class="liti">
       <h1  class="card ">{{item.cont}}</h1>
          <span>---------{{item.author}}</span>
      </el-carousel-item>
    </el-carousel>
    <!-- <el-row class="but">
      <el-button round>
        <router-link :to="{name: 'login'}">登录</router-link>
      </el-button>
      <el-button round>
        <router-link :to="{name: 'regist'}">注册</router-link>
      </el-button>
    </el-row> -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  created() {
      this.$axios.get("http://127.0.0.1:3000/user")
      .then((res) => {
       
       this.data = res.data;
      })
      .catch(err => {
        console.log(err)
      })

    },
  data() {
    return {
      msg: "Welcome to Your Secret Cabin",
      data:""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
el-row {
  margin-top: 60px;
}
.but{
  margin-top: 20px;
}
.title{
  margin-bottom: 25px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
 background-color: rgba(29, 54, 52, 1)

}
.el-carousel__item:nth-child(2n + 1) {
  background-color: rgba(29, 54, 52,1 )

}
.liti{
  box-sizing: border-box;
   padding-left: 50px;
   padding-right: 50px;
}
h1,
h2 {
  font-weight: normal;
  font-size: 3em;
  line-height: 50px;
}
ul {
  list-style-type: none;
  padding: 0;
}
h1 {
  font-size: 30px;
  
}
span {
   letter-spacing: 8px;
  display: block;
margin-top: 50px;
  font-size: 20px;
 margin-left: 150px;
 color:white;
        text-shadow: 1px 1px 0px #eee, 1.5px 1.5px 0px #ddd, 2px 2px 0px #ccc;
}

li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.router-link-active {
  text-decoration: none;
}
.card{

  margin-top: 150px;
  letter-spacing: 8px;
 color:white;
        text-shadow: 1px 1px 0px #eee, 2px 2px 0px #ddd, 3px 3px 0px #ccc;
        /* background-color: rgba(29, 54, 52, 0.822) */
}
</style>
