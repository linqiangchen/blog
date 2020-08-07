<template>
 <div class="wrap">
    <div class="_box">
    <div class="post_">
        <h2>文章人气榜</h2>
            <ul>
        <li v-for="(item,index) in posts" :key="index">
           <router-link :to="{path:`/user/${item.user.user}`}">
            <img :src="item.user.avatr" alt="">
            </router-link>
             <i class="el-icon-view">{{item.read}}</i>
             
             <span @click="toPost(item._id)">{{item.con}}</span>
        </li>
        </ul>
    </div>
    <div class="user">
     <h2>活跃之星</h2>
          <ul>
        <li v-for="(item,index) in users" :key="index">
           <router-link :to="{path:`/user/${item.user}`}">
            <img :src="item.avatr" alt="">
           </router-link>
            <span class="_name" @click="toCenter(item.user)">{{item.username}}</span>
             <span>{{item.describe || '这个人很懒，什么也没有留下'}}</span>
        </li>
        </ul>
    </div>

    <div class="myimage">
    <h2>摄影爱好者</h2>
        <ul>
        <li v-for="(item,index) in images" :key="index">
             <router-link :to="{path:`/user/${item.user}`}">
            <img :src="item.avatr" alt="">
           </router-link>
              <span class="_name" @click="toCenter(item.user)" >{{item.username}}</span>
             <a @click="to(item.user)">他的相册</a>
                <i class="el-icon-camera-solid">{{item.image.length}}</i>
        </li>
        </ul>
    </div>
    </div>
 </div>
</template>
<style lang="" scope="">
.wrap ._box img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
._box .user{
top:-100px;
}
.post_ i{
  margin: 0 10px;
}
.myimage a{
  width: 60px;
  text-align: left;
}
._box ._name{
  margin: 0 10px;
  display: block;
  width: 60px;
}
._box{
    padding: 20px 0;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}
._box div{
    transition: 0.5s;
position: relative;
    margin: 150px 40px 0;
    padding:  20px;
    border: 1px #ccc solid;
 
    box-shadow: 0px 0px 20px #999;
}
._box div:hover{
    transform: translateY(-4px);
     box-shadow: 0px 0px 30px lightseagreen;
}
li:hover{
  color: brown;
}
._box ul li {
  cursor: pointer;
    margin: 20px 0;
    width: 350px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
._box ul li  span{
    text-align: left;
    display: block;
    width: 250px;
      overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
}
._box .myimage ul li  span{
 
    width: 150px;

  
}
._box .myimage ul li  i{
 text-align: center;
    width: 20px;
    text-align: left;

}
._box ul li  a{
    text-align: left;
    display: block;
    width: 80px;
      overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
}


</style>
<script>
export default {
  created() {
   
    var islogin = localStorage.getItem("islogin");
    localStorage.getItem("islogin");
    if (islogin !== "true" || localStorage.getItem("user") === null) {
      window.location.href = "#/login";
    } else {
         this.$axios
      .get("http://10.20.158.17:3000/post")
      .then(res => {
          let _data = res.data.sort((b,a)=> a.read - b.read).slice(0,5)
        this.posts = _data 
      })
      .catch(err => {
        
      });


       this.$axios
      .get("http://10.20.158.17:3000/allUser")
      .then(res => {
          let _user;
          let _image;
          if(res.data.length>=5){
               res.data.forEach(item => item.avatr = "http://10.20.158.17:3000/" + item.avatr) 
               _user = res.data.sort((b,a)=> a.posts.length - b.posts.length ).slice(0,5);
               _image = res.data.sort((b,a)=> a.image.length - b.image.length ).slice(0,5);
          }else{
               _user = res.data;
               _image = res.data
          }
    
        
        this.users = _user
        this.images = _image
      })
      .catch(err => {
        
      });
    //   this.$axios
    //     .get("http://10.20.158.17:3000/avatr?user=" + this.user)
    //     .then((res) => {
    //       this.circleUrl = res.data.result;
    //     })
    //     .catch((err) => {});
    }
  },
methods:{
    to(user){
        location.href = '#/userImage/'+ user
    },
    toCenter(user){
      location.href = '#/user/'+ user
    },
    toPost(id){
        location.href = '#/comment/'+ id
    }
},
  data() {
    return {
      posts:[],
      users:[],
      images:[]
    };
  },
};
</script>