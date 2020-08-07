
<template>
  <post :posts="msg"></post>
</template>
<style  scoped>
</style>
<script>
export default {
  created() {
    if (localStorage.getItem("islogin") != "true") {
      window.location.href = "#/login";
    }
    var user = localStorage.getItem("user");
    this.$axios
      .get("http://10.20.158.17:3000/myShoucang?user=" + user)
      .then(res => {  
        this.msg = res.data.posts;
      })
      .catch(err => { 
      });
  },
  data() {
    return {
      msg: []
      //currentDate: new Date()
    };
  }
};
</script>