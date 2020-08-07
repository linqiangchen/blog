<template>
  <div id="box">
    <div id="header" v-for="(item,index) in msg" :key="index">
      <div id="top">
  
        <router-link :to="{path:`/user/${item.user}`}">
          <avatr :size="60" :user="item.user"></avatr>
        </router-link>
        <span class="name">{{item.username}}</span>
      </div>
      <div id="btn">
        <el-button type="primary" @click="follow(item._id,userSelf)">取消关注</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UpFile",
  created: function() {
  },
  methods: {
    follow: function(id, user) {
      
      
      var that = this
      this.$axios
        .get("http://10.20.158.17:3000/cancelFollow", {
          params: {
            id: id,
            user: user
          }
        })
        .then(res => {
         
            this.$message.success("取消成功");
       that.reload()
               
        })
        .catch(err => {
          
        });
    }
  },
  inject:['reload'],
  props: ["posts"],
  watch: {
    posts: function(newVal, oldVal) {
      this.msg = newVal;
      // 
    }
  },
  data() {
    return {
      user: this.$route.params.user,
      userSelf: localStorage.getItem("user"),
      msg: this.posts
    };
  }
};
</script>
<style  scoped>
#box {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
   flex-wrap: wrap;
}
#top {
  width: 300px;
  padding: 10px;
  display: flex;
 
  justify-content: space-between;
  align-items: center;
}
.name{
  text-align: left;
  display: block ;
  width: 200px;
}
#btn {
  margin-right: 15px;
}
#header {
  border-radius: 10px;
  width: 500px;
  margin: 20px;
  float: left;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  display: flex;
  border: 1px solid #ccc;
  justify-content: space-between;
  align-items: center;
}
#header:hover{
  transition: 0.5s;
   transform: translateY(-4px);
   box-shadow: 0 15PX 20PX rgba(0, 0, 0, 0.1);
}
</style>


