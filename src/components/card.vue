<template>
  <div class="card-wrap">
    
    <div v-for="item in msg" :key="item.id" class="card">
    
        <div shadow="hover" class="el-card"  >
          <h1>{{item.cont}}</h1>
          <span>---------{{item.author}}</span>
        </div>
    </div>
  </div>
</template>

<script>

export default {
   created() {
      this.$axios.get("http://127.0.0.1:3000/user")
      .then((res) => {
      
       this.msg = res.data;
      })
      .catch(err => {
        console.log(err)
      })

    },
    
    
  data() {

    return {
      currentDate: new Date(),

      msg:"",
      up(){
        alert(13)
      }
    };
  },
  
};
</script>
<style  scoped>
.el-card {
box-sizing: border-box;
  width: 300px;
  height: 300px;
  margin: 20px;
padding: 20PX;
   letter-spacing: 5px;
  background-color: rgba(29, 54, 52, 1);
color:white;
        text-shadow: 1px 1px 0px #eee, 1.5px 1.5px 0px #ddd, 2px 2px 0px #ccc;
  cursor: pointer;
  box-shadow: 5px 5px #ccc;
  border-radius: 20px;
}
h1 {
  font-size: 20px;
  margin-top: 80px;
}
span {
  display: block;
margin-top: 30px;
 margin-left: 50px;

}

.card-wrap {
justify-content:space-evenly;
 box-sizing: border-box;
 flex-wrap:wrap;
  margin: 150px auto;
 display:flex;

}
.card{

}

</style>
