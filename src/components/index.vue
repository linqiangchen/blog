<template>
  <div class="container">
    <div class="card">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea1"
        class="el-input"
      ></el-input>
      <div style="margin: 20px 0;"></div>
      <el-input class="el-input" type="textarea" autosize placeholder="请输入作者" v-model="textarea2"></el-input>
      <el-button round class="but" :plain="true" @click="send">保存</el-button>
    </div>
  </div>
</template>

<script>
 
export default {
  // created(){
  //    $axios.get("http://127.0.0.1:3000/add", {
  //           params: {
  //             cont: this.textarea1,
  //             author: this.textarea2
  //           }
  //         })
  //         .then(res => {
            
  //           this.data = res.data;
  //         })
  //         .catch(err => {
         
  //         });
  // },
 methods:{
   send:function() {
       
     if(!this.textarea1){

       this.$message({
          message: '警告哦，内容不能为空',
          type: 'warning',
          center: true
        });
     }else if(!this.textarea2){
      this.$message({
          message: '警告哦，作者不能为空',
          type: 'warning',
          center: true
        });
     }
     else{
         this.$axios.get("http://127.0.0.1:3000/add", {
            params: {
              cont: this.textarea1,
              author: this.textarea2
            }
          })
          .then(res => {
             this.$message({
          message: '保存成功',
          type: 'success',
          center: true
        });
           console.log(res);
          })
          .catch(err => {
         
          });
     }

      
      }
 },

  data() {
    return {
      textarea1: "",
      textarea2: "",
      
    };
  }
};
</script>
<style scoped>
.el-input {
  width: 400px;
}
.card {
  width: 400px;
  margin: 150px auto;
}
.but {
  margin-top: 20px;
}
</style>
