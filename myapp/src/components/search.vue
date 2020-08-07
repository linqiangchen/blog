<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输用户昵称或手机号"
    @select="handleSelect"
  ></el-autocomplete>
</template>

<script>
export default {
  data() {
    return {
      restaurants1: [],
      restaurants2: [],
      state: "",
      timeout: null,
    };
  },
  created() {
    if (localStorage.getItem("islogin") != "true") {
      window.location.href = "#/login";
    } else {
      this.user = localStorage.getItem("user");
    }
  },
  methods: {
    loadAll() {
      var date1 = [];
      var date2 = [];
      var obj = {};
      this.$axios
        .get("http://10.20.158.17:3000/findUserByName?name=" + this.state)
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            date1.push({ value: res.data[i].username, user: res.data[i].user });
            date2.push({ value: res.data[i].user, user: res.data[i].user });
          }
        })
        .catch((err) => {});
      return {
        name: date1,
        user: date2,
      };
    },
    querySearchAsync(queryString, cb) {
      var restaurants;
      if (isNaN(this.state) || this.state == "") {
        restaurants = this.restaurants1;
      } else {
        restaurants = this.restaurants2;
      }
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 100 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      window.location.href = "#/user/" + item.user;
    },
  },
  mounted() {
    var date = this.loadAll();
    this.restaurants1 = date.name;
    this.restaurants2 = date.user;
  },
};
</script>