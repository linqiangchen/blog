<template>
  <div class="xce-wrap">
   
 <div class="demo-image__preview" v-for="item in url" :key="item.id">
  
  <el-image
  class="demo-image" 
    style="width: 400px; height: 400px"
    :src="item.url" 
    :preview-src-list="srcList">
  </el-image>
</div>

  </div>
</template>

<script>
export default {
   created() {
     var list = []
      this.$axios.get("http://127.0.0.1:3000/image")
      .then((res) => {
       
       this.url =  res.data;
          for(var i = 0;i<this.url.length;i++){
            list.push(this.url[i].url);
          }
           this.srcList = list;
          
      })
      .catch(err => {
        
      })

    },
    data() {
      return {
        url: '',
        srcList:this.list
      }
    }
  }
</script>
<style lang="" scoped>
.xce-wrap {
justify-content:space-evenly;
 box-sizing: border-box;
 flex-wrap:wrap;
  margin: 150px auto;
 display:flex;

}
.demo-image{
  border-radius: 20px;
  box-shadow: 5px 5px #ccc;
  margin-top: 100px;
}
</style>
