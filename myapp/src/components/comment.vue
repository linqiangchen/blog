<template>
  <div id="Box">
    <div class="li">
      <div class="text">{{msg.con}}</div>
      <div id="bottom">
        <div id="left">
           <router-link :to="{path:`/user/${Users}`}">
             <img :src="avatr" alt="" class="user_avatr">
           </router-link>
          <span>{{msg_user.username}}</span>
          <span>{{msg.createTime}}</span>
        </div>
        <div id="right">
          <span class="span">
            <i class="el-icon-view">{{msg.read}}</i>
          </span>
          <span class="span" @click="star(msg._id,msg.star)">
            <i class="el-icon-star-off">{{msg.star}}</i>
          </span>
          <span class="span" @click="show(msg._id)">
            <i class="el-icon-link"></i>
          </span>
          
        </div>
      </div>
    </div>
    
    <div id="input">
      <el-input type="textarea" id="reply" :placeholder="message" v-model="comment"></el-input>
      <el-button type="primary" id="btn" @click="doComment(msg._id,reply,comment_id)">{{btn}}</el-button>
    </div>
    <div class="comment" id="comment" v-for="(item,index) in comments" :key="index">
      <div class="comment_top">
        <div class="comment_top_left">
          <router-link :to="{path:`/user/${item.user.user}`}">
            <avatr :size="40" :user="item.user.user"></avatr>
          </router-link>

          <span>{{item.user.username}}</span>
          <span>{{item.createTime}}</span>
        </div>
        <div class="comment_top_right">
          <span @click="Reply(item._id,item.user._id,item.user.username)">回复</span>
        </div>
      </div>
      <div class="comment_bottom">
        <span>{{item.con}}</span>
        <div class="comment" v-for="(item2,index2) in item.reply" :key="index2">
          <div class="comment_top">
            <div class="comment_top_left">
              <router-link :to="{path:`/user/${item2.user.user}`}">
                <avatr :size="40" :user="item2.user.user"></avatr>
              </router-link>

              <span>{{item2.user.username}}</span>
              <span>回复</span>
              <router-link :to="{path:`/user/${item2.to.user}`}">
                <span>{{item2.to.username}}</span>
              </router-link>
              <span>{{item2.createTime}}</span>
            </div>
            <div class="comment_top_right">
              <span @click="Reply(item._id,item2.user._id,item2.user.username)">回复</span>
            </div>
          </div>
          <span>{{item2.con}}</span>
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
.user_avatr{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.span :hover {
  transform: scale(1.5);
  color: lightcoral;
}
.text {
  white-space: pre;
}
.time {
  font-size: 13px;
  color: #999;
}
#input {
  display: flex;

  width: 600px;
  margin: 10px auto;
}
#reply {
  justify-content: space-between;
  align-items: center;
  width: 200px;
  display: flex;
  flex-direction: row;
}
#comment {
  border: 1px solid rgba(204, 204, 204, 0.836);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.comment {
  box-sizing: border-box;
  width: 600px;
  margin: 20px auto;

  display: flex;
  flex-direction: column;
}
.comment_top {
  display: flex;
  justify-content: space-between;
  width: 600px;

  flex-direction: row;
  align-items: center;
}

.comment_top_left {
  margin-top: 15px;
  margin-left: 15px;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  display: flex;
  flex-direction: row;
}
.comment_top_right {
  margin-right: 20px;
}
#btn {
  margin-left: 10px;
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
  box-sizing: border-box;
  width: 600px;
  margin: 20px auto;
  border: 1px solid rgba(204, 204, 204, 0.836);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
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
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 60%;
  margin: 20px auto;
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
      this.$axios
        .get("http://10.20.158.17:3000/postById", {
          params: {
            id: this.id
          }
        })
        .then(res => {
          this.msg = res.data;
          this.msg_user = this.msg.user;
          this.Users = this.msg.user.user;
          this.avatr = "http://10.20.158.17:3000/" + this.msg.user.avatr
        })
        .catch(err => {
          
        });
      this.updateComment();
    }
  },
  methods: {
    updateComment: function() {
      this.$axios
        .get("http://10.20.158.17:3000/postComment", {
          params: {
            id: this.id
          }
        })
        .then(res => {
          this.comments = res.data.reverse();
          this.comments.forEach(e => {
            e.reply = e.reply.reverse();
          });

          
        })
        .catch(err => {
          
        });
    },
    doComment: function(id, user_id, comment_id) {
      var src = "";
      
      if (user_id == null) {
        src = "http://10.20.158.17:3000/doComment";
      } else {
        src = "http://10.20.158.17:3000/doReply";
      }
      this.$axios
        .get(src, {
          params: {
            user: this.user,
            id: id,
            comment: this.comment,
            user_id: user_id,
            comment_id: comment_id
          }
        })
        .then(res => {})
        .catch(err => {
          
        });
      this.reply = null;
      this.comment = "";
      this.reload();
    },
    Reply: function(comment_id, to_user_id, username) {
      this.comment_id = comment_id;
      this.reply = to_user_id;
      var input = document.getElementById("reply");
      input.focus();
      this.btn = '回复'
      this.message = "回复" + username;
    },
    star: function(id, index) {
      
      this.$axios
        .get("http://10.20.158.17:3000/star", {
          params: {
            user: this.user,
            id: id,
            star: index
          }
        })
        .then(res => {
          if (res.data != false) {
            this.msg.star++;
          } else {
            this.$message.error("你已经点过赞了");
          }
        })
        .catch(err => {
          
        });
    },
    show: function(id) {
      this.$axios
        .get("http://10.20.158.17:3000/shoucang", {
          params: {
            user: this.user,
            id: id
          }
        })
        .then(res => {
          if (res.data == false) {
            this.$message.error('你已经收藏过了');
          } else {
            this.$message.success("收藏成功");
          }
        })
        .catch(err => {
          
        });
    }
  },
  inject: ["reload"],
  data() {
    return {
      id: this.$route.params.id,
      btn:"发表评论",
      user: "",
      avatr:"",
      msg: "",
      msg_user:"",
      comments: "",
      comment: "",
      reply: null,
      message: "说点什么呗",
      comment_id: "",
      Users:""
    };
  }
};
</script>