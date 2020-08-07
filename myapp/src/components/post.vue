<template>
  <div id="Box"> 
   
<div class="li" v-for="(item,index) in msg" :key="index" :class="{none:item.star == -1}" @dblclick="removePost(item._id,item.user.user,item)">     
       <div class="text" @click="toPost(item._id)">{{item.con}}</div> 
       <div id="bottom">
        <div id="left">
            <router-link :to="{path:`/user/${item.user.user}`}">
            <img :src="item.user.avatr" alt="" class="_avatr">
          </router-link>
          <span @click="toCenter(item.user.user)">{{item.user.username}}</span>
          <span>{{item.createTime}}</span>
        </div>
      
         <div id="right">
          <span class="span">
            <i class="el-icon-view">{{item.read}}</i>
          </span>
          <span class="span" @click="star(item._id,index)">
            <i class="el-icon-star-off">{{item.star}}</i>
          </span>
          <span class="span" @click="show(item._id,index)">
            <i class="el-icon-link"></i>
          </span>

          <a class="span" @click="comment(item._id)">
            <i class="el-icon-edit"></i>
          </a>
        </div> 
      </div>  
      

</div>
    
    </div>


  
</template>


<style  scoped>
.span {
  box-sizing: border-box;
  color: black;
}
._avatr{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.span :hover {
  transform: scale(1.5);
  color: lightcoral;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.li:hover .text{
  color: brown;
}
.time {
  font-size: 13px;
  color: #999;
}
#bottom {
  margin-top: 10px;
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  justify-content: space-between;
  padding: 10px;
}

.li {
  transition: 0.5s;
  padding: 10px;
  box-sizing: border-box;
  width: 500px;
margin: 30px;
  border: 1px solid rgba(204, 204, 204, 0.836);
  border-radius: 5px;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.12), 0 6px 6px rgba(0, 0, 0, 0.04);
}
.li:hover{
  transform: translateY(-4px);
   box-shadow: 0 0 20PX lightseagreen;
}
.none{
  display: none;
}
#right {
  display: flex;
  flex-direction: row;
  width: 200px;
  justify-content: space-between;
}

#left {
  display: flex;
  flex-direction: row;
  width: 220px;
  justify-content: space-between;
}

#Box {
  margin: 0 auto;
  width: 1200px;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
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
  },
  methods: {
     toCenter(user){
      location.href = '#/user/'+ user
    },
      toPost(id){
        location.href = '#/comment/'+ id
    },
    removePost:function(id,user,item){
      var that = this
     if(user == this.user){
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

         that.$axios
        .get("http://10.20.158.17:3000/removePost", {
          params: {
            user: user,
            id: id
          }
        })
        .then(res => {
          if (res.data == "error") {
             that.$message.error("你已经收藏过了呦");
            
          } else {
           this.$message.success("删除成功");
            // that.reload();
        item.star = -1;
          }
        })
        .catch(err => {
          
        });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   
     }
   
    },
  
    comment: function(id) {
      this.$router.push({ path: `/comment/${id}` });
    },
    star: function(id, index) {
      this.$axios
        .get("http://10.20.158.17:3000/star", {
          params: {
            user: this.user,
            id: id,
            star: this.msg[index].star
          }
        })
        .then(res => {
          if (res.data != false) {
            this.msg[index].star++;
            this.msg[index].read++;
          } else {
            this.$message.error("你已经点过赞了");
          }
        })
        .catch(err => {
          
        });
    },
 
    show: function(id,index) {
      var user = localStorage.getItem("user");
      this.$axios
        .get("http://10.20.158.17:3000/shoucang", {
          params: {
            user: user,
            id: id
          }
        })
        .then(res => {
          if (res.data == false) {
             this.$message.error("你已经收藏过了呦");
            
          } else {
            this.msg[index].read++;
           this.$message.success("收藏成功");
          }
        })
        .catch(err => {
          
        });
    }
  },
  props: ["posts"],
inject:['reload'],
  watch: {
    posts: function(newVal, oldVal) {
      this.msg = newVal
    }
  },
  data() {
    return {
      msg: this.posts,
      user: "",
  
    };
  }
};
</script>