<template>
  <div class="personer-wrap">
    <h1>记录生活的美好</h1>
    <div class="boox">
      <div class="wenzhi">
        <a href="#/col">抓住每一丝灵感</a>
      </div>
      <div class="image">
        <a href="#/upFile">留住每一个瞬间</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created: function() {
    if (localStorage.getItem("islogin") != "true") {
      window.location.href = "#/login";
    }
  },
  data() {
    return {};
  }
};
</script>
<style  scoped>
h1 {
  font-size: 50px;
}
.personer-wrap {
  text-align: center;
}
.boox {
  margin-top: 100px;
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  flex-wrap: wrap;
}
.wenzhi {
  width: 350px;
  height: 350px;
  text-align: center;
}
</style>
