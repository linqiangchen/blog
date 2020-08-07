<template>
  <div class="xce-wrap">
    <div class="demo-image__preview" v-for="(item,index) in srcList" :key="index">
      <el-image
        class="demo-image"
        style="width: 400px; height: 400px"
        src="10.20.158.17:3000/智慧联想浏览器截图20190614164910.png"
      ></el-image>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    if (localStorage.getItem("islogin") != "true") {
      window.location.href = "#/login";
    }

    var list = [];
    this.$axios
      .get("http://10.20.158.17:3000/allImage")
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          
          list.push("10.20.158.17:3000/" + res.name.toString());
          
        }
        this.srcList = list;
        
      })
      .catch(err => {});
  },
  
  data() {
    return {
      srcList: []
    };
  }
};
</script>
<style lang="" scoped>
.xce-wrap {
  justify-content: space-evenly;
  box-sizing: border-box;
  flex-wrap: wrap;
  margin: 150px auto;
  display: flex;
}
.demo-image {
  border-radius: 20px;
  box-shadow: 5px 5px #ccc;
  margin-top: 100px;
}
</style>
