<template>
  <div class="user">
    <div id="header">
      <div id="left">
        <avatr :size="100" :user="user"></avatr>
      </div>
      <div id="right">
        <div id="top">
          <h2>{{msg.username}}</h2>
          <div id="btn">
            <el-button type="primary" @click="follow(msg._id,userSelf)">关注</el-button>
            <el-button type="primary">私信</el-button>
          </div>
        </div>
        <div id="bottom">
          <h2 id="desc">{{msg.describe}}</h2>
        </div>
      </div>
    </div>
    <div id="footer" class="li">
      <ul>
         <li @click="Switch(myPosts,1)" class="active">帖子({{myPosts.length}})</li>
          <li @click="Switch(msg.posts,1)">收藏({{my_c.length}})</li>
          <li @click="Switch(msg.follow,2)">关注({{myfollow.length}})</li>
          <li @click="Switch(fans,3)">粉丝({{fans.length}})</li>
          <li @click="link">相册({{myImage.length }})</li> 
      </ul>
    </div>
    <component :is="com" :posts="myProps"></component>
  </div>
</template>
 


<script>
export default {
  name: "UpFile",
  created: function() {
    
    this.$axios
      .get("http://10.20.158.17:3000/centerPer?user=" + this.user)
      .then(res => {
        
        this.msg = res.data;
        this.myfollow = this.msg.follow
        this.myImage= this.msg.image
        this.my_c = this.msg.posts
        this.$axios
          .get("http://10.20.158.17:3000/fans?id=" + this.msg._id)
          .then(res => {
            
            this.fans = res.data;
            //this.myProps = res.data;
          })
          .catch(err => {
            
          });
      })
      .catch(err => {
        
      });
    this.$axios
      .get("http://10.20.158.17:3000/myPosts?user=" + this.user)
      .then(res => {
        
        this.myPosts = res.data;
        this.myProps = res.data;
      })
      .catch(err => {
        
      });
  },
    mounted() {
      var lis = [...document.querySelectorAll(".li ul li")]
    
    lis.forEach((item,index)=>{
      item.onclick = ()=>{
        lis[this.active].classList.remove('active')
        lis[index].classList.add('active');
        this.active = index;
      }
    })
  
    },
  methods: {
    link(){
      location.href= '#/userImage/' + this.msg.user;
    },
    Switch: function(props, com) {
      this.myProps = props;
      
      switch (com) {
        case 1: {
          this.com = "post";
          break;
        }
        case 2: {
          
          this.com = "userFollow";
          this.myProps = props;
          break;
        }
        case 3: {
          
          this.com = "fans";
          this.myProps = props;
          break;
        }
        case 4: {
          
          this.com = "userImage";
          this.myProps = this.msg.user;
          break;
        }
      }
    },
    follow: function(id, user) {
      
      
      this.$axios
        .get("http://10.20.158.17:3000/follow", {
          params: {
            id: id,
            user: user
          }
        })
        .then(res => {
          
          if (res.data == false) {
            this.$message.error("你已经关注了");
          } else {
            this.$message.success("关注成功");
          }
          //this.msg = res.data;
        })
        .catch(err => {
          
        });
    }
  },
  watch: {
    "$route.params.user": function(newVal, oldVal) {
      this.user = newVal;
      location.reload();
    }
  },
  data() {
    return {
      user: this.$route.params.user,
      active:0,
      userSelf: localStorage.getItem("user"),
      msg: [],
      com: "post",
      myPosts: [],
      myProps: "",
      fans: [],
      myfollow:[],
      myImage:[],
      my_c:[]
    };
  }
};
</script>
<style  scoped>
ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0px 80px;
}
#desc {
  margin-top: 50px;
}
.active{
  margin-top: 0px;
 border-bottom: 2px lightseagreen solid;
}
li {
 padding: 10px ;
  cursor: pointer;
  font-weight: bolder;
  box-sizing: border-box;
}
li:hover {
  color: maroon;
}
.user {

  width: 1200px;
  margin: 0px auto;
}
#header {
  margin-bottom: 10px;
  margin-top: 10px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  display: flex;

}
#footer {
 
  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
#left {
  margin: 30px;
  width: 120px;
}
#right {
  flex-grow: 1;
  padding: 20px;
}
#bottom {
  display: flex;
}

#top {
  display: flex;
  flex-direction: row;
  height: 40px;
  text-align: center;
  justify-content: space-between;
  align-items: center;
}
</style>


