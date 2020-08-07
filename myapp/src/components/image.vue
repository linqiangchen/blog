<template>
  <div>
    <el-dialog title="查看原图" :visible.sync="dialogVisible" width="80%" >
      <!--<upFile></upFile> -->

      <img :src="list_Url" alt="" >
   
    </el-dialog>
    <el-row class="image">
      <el-col v-for="(item, index) in List" :key="index" class="box">
        <el-card>
          <div class="myimage">
            <el-image
              class="demo-image"
              style="width: 300px; height: 300px"
              :src="item.url"
              @click="showImg(item.url)"
            ></el-image>
          </div>
          <!-- <img :src="item" class="image"> -->
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <router-link :to="{path:`/user/${item.user}`}">
                <avatr :size="40" :user="item.user"></avatr>
              </router-link>
              
              <time class="time">{{item.time}}</time>
            
              <!--<el-button type="text" class="button" @click="open(item)">删除</el-button> -->
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="select">
      <ul>
        <li @click="showAll">所有照片</li>
        <li @click="showMy">我的照片</li>
        <li @click="top">回到顶部</li>
      </ul>
    </div>
  </div>
</template>


<style scoped>
.select {
  transform: translateY(-50%);
  position: fixed;
  right: -85px;
  top: 50%;
  z-index: 10;
}
.prev{
  position: absolute;
  top: 50%;
  left: 0;
}
.prev{
  position: absolute;
  top: 50%;
  right: 0;
}
.select ul {
  width: 100px;
}
.el-dialog  {
  position: fixed;

top: 50%;
left: 50%;
transform: translate(-50%,-50%);
}
.el-dialog img{
  width: 60%;
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
.el-col:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 20px lightseagreen;
}
.el-col {
  transition: 0.5s;
}
.image {
  margin: 0 auto;
  width: 1320px;
}
a {
  color: #111;
}
.box {
  margin: 20px;
  width: 400px;
  height: 400px;
}
.myimage {
  margin: 0 auto;
  width: 300px;
  height: 300px;
  overflow: hidden;
}
.image .bottom {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-image {
  transition: 0.5s;
}
.el-image:hover {
  transform: scale(1.2);
}
</style>

<script scoped>
export default {
  created() {
    var user = localStorage.getItem("user");
    var islogin = localStorage.getItem("islogin");

    if (islogin != "true") {
      window.location.href = "#/login";
    }
    this.user = user;

    var list = [];
    var listUrl = [];
    this.$axios
      .get("http://10.20.158.17:3000/allImage")
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          list.push({
            url: "http://10.20.158.17:3000/" + res.data[i].name.toString(),
            user: res.data[i].user,
            time: res.data[i].time,
          });
          listUrl.push("http://10.20.158.17:3000/" + res.data[i].name.toString());
          // list.push("http://10.20.158.17:3000/" + res.data[i].name.toString());
          // console.log("http://10.20.158.17:3000/" + res.data[i].name.toString());
          //
        }
        this.List = list.reverse();
        this.list_Url = listUrl.reverse();
      })
      .catch((err) => {});
  },
  inject: ["reload"],
  data() {
    return {
      user: "",
      currentDate: new Date(),
      List: [],
      list_Url:"",
      dialogVisible: false,
    };
  },
  methods: {
    showImg(url){
      this.dialogVisible = true
      this.list_Url = url
    },
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
            console.log(22222);
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
      location.href = "#/xce";
    },
    showMy() {
      location.href = "#/userImage/" + this.user;
    },
    show(src) {
      console.log(src);
      // window.location.href = `src`;
    },
    open(name) {
      var that = this;
      name = name.slice(22);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.removeImage(name);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    removeImage(name) {
      var that = this;
      this.$axios
        .get("http://10.20.158.17:3000/removeImage", {
          params: {
            name: name,
            user: localStorage.getItem("user"),
          },
        })
        .then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });

          that.reload();
        })
        .catch((err) => {
          //
        });
    },
  },
};
</script>